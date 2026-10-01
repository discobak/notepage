import Link from "next/link";
import Tabs from "@/components/Tabs";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="home-header">
        <Link href="/" className="home-logo">
          Discobak
        </Link>
        <Tabs />
      </header>
      <main className="home-main">{children}</main>
    </>
  );
}
