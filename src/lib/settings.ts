import { prisma } from "./prisma";

export async function getSetting<T = any>(key: string, fallback: T): Promise<T> {
  const row = await prisma.setting.findUnique({ where: { key } });
  if (!row) return fallback;
  try {
    return JSON.parse(row.value) as T;
  } catch {
    return fallback;
  }
}

export async function setSetting(key: string, value: unknown) {
  const json = JSON.stringify(value);
  await prisma.setting.upsert({
    where: { key },
    update: { value: json },
    create: { key, value: json }
  });
  return value;
}

export const DEFAULT_SETTINGS = {
  general: { storeName: "BuySial", tagline: "Your Everyday Shopping Destination", supportPhone: "+1 212-334-0212", currency: "USD", freeShippingText: "Worldwide Free Shipping" },
  seo: { metaTitle: "BuySial — Your Everyday Shopping Destination", metaDescription: "Shop beauty, fashion, electronics and more with fast worldwide shipping.", ogImage: "", robotsIndex: true, sitemapEnabled: true },
  pixels: { ga4Id: "", metaPixelId: "", tiktokPixelId: "", snapPixelId: "", gtmId: "" },
  payments: {
    codEnabled: true,
    jazzcash: { enabled: false, merchantId: "", password: "", integritySalt: "", mode: "sandbox", displayNumber: "", displayName: "" },
    easypaisa: { enabled: false, storeId: "", accountNum: "", hashKey: "", mode: "sandbox", displayNumber: "", displayName: "" },
    payfast: { enabled: false, merchantId: "", secureKey: "", mode: "sandbox" },
    bankTransfer: { enabled: false, accountTitle: "", accountNumber: "", bankName: "", iban: "", displayInstructions: "" }
  },
  logistics: {
    defaultCourier: "leopards",
    leopards: { enabled: true, apiKey: "", apiPassword: "" },
    tcs: { enabled: false, apiKey: "", costCenter: "" },
    postex: { enabled: false, apiKey: "" },
    mnp: { enabled: false, apiKey: "" }
  }
} as const;
