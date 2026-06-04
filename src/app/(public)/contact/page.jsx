import ContactView from "@/components/contact/ContactView";

// Server component so the browser tab / history shows "Contact Us"
// (the root layout template appends " | Little Bird Tours & Travels").
export const metadata = { title: "Contact Us" };

export default function ContactPage() {
  return <ContactView />;
}
