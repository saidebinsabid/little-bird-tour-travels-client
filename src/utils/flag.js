// Country flag emojis are pairs of Unicode "regional indicator" symbols. On
// some platforms (notably Windows) they don't render as flags — the browser
// falls back to the bare letter pair like "TH". To show a real flag everywhere
// we convert the emoji back to its ISO 3166-1 alpha-2 code and load an image.

const RI_START = 0x1f1e6; // 🇦
const RI_END = 0x1f1ff; // 🇿

// "🇹🇭" → "th"  (returns null if `flag` isn't a 2-letter regional-indicator pair)
export function flagCode(flag) {
  if (!flag || typeof flag !== "string") return null;
  const cps = [...flag].map((c) => c.codePointAt(0));
  if (cps.length === 2 && cps.every((cp) => cp >= RI_START && cp <= RI_END)) {
    return cps.map((cp) => String.fromCharCode(cp - RI_START + 65)).join("").toLowerCase();
  }
  return null;
}

// SVG flag image URL (crisp at any size) or null when no code can be derived.
export function flagUrl(flag) {
  const code = flagCode(flag);
  return code ? `https://flagcdn.com/${code}.svg` : null;
}
