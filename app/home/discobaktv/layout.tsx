import SubTabs from "@/components/SubTabs";

export default function TvLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="tv">
      <SubTabs />
      {children}
    </div>
  );
}
