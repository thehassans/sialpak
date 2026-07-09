import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { email, cartData } = await req.json();

    if (!email || !cartData) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Upsert the abandoned cart for this email
    // If they already have an abandoned cart, update it. If not, create it.
    const existing = await prisma.abandonedCart.findFirst({
      where: { email }
    });

    if (existing) {
      await prisma.abandonedCart.update({
        where: { id: existing.id },
        data: { cartData, status: "abandoned" }
      });
    } else {
      await prisma.abandonedCart.create({
        data: { email, cartData: JSON.stringify(cartData) }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to track abandoned cart:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
