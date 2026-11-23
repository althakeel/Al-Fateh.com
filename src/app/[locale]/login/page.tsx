
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const params = useParams();

  const locale =
    params.locale === "ar" ? "ar" : "en";

  const isAr = locale === "ar";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const result =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const token =
        await result.user.getIdToken();

      const response = await fetch(
        "/api/admin/session",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );

      if (!response.ok) {
        await signOut(auth);

        throw new Error(
          isAr
            ? "ليس لديك صلاحية الوصول إلى لوحة التحكم."
            : "You do not have dashboard access."
        );
      }

      router.replace(`/${locale}/dashboard`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : isAr
            ? "فشل تسجيل الدخول."
            : "Login failed."
      );
    } finally {
      setLoading(false);
    }
  }

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
            {isAr
              ? "تسجيل دخول الإدارة"
              : "Admin Login"}
          </h1>

          <p className="mt-3 text-sm text-mute">
            {isAr
              ? "إدارة المقالات والمحتوى المنشور على الموقع"
              : "Manage articles and website content"}
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
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
              {isAr
                ? "كلمة المرور"
                : "Password"}
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
            <p
              role="alert"
              className="text-sm text-red-600"
            >
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
