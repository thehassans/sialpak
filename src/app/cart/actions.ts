"use server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/mailer";
import { getCustomerSession } from "@/lib/auth";

export async function createOrder(data: {
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  total: number;
}) {
  const orderNumber = "ORD-" + Math.floor(100000 + Math.random() * 900000);
  const session = await getCustomerSession();
  
  const order = await prisma.order.create({
    data: {
      orderNumber,
      customerId: session ? session.sub : null,
      customerName: data.customerName,
      phone: data.phone,
      email: data.email,
      address: data.address,
      city: data.city,
      province: data.province,
      postalCode: data.postalCode,
      subtotal: data.total,
      total: data.total,
      paymentMethod: "cod",
      items: {
        create: [
          { name: "Premium Curated Item", price: data.total, qty: 1 }
        ]
      }
    }
  });

  // Send transactional email if user provided an email
  if (data.email) {
    await sendEmail({
      to: data.email,
      subject: `Order Confirmation #${orderNumber}`,
      htmlContent: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Thank you for your order!</h2>
          <p>Hi ${data.customerName},</p>
          <p>We've received your order <strong>#${orderNumber}</strong> and it is now being processed.</p>
          <p><strong>Total:</strong> PKR ${data.total.toFixed(2)}</p>
          <p><strong>Shipping Address:</strong><br/>
            ${data.address}<br/>
            ${data.city}, ${data.province}
          </p>
          <p>We'll notify you once it ships!</p>
        </div>
      `
    });
  }

  return { success: true, orderId: order.id, orderNumber };
}
