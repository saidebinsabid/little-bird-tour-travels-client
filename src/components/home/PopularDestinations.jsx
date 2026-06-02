"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { SkeletonGrid } from "@/components/ui/Loading";
import { useI18n } from "@/i18n/useI18n";
import { useContentList } from "@/hooks/useContent";

export default function PopularDestinations() {
  const { t, pick } = useI18n();
  const { data, isLoading } = useContentList("destinations", {
    popular: true,
    status: "published",
    limit: 8,
  });
  const items = data?.data || [];

  return (
    <section className="section-y">
      <Container>
        <SectionHeading title={t("home.popularDest")} />
        <div className="mt-12">
          {isLoading ? (
            <SkeletonGrid count={4} />
          ) : (
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
              {items.map((d) => (
                <Link
                  key={d._id}
                  href={`/destinations/${d.slug || d._id}`}
                  className="group relative block h-56 overflow-hidden rounded-2xl"
                >
                  {d.image && (
                    <Image
                      src={d.image}
                      alt={pick(d.name)}
                      fill
                      sizes="(max-width:768px) 50vw, 25vw"
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 p-4 text-white">
                    <h3 className="text-lg font-bold">{pick(d.name)}</h3>
                    <p className="text-xs text-slate-200">{d.country}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
