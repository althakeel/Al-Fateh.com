
"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const params = useParams();

  const locale = params.locale === "ar" ? "ar" : "en";
  const isAr = locale === "ar";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------------------------------------
  // VERIFY ADMINISTRATOR ACCESS
  // ---------------------------------------

  async function verifyAdmin(user: User) {
    const token = await user.getIdToken();

    const response = await fetch("/api/admin/session", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error(
          isAr
            ? "هذا الحساب غير مصرح له بالدخول إلى لوحة التحكم."
            : "This account is not authorized to access the dashboard."
        );
      }

      throw new Error(
        isAr
          ? "تعذر التحقق من صلاحيات الإدارة. يرجى المحاولة لاحقاً."
          : "Unable to verify administrator access. Please try again."
      );
    }

    router.replace(`/${locale}/dashboard`);
  }

  // ---------------------------------------
  // EMAIL / PASSWORD LOGIN
  // ---------------------------------------

  async function handleLogin(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      try {
        await verifyAdmin(result.user);
      } catch (error) {
        await signOut(auth);
        throw error;
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : isAr
            ? "فشل تسجيل الدخول."
            : "Login failed."
      );
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------
  // GOOGLE LOGIN
  // ---------------------------------------

  async function handleGoogleLogin() {
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const provider = new GoogleAuthProvider();

      provider.setCustomParameters({
        prompt: "select_account",
      });

      const result = await signInWithPopup(
        auth,
        provider
      );

      try {
        await verifyAdmin(result.user);
      } catch (error) {
        await signOut(auth);
        throw error;
      }
    } catch (error) {
      const code =
        typeof error === "object" &&
        error !== null &&
        "code" in error
          ? String(error.code)
          : "";

      if (code === "auth/popup-closed-by-user") {
        setError(
          isAr
            ? "تم إغلاق نافذة تسجيل الدخول."
            : "Google sign-in was cancelled."
        );
      } else if (code === "auth/popup-blocked") {
        setError(
          isAr
            ? "المتصفح منع النافذة المنبثقة. يرجى السماح بها."
            : "Your browser blocked the Google popup. Please allow popups."
        );
      } else if (
        code === "auth/account-exists-with-different-credential"
      ) {
        setError(
          isAr
            ? "الحساب موجود بطريقة تسجيل دخول أخرى. سجّل الدخول بالطريقة الأصلية أولاً واربط حساب Google."
            : "This email uses another sign-in method. Sign in with the original method first and link Google."
        );
      } else {
        setError(
          error instanceof Error
            ? error.message
            : isAr
              ? "فشل تسجيل الدخول باستخدام Google."
              : "Google sign-in failed."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------
  // PAGE UI
  // ---------------------------------------

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="flex min-h-screen items-center justify-center bg-frost px-4 py-24"
    >
      <div className="w-full max-w-md border border-platinum bg-ivory p-8 shadow-luxe sm:p-10">
        <div className="mb-8 text-center">
          <p className="eyebrow text-accent-600">
            AL FATEH
          </p>

          <h1 className="mt-4 text-3xl font-bold text-ink">
            {isAr ? "تسجيل دخول الإدارة" : "Admin Login"}
          </h1>

          <p className="mt-3 text-sm text-mute">
            {isAr
              ? "إدارة المقالات والمحتوى المنشور على الموقع"
              : "Manage articles and website content"}
          </p>
        </div>

        {/* EMAIL LOGIN */}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="admin-email"
              className="mb-2 block text-sm font-medium text-ink"
            >
              {isAr
                ? "البريد الإلكتروني"
                : "Email Address"}
            </label>

            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
              autoComplete="username"
              dir="ltr"
              className="w-full border border-platinum bg-white px-4 py-3 text-ink outline-none focus:border-accent-500"
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="mb-2 block text-sm font-medium text-ink"
            >
              {isAr ? "كلمة المرور" : "Password"}
            </label>

            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
              autoComplete="current-password"
              className="w-full border border-platinum bg-white px-4 py-3 text-ink outline-none focus:border-accent-500"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-600 disabled:opacity-50"
          >
            {loading
              ? isAr
                ? "جارٍ تسجيل الدخول..."
                : "Signing in..."
              : isAr
                ? "تسجيل الدخول"
                : "Login"}
          </button>
        </form>

        {/* DIVIDER */}

        <div className="my-7 flex items-center gap-4">
          <div className="h-px flex-1 bg-platinum" />

          <span className="text-xs font-medium text-mute">
            {isAr ? "أو" : "OR"}
          </span>

          <div className="h-px flex-1 bg-platinum" />
        </div>

        {/* GOOGLE LOGIN */}

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 border border-platinum bg-white px-4 py-3 font-medium text-ink transition-colors hover:border-accent-500 hover:bg-frost disabled:opacity-50"
        >
          <svg
            width="21"
            height="21"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.39 30.47 0 24 0 14.62 5.38 6.51 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6C44.4 38.03 46.98 31.88 46.98 24.55Z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59A14.43 14.43 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.17 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.97 6.19C6.51 42.62 14.62 48 24 48Z"
            />
          </svg>

          {loading
            ? isAr
              ? "جارٍ تسجيل الدخول..."
              : "Please wait..."
            : isAr
              ? "المتابعة باستخدام Google"
              : "Continue with Google"}
        </button>

        {/* BACK TO WEBSITE */}

        <Link
          href={`/${locale}`}
          className="mt-8 block text-center text-sm text-mute hover:text-accent-600"
        >
          {isAr
            ? "العودة إلى الموقع"
            : "Back to Website"}
        </Link>
      </div>
    </section>
  );
}
