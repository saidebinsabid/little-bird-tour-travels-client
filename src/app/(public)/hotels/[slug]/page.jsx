import PackageDetail from "@/components/packages/PackageDetail";

export default async function HotelDetailPage({ params }) {
  const { slug } = await params;
  return (
    <PackageDetail
      slug={slug}
      resource="hotels"
      crumbBase={{ label: "Hotels", href: "/hotels" }}
      inquiryType="hotel"
    />
  );
}
