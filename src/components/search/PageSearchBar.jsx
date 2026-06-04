import Container from "@/components/ui/Container";

// A floating white search card that overlaps the bottom of a PageHeader —
// used on /packages and /visa to give the same search functionality as the
// home hero, in a professional bar.
export default function PageSearchBar({ children }) {
  return (
    <Container>
      <div className="relative z-10 -mt-10 rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-200 md:-mt-14">
        {children}
      </div>
    </Container>
  );
}
