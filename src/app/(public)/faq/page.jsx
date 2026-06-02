"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/layout/PageHeader";
import { useI18n } from "@/i18n/useI18n";

const FAQS = [
  {
    q: { en: "How do I book a tour package?", bn: "কীভাবে ট্যুর প্যাকেজ বুক করব?" },
    a: { en: "Browse our packages, open one you like and submit the inquiry form. Our team will contact you to confirm details and payment.", bn: "প্যাকেজ দেখুন, পছন্দেরটি খুলে inquiry ফর্ম পূরণ করুন। আমাদের টিম বিস্তারিত ও পেমেন্ট নিশ্চিত করতে যোগাযোগ করবে।" },
  },
  {
    q: { en: "What documents are needed for a visa?", bn: "ভিসার জন্য কী কী ডকুমেন্ট লাগে?" },
    a: { en: "It varies by country. Each visa page lists the required documents. Typically: passport, photos, bank statement and NID.", bn: "দেশভেদে ভিন্ন। প্রতিটি ভিসা পেজে প্রয়োজনীয় ডকুমেন্ট দেওয়া আছে। সাধারণত: পাসপোর্ট, ছবি, ব্যাংক স্টেটমেন্ট ও এনআইডি।" },
  },
  {
    q: { en: "Do you offer Hajj and Umrah packages?", bn: "আপনারা কি হজ্জ ও উমরাহ প্যাকেজ দেন?" },
    a: { en: "Yes. We offer economy, standard and premium Hajj & Umrah packages with hotels near the Haram and full management.", bn: "হ্যাঁ। আমরা ইকোনমি, স্ট্যান্ডার্ড ও প্রিমিয়াম হজ্জ-উমরাহ প্যাকেজ দিই — হারামের কাছে হোটেল ও সম্পূর্ণ ব্যবস্থাপনাসহ।" },
  },
  {
    q: { en: "Can I customize a package?", bn: "আমি কি প্যাকেজ কাস্টমাইজ করতে পারি?" },
    a: { en: "Absolutely. Contact us with your preferences and we'll build a tailor-made itinerary and quote.", bn: "অবশ্যই। আপনার পছন্দ জানিয়ে যোগাযোগ করুন, আমরা কাস্টম itinerary ও কোটেশন তৈরি করে দেব।" },
  },
  {
    q: { en: "How can I pay?", bn: "কীভাবে পেমেন্ট করব?" },
    a: { en: "Online payment (bKash, Nagad, card) is coming soon. For now, our team shares payment details after confirming your booking.", bn: "অনলাইন পেমেন্ট (বিকাশ, নগদ, কার্ড) শীঘ্রই আসছে। এখন বুকিং নিশ্চিত হওয়ার পর আমাদের টিম পেমেন্ট তথ্য জানিয়ে দেয়।" },
  },
];

export default function FaqPage() {
  const { pick, lang } = useI18n();
  const [open, setOpen] = useState(0);

  return (
    <>
      <PageHeader
        title={lang === "bn" ? "সাধারণ জিজ্ঞাসা" : "Frequently Asked Questions"}
        crumbs={[{ label: "FAQ" }]}
        bg="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80"
      />
      <Container>
        <div className="mx-auto max-w-3xl py-14 space-y-3">
          {FAQS.map((f, i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-slate-200">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 bg-white px-5 py-4 text-left font-semibold text-ink hover:bg-surface"
              >
                {pick(f.q)}
                <span className="text-brand text-xl">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && <div className="border-t border-slate-100 px-5 py-4 text-body">{pick(f.a)}</div>}
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
