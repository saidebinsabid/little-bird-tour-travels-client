import VisaDetail from "@/components/visa/VisaDetail";

export default async function VisaDetailPage({ params }) {
  const { slug } = await params;
  return <VisaDetail slug={slug} />;
}
