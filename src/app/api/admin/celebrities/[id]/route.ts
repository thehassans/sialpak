import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const updated = await prisma.celebrityRecommendation.update({
      where: { id: params.id },
      data: {
        name: data.name,
        image: data.image,
        videoUrl: data.videoUrl,
        productId: data.productId,
        sortOrder: data.sortOrder,
        isActive: data.isActive,
      }
    });
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.celebrityRecommendation.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
