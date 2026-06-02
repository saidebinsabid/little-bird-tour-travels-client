"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { SkeletonGrid } from "@/components/ui/Loading";
import { useI18n } from "@/i18n/useI18n";
import { useContentList } from "@/hooks/useContent";
import { formatDate } from "@/utils/format";

export default function BlogList() {
  const { t, pick } = useI18n();
  const { data, isLoading } = useContentList("blogs", { status: "published", limit: 12 });
  const posts = data?.data || [];

  return (
    <Container>
      <div className="py-12">
        {isLoading ? (
          <SkeletonGrid count={6} />
        ) : posts.length ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug || post._id}`} className="card-base group shadow-[var(--shadow-card)] transition hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  {post.cover && <Image src={post.cover} alt={pick(post.title)} fill sizes="33vw" className="object-cover transition group-hover:scale-105" />}
                  {post.category && <Badge tone="accent" className="absolute left-3 top-3">{post.category}</Badge>}
                </div>
                <div className="p-5">
                  <p className="text-xs text-muted">{formatDate(post.createdAt)}</p>
                  <h3 className="mt-1 line-clamp-2 clamp-2 text-lg font-bold text-ink group-hover:text-brand">{pick(post.title)}</h3>
                  <p className="mt-2 text-sm text-body clamp-3">{pick(post.excerpt)}</p>
                  <span className="mt-3 inline-block text-sm font-semibold text-brand">{t("common.readMore")} →</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted">{t("common.noResults")}</p>
        )}
      </div>
    </Container>
  );
}
