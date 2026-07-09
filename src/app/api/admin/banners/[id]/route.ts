import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, unauthorized } from "@/lib/api-auth";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin(req))) return unauthorized();
  const data = await req.json();
  const banner = await prisma.banner.update({
    where: { id: params.id },
    data: {
      title: data.title,
      subtitle: data.subtitle || null,
      eyebrow: data.eyebrow || null,
      image: data.image,
      mobileImage: data.mobileImage || null,
      link: data.link || "#",
      position: data.position || "hero",
      bgColorFrom: data.bgColorFrom,
      bgColorTo: data.bgColorTo,
      textColor: data.textColor,
      buttonText: data.buttonText,
      sortOrder: Number(data.sortOrder) || 0,
      isActive: data.isActive !== false
    }
  });
  return NextResponse.json(banner);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin(req))) return unauthorized();
  await prisma.banner.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
