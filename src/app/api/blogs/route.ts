
import { listPublishedBlogs } from "@/lib/blogs-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const blogs = await listPublishedBlogs();

    return Response.json(
      { success: true, blogs },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch {
    return Response.json(
      {
        success: false,
        message: "Failed to load blogs.",
      },
      { status: 500 }
    );
  }
}
