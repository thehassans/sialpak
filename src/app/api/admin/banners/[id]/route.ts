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
  if (data.alignLeft !== undefined) updateData.alignLeft = data.alignLeft;
  if (data.imageFit !== undefined) updateData.imageFit = data.imageFit;
  if (data.collectionId !== undefined) updateData.collectionId = data.collectionId;
  if (data.productId !== undefined) updateData.productId = data.productId;

  if (params.id.startsWith('demo-')) {
    // Instantiate a demo banner as a real one
    let position = "hero";
    let defaultTitle = "Upload Hero Image";
    let defaultSubtitle = "Click to upload your main hero image";
    let defaultEyebrow = "Welcome";
    let defaultBgColorFrom = "transparent";
    let defaultBgColorTo = "transparent";
    let defaultTextColor = "#ffffff";
    let defaultButtonText = "Shop Now";

    if (params.id.includes('promo')) {
      position = "promo";
      defaultTitle = "Dermatologist Recommended Melasma & Dark Spot Treatment";
      defaultSubtitle = "Buysial Tritospot Cream clinically targets hyperpigmentation and restores natural skin radiance.";
      defaultEyebrow = "Dark Spot Treatment";
      defaultButtonText = "Shop Tritospot";
      defaultBgColorFrom = "transparent";
      defaultBgColorTo = "#0b1221";
      defaultTextColor = "#ffffff";
    } else if (params.id.includes('strip')) {
      position = "strip";
      defaultTitle = "Discover The Signature Collection";
      defaultSubtitle = "Curated premium products designed for maximum results and luxury feel.";
      defaultButtonText = "Explore Collection";
      defaultBgColorFrom = "transparent";
      defaultBgColorTo = "transparent";
      defaultTextColor = "#000000";
    } else if (params.id === 'demo-hero-2') {
      defaultTitle = "Secondary Banner";
      defaultSubtitle = "Upload a secondary image";
      defaultEyebrow = "Featured";
      defaultButtonText = "View More";
    }
    
    const banner = await prisma.banner.create({
      data: {
        title: updateData.title || defaultTitle,
        subtitle: updateData.subtitle !== undefined ? updateData.subtitle : defaultSubtitle,
        eyebrow: updateData.eyebrow !== undefined ? updateData.eyebrow : defaultEyebrow,
        image: updateData.image || "/placeholder.png",
        mobileImage: updateData.mobileImage,
        link: updateData.link || "#",
        position: position,
        bgColorFrom: updateData.bgColorFrom || defaultBgColorFrom,
        bgColorTo: updateData.bgColorTo || defaultBgColorTo,
        textColor: updateData.textColor || defaultTextColor,
        buttonText: updateData.buttonText || defaultButtonText,
        sortOrder: 0,
        isActive: true
      }
    });
    return NextResponse.json(banner);
  }

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
