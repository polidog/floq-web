import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { QrScanner } from "@/components/qr-scanner";
import { getSession } from "@/lib/auth/session";

export default async function LoginPage() {
  const session = await getSession();
  if (session) {
    redirect("/tasks");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            floq
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            CLIのQRコードをスキャンして接続
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="space-y-6">
            <div>
              <h2 className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                QRコードで接続
              </h2>
              <QrScanner />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-200 dark:border-zinc-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-zinc-500 dark:bg-zinc-900">
                  または
                </span>
              </div>
            </div>

            <div>
              <h2 className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                手動で接続情報を入力
              </h2>
              <LoginForm />
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-500 dark:text-zinc-500">
          CLIで{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono dark:bg-zinc-800">
            floq config turso --qr
          </code>{" "}
          を実行してQRコードを表示
        </p>
      </div>
    </div>
  );
}
