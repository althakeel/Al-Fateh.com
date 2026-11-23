
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import {
  onAuthStateChanged,
  signOut,
  type User,
} from "firebase/auth";

import {
  LayoutDashboard,
  Newspaper,
  Plus,
  Pencil,
  Trash2,
  LogOut,
  Upload,
  Save,
  Eye,
  Search,
  CalendarDays,
  Clock3,
  ImageIcon,
  ArrowUpRight,
} from "lucide-react";

import RichTextEditor, {
  blogImageTypes,
} from "./RichTextEditor";

import { auth } from "@/lib/firebase";

import {
  type ManagedBlog,
  plainTextToBlogHtml,
  sectionsToBlogHtml,
  slugify,
} from "@/lib/blog-model";

// ============================================
// TYPES
// ============================================

type BlogForm = Omit<
  ManagedBlog,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "publishedAt"
  | "createdBy"
  | "updatedBy"
>;

type BlogStatus = ManagedBlog["status"];

// ============================================
// DEFAULT BLOG FORM
// ============================================

function emptyForm(): BlogForm {
  return {
    slug: "",
    title: "",
    titleAr: "",
    excerpt: "",
    excerptAr: "",
    category: "",
    categoryAr: "",
    readTime: "4 min read",

    image: "",
    imageAr: "",
    imageAlt: "",
    imageAltAr: "",

    bannerImage: "",
    bannerImageAr: "",

    sections: [],
    sectionsAr: [],

    excerptHtml: "",
    excerptHtmlAr: "",
    contentHtml: "",
    contentHtmlAr: "",

    publicationDate: "",

    seoTitle: "",
    seoTitleAr: "",
    seoDescription: "",
    seoDescriptionAr: "",

    status: "draft",
  };
}

// ============================================
// AUTHENTICATED API REQUEST
// ============================================

async function authenticatedFetch(
  user: User,
  url: string,
  options: RequestInit = {}
) {
  const token = await user.getIdToken();

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
}

// ============================================
// DATE FORMATTER
// ============================================

