import { createClient } from "@libsql/client/http";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

export function createTursoClient(url: string, authToken: string) {
  const client = createClient({ url, authToken });
  return drizzle(client, { schema });
}
