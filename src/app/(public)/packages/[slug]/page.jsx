import PackageDetail from "@/components/packages/PackageDetail";

export default async function PackageDetailPage({ params }) {
  const { slug } = await params;
  return <PackageDetail slug={slug} />;
}
