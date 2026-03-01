"use server";

import { createClient } from "@libsql/client/http";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_NAME, encrypt } from "@/lib/auth/cookies";

interface AuthResult {
  error?: string;
}

export async function authenticate(
  url: string,
  authToken: string,
): Promise<AuthResult> {
  if (!url || !authToken) {
    return { error: "URLとAuth Tokenは必須です" };
  }

  if (!url.startsWith("libsql://") && !url.startsWith("https://")) {
    return { error: "URLはlibsql://またはhttps://で始まる必要があります" };
  }

  try {
    const client = createClient({ url, authToken });
    await client.execute("SELECT 1");
  } catch {
    return {
      error: "データベースに接続できませんでした。認証情報を確認してください",
    };
  }

  const data = JSON.stringify({ url, authToken });
  const encrypted = encrypt(data);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, encrypted, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });

  redirect("/tasks");
}

export async function authenticateFromQr(qrData: string): Promise<AuthResult> {
  let parsed: { url?: string; authToken?: string };
  try {
    parsed = JSON.parse(qrData);
  } catch {
    return { error: "QRコードのデータが無効です" };
  }

  if (!parsed.url || !parsed.authToken) {
    return { error: "QRコードにURLまたはAuth Tokenが含まれていません" };
  }

  return authenticate(parsed.url, parsed.authToken);
}
