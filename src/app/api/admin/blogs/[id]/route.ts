
import { revalidatePath } from "next/cache";

import {
  requireAdmin,
  authErrorResponse,
} from "@/lib/admin-auth";

import {
  updateBlog,
  deleteBlog,
} from "@/lib/blogs-server";

export const runtime = "nodejs";

interface Context {
  params: Promise<{ id: string }>;
}

export async function PATCH(
  request: Request,
  context: Context
) {
  let admin;

  try {
    admin = await requireAdmin(request);
  } catch (error) {
    return authErrorResponse(error);
  }

  try {
    const { id } = await context.params;
    const input = await request.json();

    const blog = await updateBlog(
      id,
      input,
      admin.uid
    );

    if (!blog) {
      return Response.json(
        { success: false, message: "Blog not found." },
        { status: 404 }
      );
    }

    revalidatePath("/[locale]/blog", "layout");
    return Response.json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error("[BLOGS API] Update blog error:", error);
    const validation = error instanceof SyntaxError || (error instanceof Error && /required|invalid|complete both languages/i.test(error.message));
    const duplicate =
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000;

    return Response.json(
      {
        success: false,
        message: duplicate
          ? "A blog with this slug already exists."
          : validation && error instanceof Error
            ? error.message
            : "Unable to update blog. Check server logs.",
      },
      { status: duplicate ? 409 : validation ? 400 : 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: Context
) {
  try {
    await requireAdmin(request);
  } catch (error) {
    return authErrorResponse(error);
  }

  try {
    const { id } = await context.params;

    const deleted = await deleteBlog(id);

    if (!deleted) {
      return Response.json(
        { success: false, message: "Blog not found." },
        { status: 404 }
      );
    }

    revalidatePath("/[locale]/blog", "layout");
    return Response.json({ success: true });
  } catch {
    return Response.json(
      { success: false, message: "Delete failed." },
      { status: 500 }
    );
  }
}
