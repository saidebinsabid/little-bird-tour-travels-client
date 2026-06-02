import BlogDetail from "@/components/blog/BlogDetail";

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  return <BlogDetail slug={slug} />;
}
