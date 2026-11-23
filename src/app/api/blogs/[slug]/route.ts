
import { getPublishedBlog } from "@/lib/blogs-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Context {
  params: Promise<{ slug: string }>;
}

export async function GET(
  _request: Request,
  context: Context
) {
  try {
    const { slug } = await context.params;

    const blog = await getPublishedBlog(slug);

    if (!blog) {
      return Response.json(
        { success: false, message: "Blog not found." },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      blog,
    });
  } catch {
    return Response.json(
      {
        success: false,
        message: "Failed to load blog.",
      },
      { status: 500 }
    );
  }
}