function formatBlogDate(
  blog: ManagedBlog,
  locale: "en" | "ar"
) {
  const dateValue =
    blog.publicationDate ||
    (blog.publishedAt
      ? new Date(blog.publishedAt)
          .toISOString()
          .slice(0, 10)
      : "");

  if (!dateValue) {
    return new Date(blog.createdAt).toLocaleDateString(
      locale === "ar" ? "ar-AE" : "en-GB",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  }

  const date = new Date(`${dateValue}T12:00:00`);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toLocaleDateString(
    locale === "ar" ? "ar-AE" : "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}

// ============================================
// MAIN BLOG DASHBOARD
// ============================================

export default function BlogDashboard() {
  const params = useParams();
  const router = useRouter();

  const locale: "en" | "ar" =
    params.locale === "ar" ? "ar" : "en";

  const isAr = locale === "ar";

  // ------------------------------------------
  // AUTHENTICATION STATE
  // ------------------------------------------

  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  // ------------------------------------------
  // BLOG DATA
  // ------------------------------------------

  const [blogs, setBlogs] = useState<ManagedBlog[]>([]);
  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [form, setForm] =
    useState<BlogForm>(emptyForm());

  // ------------------------------------------
  // UI STATE
  // ------------------------------------------

  const [screen, setScreen] =
    useState<"list" | "editor">("list");

  const [editorVersion, setEditorVersion] =
    useState(0);

  const [dirty, setDirty] = useState(false);

  const editorHeading =
    useRef<HTMLHeadingElement>(null);

  const mutation = useRef(false);
  const uploadCount = useRef(0);

  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(0);
  const [message, setMessage] = useState("");

  // ------------------------------------------
  // TRANSLATIONS
  // ------------------------------------------

  const t = {
    title: isAr ? "لوحة التحكم" : "Dashboard",
    blogs: isAr ? "إدارة المقالات" : "Blog Management",
    create: isAr ? "إنشاء مقال جديد" : "Create Blog Post",
    logout: isAr ? "تسجيل الخروج" : "Logout",
    draft: isAr ? "مسودة" : "Draft",
    published: isAr ? "منشور" : "Published",
    delete: isAr ? "حذف" : "Delete",
    edit: isAr ? "تعديل" : "Edit",
    search: isAr ? "ابحث عن مقال..." : "Search articles...",
    view: isAr ? "عرض المقال" : "View Article",
    unpublish: isAr ? "إلغاء النشر" : "Unpublish",
    reviewPublish: isAr ? "مراجعة ونشر" : "Review & Publish",
    total: isAr ? "إجمالي المقالات" : "Total Articles",
    empty: isAr ? "لا توجد مقالات." : "No articles found.",
  };

  // ============================================
  // LOAD BLOGS
  // ============================================

  const loadBlogs = useCallback(
    async (currentUser: User) => {
      const response = await authenticatedFetch(
        currentUser,
        "/api/admin/blogs"
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to load blogs."
        );
      }

      setBlogs(result.blogs || []);
    },
    []
  );

  // ============================================
  // VERIFY ADMIN SESSION
  // ============================================

  useEffect(() => {
    let cancelled = false;

    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        if (cancelled) return;

        if (!currentUser) {
          setUser(null);
          setChecking(false);
          router.replace(`/${locale}/login`);
          return;
        }

        try {
          const response = await authenticatedFetch(
            currentUser,
            "/api/admin/session"
          );

          if (cancelled) return;

          if (
            response.status === 401 ||
            response.status === 403
          ) {
            setUser(null);
            router.replace(`/${locale}/login`);
            return;
          }

          if (!response.ok) {
            throw new Error(
              "Unable to verify administrator session."
            );
          }
        } catch (error) {
          console.error(
            "[DASHBOARD] Administrator verification failed:",
            error
          );

          if (!cancelled) {
            setUser(null);
            setMessage(
              isAr
                ? "تعذر التحقق من جلسة الإدارة."
                : "Unable to verify administrator session."
            );
            setChecking(false);
          }

          return;
        }

        setUser(currentUser);

        // Database errors must not sign out the admin.
        try {
          await loadBlogs(currentUser);
        } catch (error) {
          console.error(
            "[DASHBOARD] Blog loading failed:",
            error
          );

          if (!cancelled) {
            setMessage(
              isAr
                ? "تعذر تحميل المقالات من قاعدة البيانات."
                : "Unable to load articles from the database."
            );
          }
        } finally {
          if (!cancelled) {
            setChecking(false);
          }
        }
      }
    );

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [locale, router, loadBlogs, isAr]);

  // ============================================
  // UNSAVED CHANGES PROTECTION
  // ============================================

  useEffect(() => {
    if (!dirty) return;

    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", warn);

    return () => {
      window.removeEventListener("beforeunload", warn);
    };
  }, [dirty]);

  useEffect(() => {
    if (screen === "editor") {
      editorHeading.current?.focus();
    }
  }, [screen, editorVersion]);

  // ============================================
  // UPDATE FORM FIELD
  // ============================================

  function setField<K extends keyof BlogForm>(
    key: K,
    value: BlogForm[K]
  ) {
    setDirty(true);

    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  // ============================================
  // CHECK BEFORE LEAVING EDITOR
  // ============================================

  function canLeaveEditor() {
    if (mutation.current || uploadCount.current) {
      return false;
    }

    return (
      !dirty ||
      window.confirm(
        isAr
          ? "هل تريد تجاهل التغييرات غير المحفوظة؟"
          : "Discard unsaved changes?"
      )
    );
  }

  // ============================================
  // OPEN EDITOR
  // ============================================

  function openEditor(
    next: BlogForm,
    id: string | null
  ) {
    if (!canLeaveEditor()) return;

    setEditingId(id);
    setForm(next);
    setEditorVersion((version) => version + 1);
    setDirty(false);
    setMessage("");
    setScreen("editor");
  }

  function createNew() {
    openEditor(emptyForm(), null);
  }

  // ============================================
  // EDIT EXISTING BLOG
  // ============================================

  function editBlog(blog: ManagedBlog) {
    const dates = blog.publishedAt
      ? new Date(blog.publishedAt)
          .toISOString()
          .slice(0, 10)
      : "";

    openEditor(
      {
        ...emptyForm(),

        slug: blog.slug,
        title: blog.title,
        titleAr: blog.titleAr,

        excerpt: blog.excerpt,
        excerptAr: blog.excerptAr,

        excerptHtml:
          blog.excerptHtml ??
          plainTextToBlogHtml(blog.excerpt),

        excerptHtmlAr:
          blog.excerptHtmlAr ??
          plainTextToBlogHtml(blog.excerptAr),

        contentHtml:
          blog.contentHtml ??
          sectionsToBlogHtml(blog.sections),

        contentHtmlAr:
          blog.contentHtmlAr ??
          sectionsToBlogHtml(blog.sectionsAr),

        sections: blog.sections,
        sectionsAr: blog.sectionsAr,

        publicationDate:
          blog.publicationDate ?? dates,

        category: blog.category,
        categoryAr: blog.categoryAr,
        readTime: blog.readTime,

        image: blog.image,
        imageAr: blog.imageAr,
        bannerImage: blog.bannerImage,
        bannerImageAr: blog.bannerImageAr,

        imageAlt: blog.imageAlt,
        imageAltAr: blog.imageAltAr,

        seoTitle: blog.seoTitle,
        seoTitleAr: blog.seoTitleAr,

        seoDescription: blog.seoDescription,
        seoDescriptionAr: blog.seoDescriptionAr,

        status: blog.status,
      },
      blog.id
    );
  }

  function closeEditor() {
    if (!canLeaveEditor()) return;

    setDirty(false);
    setMessage("");
    setScreen("list");
  }

  // ============================================
  // CENTRALIZED API MUTATION
  // ============================================

  async function mutateBlog(
    url: string,
    options: RequestInit,
    success: string,
    afterSave?: () => void
  ) {
    if (
      !user ||
      mutation.current ||
      uploadCount.current
    ) {
      return;
    }

    mutation.current = true;
    setSaving(true);
    setMessage("");

    try {
      const response = await authenticatedFetch(
        user,
        url,
        options
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Article operation failed."
        );
      }

      afterSave?.();

      if (result.blog) {
        const saved: ManagedBlog = result.blog;

        setBlogs((current) =>
          [
            saved,
            ...current.filter(
              (blog) => blog.id !== saved.id
            ),
          ].sort(
            (a, b) => b.createdAt - a.createdAt
          )
        );
      } else {
        // DELETE operation
        setBlogs((current) =>
          current.filter(
            (blog) =>
              `/api/admin/blogs/${blog.id}` !== url
          )
        );
      }

      setMessage(success);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Article operation failed."
      );
    } finally {
      mutation.current = false;
      setSaving(false);
    }
  }

  // ============================================
  // SAVE / PUBLISH ARTICLE
  // ============================================

  function saveBlog(status: BlogStatus) {
    const slug = slugify(
      form.slug || form.title
    );

    if (!form.title.trim() || !slug) {
      setMessage(
        "Enter an English title and a valid URL slug."
      );
      return;
    }

    if (
      status === "published" &&
      (
        !form.titleAr.trim() ||
        !form.image ||
        !form.excerptHtml ||
        !form.excerptHtmlAr ||
        !form.contentHtml ||
        !form.contentHtmlAr
      )
    ) {
      setMessage(
        "Add both titles, both short descriptions, both article bodies, and the English card image before publishing."
      );
      return;
    }

    void mutateBlog(
      editingId
        ? `/api/admin/blogs/${editingId}`
        : "/api/admin/blogs",
      {
        method: editingId ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          slug,
          status,
        }),
      },
      status === "published"
        ? "Article published."
        : "Draft saved.",
      () => {
        setDirty(false);
        setScreen("list");
      }
    );
  }

  // ============================================
  // UNPUBLISH ARTICLE
  // ============================================

  function unpublishBlog(blog: ManagedBlog) {
    if (
      !canLeaveEditor() ||
      !window.confirm(
        `Unpublish "${blog.title}"?`
      )
    ) {
      return;
    }

    void mutateBlog(
      `/api/admin/blogs/${blog.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "draft",
        }),
      },
      "Article unpublished.",
      () => {
        setDirty(false);
        setScreen("list");
      }
    );
  }

  // ============================================
  // DELETE ARTICLE
  // ============================================

  function removeBlog(blog: ManagedBlog) {
    if (
      !canLeaveEditor() ||
      !window.confirm(
        `Delete "${blog.title}" permanently?`
      )
    ) {
      return;
    }

    void mutateBlog(
      `/api/admin/blogs/${blog.id}`,
      { method: "DELETE" },
      "Article deleted.",
      () => {
        setDirty(false);
        setScreen("list");
      }
    );
  }

  // ============================================
  // UPLOAD IMAGE TO IMAGEKIT
  // ============================================

  async function uploadImage(
    file: File
  ): Promise<string> {
    if (!user || mutation.current) {
      throw new Error(
        "Image upload is unavailable while saving."
      );
    }

    uploadCount.current += 1;
    setUploading(uploadCount.current);

    try {
      const body = new FormData();
      body.append("file", file);

      const response = await authenticatedFetch(
        user,
        "/api/admin/uploads",
        {
          method: "POST",
          body,
        }
      );

      const result = await response.json();

      if (
        !response.ok ||
        !result.success ||
        typeof result.url !== "string"
      ) {
        throw new Error(
          result.message || "Image upload failed."
        );
      }

      return result.url;
    } finally {
      uploadCount.current -= 1;
      setUploading(uploadCount.current);
    }
  }

  // ============================================
  // LOGOUT
  // ============================================

  async function logout() {
    if (!canLeaveEditor()) return;

    await signOut(auth);
    router.replace(`/${locale}/login`);
  }

  // ============================================
  // FILTER & STATISTICS
  // ============================================

  const filteredBlogs = blogs.filter((blog) =>
    `${blog.title} ${blog.titleAr} ${blog.slug}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const publishedCount = blogs.filter(
    (blog) => blog.status === "published"
  ).length;

  const draftCount =
    blogs.length - publishedCount;

  // ============================================
  // LOADING / AUTH GUARD
  // ============================================

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-frost text-ink">
        {isAr
          ? "جارٍ التحقق من صلاحيات الدخول..."
          : "Checking dashboard access..."}
      </div>
    );
  }

  if (!user) {
    return message ? (
      <p
        role="alert"
        className="container-x py-16"
      >
        {message}
      </p>
    ) : null;
  }

  // ============================================
  // DASHBOARD UI
  // ============================================

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen bg-frost py-10 text-ink sm:py-14"
    >
      <div className="container-x">

        {/* ====================================
            DASHBOARD HEADER
        ==================================== */}

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-platinum pb-6">
          <div>
            <p className="eyebrow text-accent-600">
              AL FATEH
            </p>

            <h1 className="mt-3 text-3xl font-bold">
              {t.title}
            </h1>

            <p className="mt-2 text-sm text-mute">
              {user.email}
            </p>
          </div>

          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 border border-platinum px-4 py-2 text-sm hover:bg-white"
          >
            <LogOut size={16} />
            {t.logout}
          </button>
        </div>

        {/* ====================================
            DASHBOARD ACTIONS
        ==================================== */}

        <div className="mb-8 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 bg-ivory px-4 py-3 text-accent-600 shadow-sm">
            <LayoutDashboard size={17} />
            <span className="text-sm font-semibold">
              {t.title}
            </span>
          </div>

          <div className="inline-flex items-center gap-2 bg-ivory px-4 py-3 shadow-sm">
            <Newspaper size={17} />
            <span className="text-sm">
              {t.blogs}
            </span>
          </div>

          <button
            type="button"
            onClick={createNew}
            disabled={saving || uploading > 0}
            aria-expanded={screen === "editor"}
            aria-controls="blog-publishing-editor"
            className="ms-auto inline-flex items-center gap-2 rounded-md bg-accent-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-600 disabled:opacity-50"
          >
            <Plus size={17} />
            {t.create}
          </button>
        </div>

        {/* ====================================
            CREATE / EDIT BLOG FORM
        ==================================== */}

        {screen === "editor" && (
          <section
            id="blog-publishing-editor"
            className="blog-form mb-8 rounded-2xl border border-platinum bg-ivory shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-platinum p-5 sm:p-8">
              <h2
                ref={editorHeading}
                tabIndex={-1}
                className="text-2xl font-bold outline-none sm:text-4xl"
              >
                {editingId
                  ? isAr
                    ? "تعديل المقال"
                    : "Edit Blog Post"
                  : t.create}
              </h2>

              <button
                type="button"
                onClick={closeEditor}
                disabled={saving || uploading > 0}
                className="rounded-lg border border-platinum bg-white px-4 py-2 text-sm font-semibold disabled:opacity-50"
              >
                {isAr ? "إغلاق" : "Close"}
              </button>
            </div>

            <div
              key={editorVersion}
              inert={saving}
              className="space-y-7 p-5 sm:p-8"
            >
              {/* BLOG TITLES */}

              <Field
                label="Blog Title (English)"
                value={form.title}
                direction="ltr"
                onChange={(value) =>
                  setField("title", value)
                }
              />

              <Field
                label="Blog Title (Arabic)"
                value={form.titleAr}
                direction="rtl"
                onChange={(value) =>
                  setField("titleAr", value)
                }
              />

              {/* PUBLICATION DATE */}

              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="Publication Date"
                  value={form.publicationDate || ""}
                  type="date"
                  onChange={(value) =>
                    setField("publicationDate", value)
                  }
                />
              </div>

              {/* BLOG IMAGES */}

              <div className="grid gap-5 md:grid-cols-2">
                {(
                  [
                    ["image", "Card Image (English)"],
                    ["bannerImage", "Banner Image (English)"],
                    ["imageAr", "Card Image (Arabic)"],
                    ["bannerImageAr", "Banner Image (Arabic)"],
                  ] as const
                ).map(([field, label]) => (
                  <ImageField
                    key={field}
                    label={label}
                    value={form[field] || ""}
                    onChange={(value) =>
                      setField(field, value)
                    }
                    uploadImage={uploadImage}
                  />
                ))}

                <Field
                  label="Image Alt Text (English)"
                  value={form.imageAlt}
                  direction="ltr"
                  onChange={(value) =>
                    setField("imageAlt", value)
                  }
                />

                <Field
                  label="Image Alt Text (Arabic)"
                  value={form.imageAltAr || ""}
                  direction="rtl"
                  onChange={(value) =>
                    setField("imageAltAr", value)
                  }
                />
              </div>

              {/* RICH-TEXT CONTENT */}

              {(
                [
                  [
                    "excerptHtml",
                    "Short Description (English)",
                    "ltr",
                    false,
                  ],
                  [
                    "excerptHtmlAr",
                    "Short Description (Arabic)",
                    "rtl",
                    false,
                  ],
                  [
                    "contentHtml",
                    "Full Blog Content (English)",
                    "ltr",
                    true,
                  ],
                  [
                    "contentHtmlAr",
                    "Full Blog Content (Arabic)",
                    "rtl",
                    true,
                  ],
                ] as const
              ).map(
                ([
                  field,
                  label,
                  direction,
                  large,
                ]) => (
                  <RichTextEditor
                    key={field}
                    label={label}
                    value={form[field] || ""}
                    direction={direction}
                    large={large}
                    onChange={(value) =>
                      setField(field, value)
                    }
                    uploadImage={uploadImage}
                  />
                )
              )}

              {/* CATEGORY AND READING TIME */}

              <div className="grid gap-5 md:grid-cols-3">
                <Field
                  label="Category (English)"
                  value={form.category}
                  direction="ltr"
                  onChange={(value) =>
                    setField("category", value)
                  }
                />

                <Field
                  label="Category (Arabic)"
                  value={form.categoryAr}
                  direction="rtl"
                  onChange={(value) =>
                    setField("categoryAr", value)
                  }
                />

                <Field
                  label="Reading Time"
                  value={form.readTime}
                  onChange={(value) =>
                    setField("readTime", value)
                  }
                />
              </div>

              {/* SEO */}

              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="SEO Title (English)"
                  value={form.seoTitle || ""}
                  direction="ltr"
                  onChange={(value) =>
                    setField("seoTitle", value)
                  }
                />

                <Field
                  label="SEO Title (Arabic)"
                  value={form.seoTitleAr || ""}
                  direction="rtl"
                  onChange={(value) =>
                    setField("seoTitleAr", value)
                  }
                />

                <Field
                  label="SEO Description (English)"
                  value={form.seoDescription || ""}
                  direction="ltr"
                  multiline
                  onChange={(value) =>
                    setField("seoDescription", value)
                  }
                />

                <Field
                  label="SEO Description (Arabic)"
                  value={form.seoDescriptionAr || ""}
                  direction="rtl"
                  multiline
                  onChange={(value) =>
                    setField("seoDescriptionAr", value)
                  }
                />
              </div>

              {/* SLUG */}

              <Field
                label="URL Slug"
                value={form.slug}
                direction="ltr"
                placeholder={slugify(form.title)}
                onChange={(value) =>
                  setField("slug", value)
                }
              />
            </div>

            {/* SAVE ACTIONS */}

            <div className="sticky bottom-0 z-10 space-y-3 rounded-b-2xl border-t border-platinum bg-ivory px-5 py-3 shadow-[0_-4px_16px_#1422340d] sm:px-8">
              {message && (
                <p
                  role="alert"
                  className="text-sm text-red-700"
                >
                  {message}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-end gap-3">
                {(saving || uploading > 0) && (
                  <span
                    role="status"
                    className="text-sm text-mute"
                  >
                    {saving
                      ? "Saving…"
                      : "Uploading…"}
                  </span>
                )}

                <button
                  type="button"
                  disabled={saving || uploading > 0}
                  onClick={() => saveBlog("draft")}
                  className="inline-flex items-center gap-2 rounded-lg border border-accent-500 px-4 py-2.5 text-sm font-semibold text-accent-700 disabled:opacity-50"
                >
                  <Save size={16} />
                  {isAr
                    ? "حفظ كمسودة"
                    : "Save Draft"}
                </button>

                <button
                  type="button"
                  disabled={saving || uploading > 0}
                  onClick={() => saveBlog("published")}
                  className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-400 disabled:opacity-50"
                >
                  <Eye size={16} />
                  {isAr ? "نشر المقال" : "Publish"}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ====================================
            DASHBOARD STATISTICS
        ==================================== */}

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              label: t.total,
              count: blogs.length,
            },
            {
              label: t.published,
              count: publishedCount,
            },
            {
              label: t.draft,
              count: draftCount,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-platinum bg-ivory p-6 shadow-sm"
            >
              <p className="text-sm text-mute">
                {item.label}
              </p>

              <p className="mt-3 text-3xl font-bold">
                {item.count}
              </p>
            </div>
          ))}
        </div>

        {/* ====================================
            SUCCESS / ERROR MESSAGE
        ==================================== */}

        {message && screen === "list" && (
          <p
            role="status"
            className="mb-5 rounded-md border border-platinum bg-white p-3 text-sm"
          >
            {message}
          </p>
        )}

        {/* ====================================
            BLOG MANAGEMENT
        ==================================== */}

        <section className="rounded-xl border border-platinum bg-ivory p-5 shadow-sm sm:p-7">
          {/* SECTION HEADER */}

          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-ink sm:text-2xl">
                {t.blogs}
              </h2>

              <p className="mt-2 text-sm text-mute">
                {isAr
                  ? "عرض المقالات وإدارتها بسهولة"
                  : "Manage your published articles and drafts"}
              </p>
            </div>

            {/* SEARCH */}

            <div className="flex items-center gap-2 rounded-lg border border-platinum bg-white px-3">
              <Search
                size={17}
                className="text-mute"
              />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder={t.search}
                aria-label={t.search}
                className="w-44 bg-transparent py-3 text-sm outline-none sm:w-64"
              />
            </div>
          </div>

          {/* ====================================
              IMAGE-BASED BLOG CARD GRID
          ==================================== */}

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredBlogs.map((blog) => {
              const coverImage =
                isAr
                  ? blog.imageAr || blog.image
                  : blog.image || blog.imageAr;

              const displayTitle =
                isAr
                  ? blog.titleAr || blog.title
                  : blog.title;

              const displayCategory =
                isAr
                  ? blog.categoryAr || blog.category
                  : blog.category;

              const isPublished =
                blog.status === "published";

              const articleDate =
                formatBlogDate(blog, locale);

              return (
                <article
                  key={blog.id}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-platinum bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* COVER IMAGE */}

                  <div className="relative aspect-[16/10] overflow-hidden bg-frost">
                    {coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={coverImage}
                        alt={
                          (isAr
                            ? blog.imageAltAr
                            : blog.imageAlt) ||
                          displayTitle
                        }
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-3 text-mute">
                        <ImageIcon
                          size={38}
                          strokeWidth={1.3}
                        />

                        <span className="text-xs">
                          {isAr
                            ? "لا توجد صورة"
                            : "No Cover Image"}
                        </span>
                      </div>
                    )}

                    {/* STATUS BADGE */}

                    <span
                      className={`absolute end-3 top-3 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm ${
                        isPublished
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {isPublished
                        ? t.published
                        : t.draft}
                    </span>
                  </div>

                  {/* CARD INFORMATION */}

                  <div className="flex flex-1 flex-col p-5">

                    {/* DATE / READING TIME */}

                    <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-mute">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays
                          size={14}
                          aria-hidden
                        />

                        {articleDate}
                      </span>

                      {blog.readTime && (
                        <span className="inline-flex items-center gap-1.5">
                          <Clock3
                            size={14}
                            aria-hidden
                          />

                          {blog.readTime}
                        </span>
                      )}
                    </div>

                    {/* BLOG TITLE */}

                    <h3 className="line-clamp-3 min-h-[4.5rem] text-lg font-bold leading-snug text-ink">
                      {displayTitle}
                    </h3>

                    {/* CATEGORY */}

                    {displayCategory && (
                      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-accent-600">
                        {displayCategory}
                      </p>
                    )}

                    {/* CARD ACTIONS */}

                    <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-platinum pt-5">

                      {/* VIEW */}

                      {isPublished && (
                        <Link
                          href={`/${locale}/blog/${blog.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={t.view}
                          aria-label={t.view}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-platinum text-mute transition-colors hover:bg-frost hover:text-ink"
                        >
                          <ArrowUpRight size={17} />
                        </Link>
                      )}

                      {/* EDIT */}

                      <button
                        type="button"
                        onClick={() => editBlog(blog)}
                        disabled={saving || uploading > 0}
                        title={t.edit}
                        aria-label={t.edit}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-platinum text-accent-600 transition-colors hover:bg-accent-500/10 disabled:opacity-50"
                      >
                        <Pencil size={17} />
                      </button>

                      {/* PUBLISH / UNPUBLISH */}

                      <button
                        type="button"
                        disabled={saving || uploading > 0}
                        onClick={() => {
                          if (isPublished) {
                            unpublishBlog(blog);
                          } else {
                            editBlog(blog);
                          }
                        }}
                        className="min-h-9 flex-1 rounded-md border border-platinum px-3 text-xs font-semibold text-ink transition-colors hover:bg-frost disabled:opacity-50"
                      >
                        {isPublished
                          ? t.unpublish
                          : t.reviewPublish}
                      </button>

                      {/* DELETE */}

                      <button
                        type="button"
                        onClick={() => removeBlog(blog)}
                        disabled={saving || uploading > 0}
                        title={t.delete}
                        aria-label={t.delete}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-red-200 text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}

            {/* EMPTY STATE */}

            {filteredBlogs.length === 0 && (
              <div className="col-span-full rounded-lg border border-dashed border-platinum bg-white px-5 py-14 text-center">
                <Newspaper
                  size={38}
                  strokeWidth={1.4}
                  className="mx-auto mb-4 text-accent-500"
                />

                <p className="text-sm text-mute">
                  {t.empty}
                </p>

                {blogs.length === 0 && (
                  <button
                    type="button"
                    onClick={createNew}
                    className="mt-5 inline-flex items-center gap-2 rounded-md bg-accent-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-600"
                  >
                    <Plus size={16} />
                    {t.create}
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}

// ============================================
// REUSABLE FIELD
// ============================================

function Field({
  label,
  value,
  onChange,
  direction,
  type = "text",
  multiline,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  direction?: "ltr" | "rtl";
  type?: "date" | "text";
  multiline?: boolean;
  placeholder?: string;
}) {
  const inputProps = {
    value,
    dir: direction,
    lang: direction === "rtl" ? "ar" : "en",
    placeholder,
    className:
      "w-full min-w-0 rounded-xl border border-platinum bg-white px-4 py-3 text-sm text-ink outline-none focus:border-accent-500",
    onChange: (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement
      >
    ) => onChange(event.target.value),
  };

  return (
    <label className="block min-w-0 space-y-2">
      <span className="block text-sm font-semibold">
        {label}
      </span>

      {multiline ? (
        <textarea
          {...inputProps}
          rows={3}
        />
      ) : (
        <input
          {...inputProps}
          type={type}
        />
      )}
    </label>
  );
}

// ============================================
// IMAGE UPLOAD FIELD
// ============================================

function ImageField({
  label,
  value,
  onChange,
  uploadImage,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  uploadImage: (file: File) => Promise<string>;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File) {
    setBusy(true);
    setError("");

    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Image upload failed."
      );
    } finally {
      setBusy(false);
    }
  }

  const validPreview =
    /^(https?:\/\/|\/(?![\/\\]))/i.test(value);

  return (
    <fieldset
      className="min-w-0 space-y-3 rounded-xl border border-platinum bg-white p-4"
      disabled={busy}
      aria-busy={busy}
    >
      <legend className="px-1 text-sm font-semibold">
        {label}
      </legend>

      {/* IMAGE PREVIEW */}

      {validPreview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt={`${label} preview`}
          className="aspect-video w-full rounded-lg bg-frost object-contain"
        />
      ) : (
        <div className="flex aspect-video flex-col items-center justify-center gap-2 rounded-lg bg-frost text-mute">
          <ImageIcon
            size={32}
            strokeWidth={1.4}
          />

          <span className="text-xs">
            No image selected
          </span>
        </div>
      )}

      {/* UPLOAD / REPLACE */}

      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-platinum px-3 py-2 text-sm font-medium focus-within:ring-2 focus-within:ring-accent-500">
          <Upload size={16} />

          {busy
            ? "Uploading…"
            : value
              ? "Replace Image"
              : "Choose File"}

          <input
            type="file"
            accept={blogImageTypes}
            className="sr-only"
            onChange={(event) => {
              const file =
                event.target.files?.[0];

              event.target.value = "";

              if (file) {
                void upload(file);
              }
            }}
          />
        </label>

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-sm font-medium text-red-700 hover:underline"
          >
            Remove Image
          </button>
        )}
      </div>

      {/* IMAGE URL */}

      <Field
        label={`${label} URL`}
        value={value}
        direction="ltr"
        onChange={onChange}
      />

      {error && (
        <p
          role="alert"
          className="text-sm text-red-700"
        >
          {error}
        </p>
      )}
    </fieldset>
  );
}
