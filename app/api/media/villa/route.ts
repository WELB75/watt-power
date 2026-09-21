export const dynamic = "force-dynamic";

export function GET() {
  const chunks = [
    process.env.VILLA_B64_01,
    process.env.VILLA_B64_02,
    process.env.VILLA_B64_03,
    process.env.VILLA_B64_04,
    process.env.VILLA_B64_05,
    process.env.VILLA_B64_06,
  ];

  if (chunks.some((chunk) => !chunk)) {
    return new Response("Villa asset unavailable", { status: 404 });
  }

  const bytes = Buffer.from(chunks.join(""), "base64");

  return new Response(bytes, {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Length": String(bytes.byteLength),
    },
  });
}
