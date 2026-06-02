"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { useI18n } from "@/i18n/useI18n";
import { useContentList } from "@/hooks/useContent";
import { formatDate } from "@/utils/format";

export default function BlogTeaser() {
  const { t, pick } = useI18n();
  const { data } = useContentList("blogs", { status: "published", limit: 3 });
  const posts = data?.data || [];
  if (!posts.length) return null;

  return (
    <section className="section-y bg-surface">
      <Container>
        <SectionHeading eyebrow="📝" title={t("home.latestBlog")} />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug || post._id}`}
              className="card-base group shadow-[var(--shadow-card)] transition hover:-translate-y-1"
            >
              <div className="relative h-44 overflow-hidden">
                {post.cover && (
                  <Image src={post.cover} alt={pick(post.title)} fill sizes="33vw" className="object-cover transition group-hover:scale-105" />
                )}
              </div>
              <div className="p-5">
                <p className="text-xs text-muted">{formatDate(post.createdAt)}</p>
                <h3 className="mt-1 line-clamp-2 clamp-2 font-bold text-ink group-hover:text-brand">{pick(post.title)}</h3>
                <p className="mt-2 text-sm text-body clamp-2">{pick(post.excerpt)}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
