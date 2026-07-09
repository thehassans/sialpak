export function fmtCurrency(value: number, currency = "USD") {
  const symbols: Record<string, string> = { USD: "$", SAR: "SAR ", PKR: "PKR " };
  const symbol = symbols[currency] ?? `${currency} `;
  return `${symbol}${value.toFixed(2)}`;
}

export function slugify(input: string) {
  return input
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function genOrderNumber() {
  const rnd = Math.floor(100000 + Math.random() * 900000);
  return `BS-${rnd}`;
}

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
