import DestinationDetail from "@/components/destinations/DestinationDetail";

export default async function DestinationDetailPage({ params }) {
  const { slug } = await params;
  return <DestinationDetail slug={slug} />;
}
