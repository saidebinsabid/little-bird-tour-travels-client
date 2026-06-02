"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/layout/PageHeader";
import Badge from "@/components/ui/Badge";
import { PageLoader } from "@/components/ui/Loading";
import { useI18n } from "@/i18n/useI18n";
import { useContentItem } from "@/hooks/useContent";
import { formatDate } from "@/utils/format";

export default function BlogDetail({ slug }) {
  const { t, pick } = useI18n();
  const { data: post, isLoading } = useContentItem("blogs", slug);

  if (isLoading) return <PageLoader />;
  if (!post) return <Container><div className="py-24 text-center text-muted">{t("common.noResults")}</div></Container>;

  const title = pick(post.title);

  return (
    <>
      <PageHeader title={title} crumbs={[{ label: "Blog", href: "/blog" }, { label: title }]} bg={post.cover} />
      <Container>
        <article className="mx-auto max-w-3xl py-12">
          <div className="flex items-center gap-3 text-sm text-muted">
            {post.category && <Badge tone="accent">{post.category}</Badge>}
            <span>{formatDate(post.createdAt)}</span>
          </div>
          {post.cover && (
            <div className="relative mt-5 h-72 overflow-hidden rounded-2xl md:h-96">
              <Image src={post.cover} alt={title} fill sizes="100vw" className="object-cover" priority />
            </div>
          )}
          <div className="prose mt-8 max-w-none leading-relaxed text-body">
            {pick(post.excerpt) && <p className="text-lg font-medium text-ink">{pick(post.excerpt)}</p>}
            <p className="mt-4 whitespace-pre-line">{pick(post.content)}</p>
          </div>
          {post.tags?.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => <Badge key={tag} tone="gray">#{tag}</Badge>)}
            </div>
          )}
        </article>
      </Container>
    </>
  );
}
