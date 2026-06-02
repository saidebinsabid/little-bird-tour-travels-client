"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { useI18n } from "@/i18n/useI18n";
import { useContentList } from "@/hooks/useContent";
import Icon from "@/components/icons/Icon";
import { buttonClasses } from "@/components/ui/Button";

// "Travel Tips & Advice" — surfaces blog posts tagged as advice/tips, the
// place to publish the agency's Facebook advice posts (add them via Admin → Blog).
export default function TravelTips() {
  const { t, pick, lang } = useI18n();
  const { data } = useContentList("blogs", { status: "published", limit: 4 });
  const posts = (data?.data || []).slice(0, 4);
  if (!posts.length) return null;

  return (
    <section className="section-y">
      <Container>
        <SectionHeading
          title={lang === "bn" ? "ভ্রমণ টিপস ও পরামর্শ" : "Travel Tips & Advice"}
          subtitle={lang === "bn" ? "আমাদের বিশেষজ্ঞদের কাছ থেকে দরকারি পরামর্শ।" : "Helpful advice from our travel experts."}
        />
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {posts.map((p) => (
            <Link
              key={p._id}
              href={`/blog/${p.slug || p._id}`}
              className="group flex flex-col rounded-2xl border-l-4 border-accent bg-surface p-5 shadow-[var(--shadow-card)] transition hover:-translate-y-1"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent-dark">
                <Icon name="idea" className="h-6 w-6" />
              </span>
              <h3 className="mt-2 line-clamp-2 clamp-2 font-bold text-ink group-hover:text-brand">{pick(p.title)}</h3>
              <p className="mt-2 text-sm text-body clamp-3">{pick(p.excerpt)}</p>
              <span className="mt-auto pt-3 text-sm font-semibold text-brand">{t("common.readMore")} →</span>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/blog" className={buttonClasses({ variant: "outline", size: "lg" })}>{t("common.viewAll")} →</Link>
        </div>
      </Container>
    </section>
  );
}
