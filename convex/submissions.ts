import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAllSubmissions = query({
  args: {},
  handler: async (ctx) => {
    const submissions = await ctx.db
      .query("submissions")
      .order("desc")
      .collect();

    // Get category information for each submission
    const submissionsWithCategory = await Promise.all(
      submissions.map(async (submission) => {
        const category = await ctx.db.get(submission.categoryId);
        return {
          ...submission,
          category
        };
      })
    );

    return submissionsWithCategory;
  },
});

export const createSubmission = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    categoryId: v.id("submissionCategories"),
    status: v.string(),
    openDate: v.optional(v.string()),
    closeDate: v.optional(v.string()),
    quota: v.number(),
    academicYear: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if slug already exists
    const existingSubmission = await ctx.db
      .query("submissions")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .first();

    if (existingSubmission) {
      throw new Error("Slug sudah digunakan");
    }

    const submissionId = await ctx.db.insert("submissions", {
      ...args,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // Skip authorId for now - no user validation
    });

    return submissionId;
  },
});

export const updateSubmission = mutation({
  args: {
    id: v.id("submissions"),
    name: v.string(),
    slug: v.string(),
    categoryId: v.id("submissionCategories"),
    status: v.string(),
    openDate: v.optional(v.string()),
    closeDate: v.optional(v.string()),
    quota: v.number(),
    academicYear: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if slug already exists (excluding current submission)
    const existingSubmission = await ctx.db
      .query("submissions")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .first();

    if (existingSubmission && existingSubmission._id !== args.id) {
      throw new Error("Slug sudah digunakan");
    }

    const { id, ...updateData } = args;

    await ctx.db.patch(id, {
      ...updateData,
      updatedAt: new Date().toISOString(),
    });

    return { success: true };
  },
});

export const deleteSubmission = mutation({
  args: { id: v.id("submissions") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});