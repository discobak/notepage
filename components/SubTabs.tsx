"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SUBTABS = [
  { href: "/home/discobaktv", label: "Transmissão" },
  { href: "/home/discobaktv/agenda", label: "Agenda de eventos" },
];

export default function SubTabs() {
  const pathname = usePathname();

  return (
    <nav className="subtabs" aria-label="DiscobakTV">
      {SUBTABS.map((t) => {
        const active = pathname === t.href;
        return (
          <Link
            key={t.href}
            href={t.href}
            className={`subtab ${active ? "subtab-active" : ""}`}
            aria-current={active ? "page" : undefined}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
