"use client";

import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import { authenticateFromQr } from "@/actions/auth";

type Mode = "idle" | "camera" | "processing";

export function QrScanner() {
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("idle");
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleQrResult(decodedText: string) {
    setMode("processing");
    const result = await authenticateFromQr(decodedText);
    if (result?.error) {
      setError(result.error);
      setMode("idle");
    }
  }

  async function startCamera() {
    setError(null);
    setMode("camera");

    try {
      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        async (decodedText) => {
          await scanner.stop();
          scannerRef.current = null;
          await handleQrResult(decodedText);
        },
        () => {},
      );
    } catch (err) {
      scannerRef.current = null;
      setMode("idle");

      const message =
        err instanceof Error ? err.message : String(err);
      console.error("QR Scanner error:", err);
      if (
        message.includes("NotAllowedError") ||
        message.includes("Permission")
      ) {
        setError(
          "カメラへのアクセスが拒否されました。ブラウザの設定でカメラを許可してください。",
        );
      } else if (
        message.includes("NotFoundError") ||
        message.includes("Requested device not found")
      ) {
        setError(
          "カメラが見つかりませんでした。画像ファイルからQRコードを読み取ってください。",
        );
      } else {
        setError(`カメラの起動に失敗しました: ${message}`);
      }
    }
  }

  async function stopCamera() {
    if (scannerRef.current) {
      await scannerRef.current.stop().catch(() => {});
      scannerRef.current = null;
    }
    setMode("idle");
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setMode("processing");

    try {
      const scanner = new Html5Qrcode("qr-file-reader");
      const result = await scanner.scanFile(file, true);
      scanner.clear();
      await handleQrResult(result);
    } catch {
      setMode("idle");
      setError("画像からQRコードを読み取れませんでした。別の画像を試してください。");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
        scannerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="space-y-3">
      <div
        id="qr-reader"
        className={`mx-auto w-full max-w-sm overflow-hidden rounded-lg ${mode !== "camera" ? "hidden" : ""}`}
      />
      <div id="qr-file-reader" className="hidden" />

      {mode === "idle" && (
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={startCamera}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700"
          >
            カメラでスキャン
          </button>
          <label className="flex w-full cursor-pointer items-center justify-center rounded-lg border border-zinc-300 bg-white px-4 py-3 font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
            画像ファイルから読み取り
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      )}

      {mode === "camera" && (
        <div className="space-y-2">
          <p className="text-center text-sm text-zinc-500">
            QRコードをカメラに向けてください...
          </p>
          <button
            type="button"
            onClick={stopCamera}
            className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            カメラを停止
          </button>
        </div>
      )}

      {mode === "processing" && (
        <p className="text-center text-sm text-zinc-500">接続を確認中...</p>
      )}

      {error && <p className="text-center text-sm text-red-600">{error}</p>}
    </div>
  );
}
