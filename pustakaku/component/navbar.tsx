"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuNavigasi = [
  { label: "Beranda", href: "/" },
  { label: "Daftar Buku", href: "/daftarbuku/buku" },
];

export default function Navbar() {
  const pathname = usePathname();

  function aktif(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#183b32]/10 bg-[#f7f6f0]/95 backdrop-blur">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-16"
      >
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Pustakaku, beranda"
        >
          <span className="flex size-10 items-center justify-center rounded-2xl bg-[#183b32] text-[#f7f6f0]">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="size-5"
            >
              <path
                d="M4.5 5.75c2.8-.8 5.3-.35 7.5 1.35v12c-2.2-1.7-4.7-2.15-7.5-1.35v-12Zm15 0c-2.8-.8-5.3-.35-7.5 1.35v12c2.2-1.7 4.7-2.15 7.5-1.35v-12Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-xl font-semibold tracking-tight text-[#183b32]">
            pustakaku
          </span>
        </Link>

        <div className="flex items-center gap-1 rounded-full border border-[#183b32]/10 bg-white/70 p-1">
          {menuNavigasi.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={aktif(item.href) ? "page" : undefined}
              className={
                aktif(item.href)
                  ? "rounded-full bg-[#183b32] px-4 py-2 text-sm font-semibold text-white sm:px-5"
                  : "rounded-full px-3 py-2 text-sm font-medium text-[#597067] transition hover:bg-[#e8eee6] hover:text-[#183b32] sm:px-5"
              }
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}