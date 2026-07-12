import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/api-auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return unauthorized();

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  let buffer = Buffer.from(bytes);
  let ext = "webp";
  
  // Convert to WebP if it's an image (excluding svg/gif which might lose animation or vector)
  const isImage = file.type.startsWith("image/");
  const isExcluded = file.type.includes("svg") || file.type.includes("gif");
  
  if (isImage && !isExcluded) {
    buffer = await sharp(buffer).webp({ quality: 80 }).toBuffer();
  } else if (!isImage) {
    ext = (file.name.split(".").pop() || "bin").toLowerCase().replace(/[^a-z0-9]/g, "");
  } else {
    ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  }

  const filename = `${nanoid(10)}.${ext}`;
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });
  await writeFile(path.join(uploadsDir, filename), buffer);

  return NextResponse.json({ url: `/uploads/${filename}` });
}
