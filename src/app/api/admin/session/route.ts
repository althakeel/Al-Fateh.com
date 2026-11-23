
import {
  requireAdmin,
  authErrorResponse,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const admin = await requireAdmin(request);

    return Response.json({
      success: true,
      user: admin,
    });
  } catch (error) {
    return authErrorResponse(error);
  }
}
