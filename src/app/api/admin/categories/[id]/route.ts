import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, unauthorized } from "@/lib/api-auth";
import { slugify } from "@/lib/utils";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin(req))) return unauthorized();
  const data = await req.json();
  const category = await prisma.category.update({
    where: { id: params.id },
    data: {
      name: data.name,
      slug: data.slug ? slugify(data.slug) : undefined,
      image: data.image || null,
      description: data.description || null,
      sortOrder: Number(data.sortOrder) || 0,
      isActive: data.isActive !== false
    }
  });
  return NextResponse.json(category);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin(req))) return unauthorized();
  await prisma.category.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
