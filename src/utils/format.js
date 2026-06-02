// Money + small display helpers.

const SYMBOLS = { BDT: "৳", USD: "$", EUR: "€" };

export function formatPrice(amount, currency = "BDT") {
  if (amount == null) return "";
  const sym = SYMBOLS[currency] || `${currency} `;
  return `${sym}${Number(amount).toLocaleString("en-US")}`;
}

// Accepts a price object { amount, currency, unit } or a bare number.
export function priceLabel(price) {
  if (price == null) return "";
  if (typeof price === "number") return formatPrice(price);
  return formatPrice(price.amount, price.currency);
}

export function formatDate(d) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}
