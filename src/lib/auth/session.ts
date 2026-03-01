import { cookies } from "next/headers";
import { createTursoClient } from "../db/client";
import { COOKIE_NAME, decrypt } from "./cookies";

export interface TursoCredentials {
  url: string;
  authToken: string;
}

export async function getSession(): Promise<TursoCredentials | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME);
  if (!sessionCookie) return null;

  try {
    const decrypted = decrypt(sessionCookie.value);
    const credentials = JSON.parse(decrypted) as TursoCredentials;
    if (!credentials.url || !credentials.authToken) return null;
    return credentials;
  } catch {
    return null;
  }
}

export async function getDb() {
  const session = await getSession();
  if (!session) {
    throw new Error("Not authenticated");
  }
  return createTursoClient(session.url, session.authToken);
}
