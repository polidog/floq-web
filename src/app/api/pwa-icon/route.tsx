import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const sizeParam = searchParams.get("size");
  const size = sizeParam === "512" ? 512 : 192;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#2563eb",
        }}
      >
        <span
          style={{
            fontSize: size * 0.65,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1,
          }}
        >
          f
        </span>
      </div>
    ),
    { width: size, height: size }
  );
}
