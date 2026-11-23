
import { revalidatePath } from "next/cache";

import {
  requireAdmin,
  authErrorResponse,
} from "@/lib/admin-auth";

import {
  createBlog,
  listAdminBlogs,
} from "@/lib/blogs-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ========================================
// GET - LOAD ALL BLOGS
// ========================================

export async function GET(request: Request) {
  // Check Firebase authorization first
  try {
    await requireAdmin(request);
  } catch (error) {
    return authErrorResponse(error);
  }

  // Database errors are handled separately
  try {
    console.log("[BLOGS API] Connecting to MongoDB...");

    const blogs = await listAdminBlogs();

    console.log(
      "[BLOGS API] Blogs loaded successfully:",
      blogs.length
    );

    return Response.json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.error("[BLOGS API] MongoDB error:", error);

    return Response.json(
      {
        success: false,
        message:
          "Unable to load blogs. Check MongoDB configuration and server logs.",
      },
      { status: 500 }
    );
  }
}

// ========================================
// POST - CREATE BLOG
// ========================================

export async function POST(request: Request) {
  let admin;

  try {
    admin = await requireAdmin(request);
  } catch (error) {
    return authErrorResponse(error);
  }

  try {
    const payload = await request.json();

    const blog = await createBlog(
      payload,
      admin.uid
    );

    revalidatePath("/[locale]/blog", "layout");
    return Response.json(
      {
        success: true,
        blog,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "[BLOGS API] Create blog error:",
      error
    );

    const isDuplicate =
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000;

    if (isDuplicate) {
      return Response.json(
        {
          success: false,
          message:
            "A blog with this slug already exists.",
        },
        { status: 409 }
      );
    }

    const isValidationError =
      error instanceof SyntaxError ||
      (
        error instanceof Error &&
        /required|invalid|complete both languages/i.test(
          error.message
        )
      );

    return Response.json(
      {
        success: false,
        message: isValidationError
          ? error instanceof Error
            ? error.message
            : "Invalid article data."
          : "Unable to save blog. Check server logs.",
      },
      {
        status: isValidationError ? 400 : 500,
      }
    );
  }
}
