
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAllCategories = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("submissionCategories")
      .order("desc")
      .collect();
  },
});

export const updateCategory = mutation({
  args: v.object({
    id: v.id("submissionCategories"),
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
  }),
  handler: async (ctx, args) => {
    const now = new Date().toISOString();

    // Normalize slug
    const slug = args.slug.trim().toLowerCase();

    // Check if slug is already used by another category
    const duplicate = await ctx.db
      .query("submissionCategories")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    if (duplicate && duplicate._id !== args.id) {
      throw new Error("Slug sudah digunakan");
    }

    await ctx.db.patch(args.id, {
      name: args.name.trim(),
      slug,
      description: args.description,
      updatedAt: now,
    });

    return { success: true };
  },
});

export const deleteCategory = mutation({
  args: v.object({
    id: v.id("submissionCategories"),
  }),
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});

export const createCategory = mutation({
  args: v.object({
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
  }),
  handler: async (ctx, args) => {
    // Skip authentication for now - make this a public mutation

    const now = new Date().toISOString();

    // Normalize and validate slug uniqueness on server
    const slug = args.slug.trim().toLowerCase();

    const duplicate = await ctx.db
      .query("submissionCategories")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
    if (duplicate) {
      throw new Error("Slug sudah digunakan");
    }

    const categoryId = await ctx.db.insert("submissionCategories", {
      name: args.name.trim(),
      slug,
      createdAt: now,
      updatedAt: now,
      description: args.description ?? undefined,
    });

    return { id: categoryId };
  },
});