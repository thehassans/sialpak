import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, unauthorized } from "@/lib/api-auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin(req))) return unauthorized();
  const order = await prisma.order.findUnique({ where: { id: params.id }, include: { items: true } });
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(order);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin(req))) return unauthorized();
  const data = await req.json();
  const order = await prisma.order.update({
    where: { id: params.id },
    data: {
      orderStatus: data.orderStatus,
      paymentStatus: data.paymentStatus,
      courierProvider: data.courierProvider || null,
      trackingNumber: data.trackingNumber || null,
      notes: data.notes || null
    }
  });
  return NextResponse.json(order);
}
