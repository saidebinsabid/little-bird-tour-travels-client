import "./globals.css";
import { Montserrat, Teko, Hind_Siliguri } from "next/font/google";
import Providers from "@/provider/Providers";
import LoadingScreen from "@/components/ui/LoadingScreen";

// Sitewide font (Montserrat), a condensed display font kept ONLY for the hero
// title (Teko, via the .font-display class), and a dedicated Bengali font — all
// exposed as CSS variables used by globals.css.
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});
const teko = Teko({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
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
    <html lang="en" className={`${montserrat.variable} ${teko.variable} ${hindSiliguri.variable}`}>
      <body>
        <LoadingScreen />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
