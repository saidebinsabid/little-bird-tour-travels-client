import PackageDetail from "@/components/packages/PackageDetail";

export default async function HajjDetailPage({ params }) {
  const { slug } = await params;
  return (
    <PackageDetail
      slug={slug}
      resource="hajj"
      crumbBase={{ label: "Hajj & Umrah", href: "/hajj-umrah" }}
      inquiryType="hajj"
    />
  );
}
