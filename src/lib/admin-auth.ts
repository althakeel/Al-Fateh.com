
import "server-only";

import { adminAuth } from "@/lib/firebase-admin";

export interface AdminIdentity {
  uid: string;
  email: string | null;
}

export async function requireAdmin(
  request: Request
): Promise<AdminIdentity> {
  console.log("[ADMIN AUTH] Starting verification");

  // STEP 1: Check Authorization header
  const authorization =
    request.headers.get("authorization") || "";

  if (!authorization.startsWith("Bearer ")) {
    console.error(
      "[ADMIN AUTH] Missing Bearer token"
    );

    throw new Error("UNAUTHORIZED");
  }

  const token = authorization.slice(7).trim();

  if (!token) {
    console.error(
      "[ADMIN AUTH] Empty Firebase token"
    );

    throw new Error("UNAUTHORIZED");
  }

  console.log(
    "[ADMIN AUTH] Bearer token received"
  );

  // STEP 2: Verify Firebase token
  let decoded;

  try {
    decoded = await adminAuth().verifyIdToken(
      token,
      true
    );

    console.log(
      "[ADMIN AUTH] Firebase token verified"
    );
  } catch (error) {
    const code =
      typeof error === "object" &&
      error !== null &&
      "code" in error
        ? String(error.code)
        : "unknown";

    const message =
      error instanceof Error
        ? error.message
        : "Unknown Firebase error";

    console.error(
      "[ADMIN AUTH] Firebase verification failed:",
      { code, message }
    );

    if (
      code === "auth/id-token-expired" ||
      code === "auth/id-token-revoked" ||
      code === "auth/invalid-id-token" ||
      code === "auth/argument-error" ||
      code === "auth/user-disabled"
    ) {
      throw new Error("UNAUTHORIZED");
    }

    throw new Error("AUTH_CONFIGURATION_ERROR");
  }

  // STEP 3: Check administrator UID
  const allowedUid =
    process.env.ALFATEH_ADMIN_UID?.trim();

  console.log("[ADMIN AUTH] UID verification:", {
    uidConfigured: Boolean(allowedUid),
    uidMatches:
      Boolean(allowedUid) &&
      decoded.uid === allowedUid,
    firebaseProjectConfigured: Boolean(
      process.env.FIREBASE_ADMIN_PROJECT_ID
    ),
  });

  if (!allowedUid) {
    console.error(
      "[ADMIN AUTH] ALFATEH_ADMIN_UID is missing"
    );

    throw new Error("AUTH_CONFIGURATION_ERROR");
  }

  if (decoded.uid !== allowedUid) {
    console.error(
      "[ADMIN AUTH] Signed-in user is not authorized"
    );

    throw new Error("FORBIDDEN");
  }

  console.log(
    "[ADMIN AUTH] Administrator verified successfully"
  );

  return {
    uid: decoded.uid,
    email: decoded.email || null,
  };
}

export function authErrorResponse(error: unknown) {
  const message =
    error instanceof Error
      ? error.message
      : "";

  if (message === "UNAUTHORIZED") {
    return Response.json(
      {
        success: false,
        message: "Authentication required.",
      },
      { status: 401 }
    );
  }

  if (message === "FORBIDDEN") {
    return Response.json(
      {
        success: false,
        message: "Access denied.",
      },
      { status: 403 }
    );
  }

  console.error(
    "[ADMIN AUTH] Server configuration error"
  );

  return Response.json(
    {
      success: false,
      message: "Authentication service unavailable.",
    },
    { status: 500 }
  );
}
