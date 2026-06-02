import PageHeader from "@/components/layout/PageHeader";
import BlogList from "@/components/blog/BlogList";

export const metadata = { title: "Blog & Travel Guide" };

export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="Blog & Travel Guide"
        subtitle="Tips, guides and stories for your next trip."
        crumbs={[{ label: "Blog" }]}
        bg="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2000&q=80"
      />
      <BlogList />
    </>
  );
}
