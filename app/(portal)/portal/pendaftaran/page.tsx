"use client";

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShieldCheck, UserRound, Plus, Edit, Trash2, TrendingUp, Users, BarChart3, Calendar, Clock, Search, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DatePicker } from '@/components/ui/date-picker';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { generateSlug } from '@/lib/utils';

const CategorySchema = z.object({
    name: z.string().min(2, 'Nama minimal 2 karakter'),
    description: z.string().max(500, 'Deskripsi maksimal 500 karakter').optional(),
});

const SubmissionSchema = z.object({
    name: z.string().min(2, 'Nama minimal 2 karakter'),
    categoryId: z.string().min(1, 'Kategori harus dipilih'),
    status: z.string().min(1, 'Status harus dipilih'),
    openDate: z.string().optional(),
    closeDate: z.string().optional(),
    quota: z.number().min(1, 'Kuota minimal 1'),
    academicYear: z.string().min(4, 'Tahun akademik harus diisi'),
    description: z.string().max(1000, 'Deskripsi maksimal 1000 karakter').optional(),
});

type CategoryFormValues = z.infer<typeof CategorySchema>;
type SubmissionFormValues = z.infer<typeof SubmissionSchema>;

export default function Pendaftaran() {
    const [categoryOpen, setCategoryOpen] = React.useState(false);
    const [submissionOpen, setSubmissionOpen] = React.useState(false);
    const [editCategoryOpen, setEditCategoryOpen] = React.useState(false);
    const [editSubmissionOpen, setEditSubmissionOpen] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState<any>(null);
    const [selectedSubmission, setSelectedSubmission] = React.useState<any>(null);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [showActiveOnly, setShowActiveOnly] = React.useState(false);

    const categories = useQuery(api.categories.getAllCategories) || [];
    const submissions = useQuery(api.submissions.getAllSubmissions) || [];
    const createCategory = useMutation(api.categories.createCategory);
    const updateCategory = useMutation(api.categories.updateCategory);
    const deleteCategory = useMutation(api.categories.deleteCategory);
    const createSubmission = useMutation(api.submissions.createSubmission);
    const updateSubmission = useMutation(api.submissions.updateSubmission);
    const deleteSubmission = useMutation(api.submissions.deleteSubmission);

    const filteredCategories = React.useMemo(() => {
        return categories.filter((category: any) => {
            const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (category.description && category.description.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesSearch;
        });
    }, [categories, searchQuery]);

    const filteredSubmissions = React.useMemo(() => {
        return submissions.filter((submission: any) => {
            const matchesSearch = submission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (submission.description && submission.description.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesFilter = !showActiveOnly || submission.status === 'open';
            return matchesSearch && matchesFilter;
        });
    }, [submissions, searchQuery, showActiveOnly]);

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            name: '',
            description: '',
        },
    });

    const editCategoryForm = useForm<CategoryFormValues>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            name: '',
            description: '',
        },
    });

    const submissionForm = useForm<SubmissionFormValues>({
        resolver: zodResolver(SubmissionSchema),
        defaultValues: {
            name: '',
            categoryId: '',
            status: 'draft',
            openDate: '',
            closeDate: '',
            quota: 1,
            academicYear: new Date().getFullYear().toString(),
            description: '',
        },
    });

    const editSubmissionForm = useForm<SubmissionFormValues>({
        resolver: zodResolver(SubmissionSchema),
        defaultValues: {
            name: '',
            categoryId: '',
            status: 'draft',
            openDate: '',
            closeDate: '',
            quota: 1,
            academicYear: new Date().getFullYear().toString(),
            description: '',
        },
    });

    const onSubmit = async (values: CategoryFormValues) => {
        try {
            const slug = generateSlug(values.name);
            await createCategory({ ...values, slug });
            form.reset();
            setCategoryOpen(false);
            toast.success('Kategori berhasil dibuat');
        } catch (error) {
            toast.error('Gagal membuat kategori');
        }
    };

    const handleEditCategory = (category: any) => {
        setSelectedCategory(category);
        editCategoryForm.reset({
            name: category.name,
            description: category.description || '',
        });
        setEditCategoryOpen(true);
    };

    const onEditCategorySubmit = async (values: CategoryFormValues) => {
        if (!selectedCategory) return;
        try {
            const slug = generateSlug(values.name);
            await updateCategory({ id: selectedCategory._id, ...values, slug });
            editCategoryForm.reset();
            setEditCategoryOpen(false);
            setSelectedCategory(null);
            toast.success('Kategori berhasil diperbarui');
        } catch (error) {
            toast.error('Gagal memperbarui kategori');
        }
    };

    const handleDeleteCategory = async (id: Id<"submissionCategories">) => {
        try {
            await deleteCategory({ id });
            toast.success('Kategori berhasil dihapus');
        } catch (error) {
            toast.error('Gagal menghapus kategori');
        }
    };

    const onSubmissionSubmit = async (values: SubmissionFormValues) => {
        try {
            const slug = generateSlug(values.name);
            await createSubmission({
                ...values,
                slug,
                categoryId: values.categoryId as Id<"submissionCategories">
            });
            submissionForm.reset();
            setSubmissionOpen(false);
            toast.success('Pendaftaran berhasil dibuat');
        } catch (error) {
            toast.error('Gagal membuat pendaftaran');
        }
    };

    const handleEditSubmission = (submission: any) => {
        setSelectedSubmission(submission);
        editSubmissionForm.reset({
            name: submission.name,
            categoryId: submission.categoryId,
            status: submission.status,
            openDate: submission.openDate || '',
            closeDate: submission.closeDate || '',
            quota: submission.quota,
            academicYear: submission.academicYear,
            description: submission.description || '',
        });
        setEditSubmissionOpen(true);
    };

    const onEditSubmissionSubmit = async (values: SubmissionFormValues) => {
        if (!selectedSubmission) return;
        try {
            const slug = generateSlug(values.name);
            await updateSubmission({
                id: selectedSubmission._id,
                ...values,
                slug,
                categoryId: values.categoryId as Id<"submissionCategories">
            });
            editSubmissionForm.reset();
            setEditSubmissionOpen(false);
            setSelectedSubmission(null);
            toast.success('Pendaftaran berhasil diperbarui');
        } catch (error) {
            toast.error('Gagal memperbarui pendaftaran');
        }
    };

    const handleDeleteSubmission = async (id: Id<"submissions">) => {
        try {
            await deleteSubmission({ id });
            toast.success('Pendaftaran berhasil dihapus');
        } catch (error) {
            toast.error('Gagal menghapus pendaftaran');
        }
    };

    return (
        <div className="flex  flex-col gap-4 p-4 pt-0 w-full">
            <div>
                <p className="text-base font-bold">Pendaftaran</p>
                <p className="text-sm text-muted-foreground" > Kelola pendaftaran peserta.</p>
            </div >

            <Tabs defaultValue="kategori" className="text-sm text-muted-foreground">
                <TabsList variant="line">
                    <TabsTrigger value="kategori">
                        <UserRound /> Kategori
                    </TabsTrigger>
                    <TabsTrigger value="pendaftaran">
                        <ShieldCheck /> Pendaftaran
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="kategori">
                    {/* Search Bar and Filter for Categories */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                    placeholder="Cari kategori..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <Dialog open={categoryOpen} onOpenChange={setCategoryOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Tambah Kategori
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Tambah Kategori</DialogTitle>
                                    <DialogDescription>
                                        Buat kategori baru untuk mengorganisir pendaftaran.
                                    </DialogDescription>
                                </DialogHeader>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nama Kategori</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Masukkan nama kategori" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Deskripsi</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Masukkan deskripsi kategori"
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <DialogFooter>
                                            <Button type="button" variant="outline" onClick={() => setCategoryOpen(false)}>
                                                Batal
                                            </Button>
                                            <Button type="submit">Simpan</Button>
                                        </DialogFooter>
                                    </form>
                                </Form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Category Cards - Vertical Stacked Layout */}
                    <div className="space-y-4">
                        {filteredCategories.map((category) => (
                            <Card key={category._id} className="group hover:shadow-md transition-all duration-200 hover:border-primary/20">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                                    {category.name}
                                                </h3>
                                                <Badge variant="secondary" className="text-xs">
                                                    {category.slug}
                                                </Badge>
                                            </div>

                                            {category.description && (
                                                <p className="text-sm text-muted-foreground line-clamp-2">
                                                    {category.description}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                                                onClick={() => handleEditCategory(category)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Hapus Kategori</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Apakah Anda yakin ingin menghapus kategori "{category.name}"?
                                                            Tindakan ini tidak dapat dibatalkan.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDeleteCategory(category._id)}
                                                            className="bg-red-600 hover:bg-red-700"
                                                        >
                                                            Hapus
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        {filteredCategories.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                                {searchQuery ? 'Tidak ada kategori yang ditemukan' : 'Belum ada kategori'}
                            </div>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="pendaftaran">
                    {/* Search Bar and Filter for Submissions */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                    placeholder="Cari pendaftaran..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Aktif saja</span>
                                <Switch
                                    checked={showActiveOnly}
                                    onCheckedChange={setShowActiveOnly}
                                />
                            </div>
                        </div>
                        <Dialog open={submissionOpen} onOpenChange={setSubmissionOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Tambah Pendaftaran
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>Tambah Pendaftaran</DialogTitle>
                                    <DialogDescription>
                                        Buat periode pendaftaran baru untuk peserta.
                                    </DialogDescription>
                                </DialogHeader>
                                <Form {...submissionForm}>
                                    <form onSubmit={submissionForm.handleSubmit(onSubmissionSubmit)} className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={submissionForm.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Nama Pendaftaran</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Masukkan nama pendaftaran" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={submissionForm.control}
                                                name="categoryId"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Kategori</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Pilih kategori" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {categories.map((category) => (
                                                                    <SelectItem key={category._id} value={category._id}>
                                                                        {category.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <FormField
                                                control={submissionForm.control}
                                                name="status"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Status</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Pilih status" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="draft">Draft</SelectItem>
                                                                <SelectItem value="open">Buka</SelectItem>
                                                                <SelectItem value="closed">Tutup</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={submissionForm.control}
                                                name="quota"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Kuota</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                placeholder="Masukkan kuota"
                                                                {...field}
                                                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={submissionForm.control}
                                                name="academicYear"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Tahun Akademik</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="2024" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <FormField
                                            control={submissionForm.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Deskripsi</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Masukkan deskripsi pendaftaran"
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <DialogFooter>
                                            <Button type="button" variant="outline" onClick={() => setSubmissionOpen(false)}>
                                                Batal
                                            </Button>
                                            <Button type="submit">Simpan</Button>
                                        </DialogFooter>
                                    </form>
                                </Form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Submission Cards - Vertical Stacked Layout */}
                    <div className="space-y-4">
                        {filteredSubmissions.map((submission: any) => {
                            const category = categories.find((cat: any) => cat._id === submission.categoryId);
                            return (
                                <Card key={submission._id} className="group hover:shadow-md transition-all duration-200 hover:border-primary/20">
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1 space-y-3">
                                                <div className="flex items-center gap-3 flex-wrap">
                                                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                                        {submission.name}
                                                    </h3>
                                                    <Badge variant="secondary" className="text-xs">
                                                        {submission.slug}
                                                    </Badge>
                                                    <Badge
                                                        variant={
                                                            submission.status === 'open' ? 'primary' :
                                                                submission.status === 'closed' ? 'destructive' : 'secondary'
                                                        }
                                                        className="text-xs"
                                                    >
                                                        {submission.status === 'open' ? 'Buka' :
                                                            submission.status === 'closed' ? 'Tutup' : 'Draft'}
                                                    </Badge>
                                                </div>

                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <UserRound className="h-4 w-4" />
                                                        <span>Kategori: {category?.name || 'Tidak ditemukan'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        <span>Kuota: {submission.quota}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        <span>Tahun: {submission.academicYear}</span>
                                                    </div>
                                                </div>

                                                {submission.description && (
                                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                                        {submission.description}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                                                    onClick={() => handleEditSubmission(submission)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Hapus Pendaftaran</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Apakah Anda yakin ingin menghapus pendaftaran "{submission.name}"?
                                                                Tindakan ini tidak dapat dibatalkan.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Batal</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => handleDeleteSubmission(submission._id)}
                                                                className="bg-red-600 hover:bg-red-700"
                                                            >
                                                                Hapus
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                        {filteredSubmissions.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                                {searchQuery ? 'Tidak ada pendaftaran yang ditemukan' : 'Belum ada pendaftaran'}
                            </div>
                        )}
                    </div>
                </TabsContent>
            </Tabs>

            {/* Edit Category Dialog */}
            <Dialog open={editCategoryOpen} onOpenChange={setEditCategoryOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Kategori</DialogTitle>
                        <DialogDescription>
                            Perbarui informasi kategori.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...editCategoryForm}>
                        <form onSubmit={editCategoryForm.handleSubmit(onEditCategorySubmit)} className="space-y-4">
                            <FormField
                                control={editCategoryForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nama Kategori</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Masukkan nama kategori" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={editCategoryForm.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Deskripsi</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Masukkan deskripsi kategori"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setEditCategoryOpen(false)}>
                                    Batal
                                </Button>
                                <Button type="submit">Simpan</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            {/* Edit Submission Dialog */}
            <Dialog open={editSubmissionOpen} onOpenChange={setEditSubmissionOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Edit Pendaftaran</DialogTitle>
                        <DialogDescription>
                            Perbarui informasi pendaftaran.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...editSubmissionForm}>
                        <form onSubmit={editSubmissionForm.handleSubmit(onEditSubmissionSubmit)} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={editSubmissionForm.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nama Pendaftaran</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Masukkan nama pendaftaran" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={editSubmissionForm.control}
                                    name="categoryId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Kategori</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih kategori" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {categories.map((category: any) => (
                                                        <SelectItem key={category._id} value={category._id}>
                                                            {category.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <FormField
                                    control={editSubmissionForm.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih status" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="draft">Draft</SelectItem>
                                                    <SelectItem value="open">Buka</SelectItem>
                                                    <SelectItem value="closed">Tutup</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={editSubmissionForm.control}
                                    name="quota"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Kuota</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Masukkan kuota"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={editSubmissionForm.control}
                                    name="academicYear"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tahun Akademik</FormLabel>
                                            <FormControl>
                                                <Input placeholder="2024" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={editSubmissionForm.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Deskripsi</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Masukkan deskripsi pendaftaran"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setEditSubmissionOpen(false)}>
                                    Batal
                                </Button>
                                <Button type="submit">Simpan</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            <Toaster />
        </div >
    );
}
