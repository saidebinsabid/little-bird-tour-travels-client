import "./globals.css";
import { Inter, Hind_Siliguri } from "next/font/google";
import Providers from "@/provider/Providers";

// Latin UI font + dedicated Bengali font, exposed as CSS variables used by
// globals.css (--font-inter / --font-bangla).
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bangla",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Little Bird Tours & Travels — Tour, Air Ticket, Visa, Hajj & Umrah",
    template: "%s | Little Bird Tours & Travels",
  },
  description:
    "Tour packages, air tickets, visa processing, Hajj & Umrah and hotel booking in Bangladesh. Your journey, our passion.",
  keywords: ["tour", "travel", "hajj", "umrah", "air ticket", "visa", "bangladesh", "cox's bazar"],
  openGraph: {
    title: "Little Bird Tours & Travels",
    description: "Tour packages, air tickets, visa, Hajj & Umrah and hotel booking.",
    type: "website",
  },
};

// Root layout wraps EVERY page. Fonts, <html>, and the Providers tree go here.
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${hindSiliguri.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
