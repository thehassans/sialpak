import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, unauthorized } from "@/lib/api-auth";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin(req))) return unauthorized();
  const data = await req.json();
  
  const updateData: any = {};
  if (data.title !== undefined) updateData.title = data.title;
  if (data.subtitle !== undefined) updateData.subtitle = data.subtitle;
  if (data.eyebrow !== undefined) updateData.eyebrow = data.eyebrow;
  if (data.image !== undefined) updateData.image = data.image;
  if (data.mobileImage !== undefined) updateData.mobileImage = data.mobileImage;
  if (data.link !== undefined) updateData.link = data.link;
  if (data.position !== undefined) updateData.position = data.position;
  if (data.bgColorFrom !== undefined) updateData.bgColorFrom = data.bgColorFrom;
  if (data.bgColorTo !== undefined) updateData.bgColorTo = data.bgColorTo;
  if (data.textColor !== undefined) updateData.textColor = data.textColor;
  if (data.buttonText !== undefined) updateData.buttonText = data.buttonText;
  if (data.sortOrder !== undefined) updateData.sortOrder = Number(data.sortOrder);
  if (data.isActive !== undefined) updateData.isActive = data.isActive;
  if (data.collectionId !== undefined) updateData.collectionId = data.collectionId;

  const banner = await prisma.banner.update({
    where: { id: params.id },
    data: updateData
  });
  return NextResponse.json(banner);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin(req))) return unauthorized();
  await prisma.banner.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
