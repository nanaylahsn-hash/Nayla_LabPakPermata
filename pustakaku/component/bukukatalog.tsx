"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import StockBadge from "./stockbadge";
import type { Buku } from "../lib/buku";

const fieldClassName =
  "w-full rounded-full border border-[#183b32]/15 bg-white py-3 pl-11 pr-4 text-sm text-[#183b32] outline-none transition placeholder:text-[#89968f] focus:border-[#315c4d] focus:ring-2 focus:ring-[#315c4d]/10";

export default function BukuKatalog({ buku: bukuAwal }: { buku: Buku[] }) {
  const [kataKunci, setKataKunci] = useState("");

  const hasilPencarian = useMemo(() => {
    const kata = kataKunci.trim().toLocaleLowerCase("id");

    if (!kata) {
      return bukuAwal;
    }

    return bukuAwal.filter((item) =>
      [item.judul, item.penulis, item.kategori].some((nilai) =>
        nilai.toLocaleLowerCase("id").includes(kata),
      ),
    );
  }, [bukuAwal, kataKunci]);

  return (
    <main className="min-h-screen bg-[#f7f6f0] text-[#183b32]">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-[#bd704c]">
              KOLEKSI PUSTAKAKU
            </p>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
              Daftar buku
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#597067]">
              Jelajahi koleksi, cari buku yang Anda inginkan, atau tambahkan
              buku baru ke perpustakaan.
            </p>
          </div>
          <Link
            href="/daftarbuku/buku/baru"
            className="inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-full bg-[#183b32] px-5 text-sm font-semibold text-white transition hover:bg-[#285548] sm:self-auto"
          >
            <span aria-hidden="true" className="text-lg leading-none">
              +
            </span>
            Tambah buku
          </Link>
        </div>

        <div className="mt-10">
          <label className="relative block max-w-xl">
            <span className="sr-only">Cari buku berdasarkan judul, penulis, atau kategori</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#718078]"
            >
              <circle
                cx="10.8"
                cy="10.8"
                r="6.8"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <path
                d="m16 16 4 4"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="search"
              value={kataKunci}
              onChange={(event) => setKataKunci(event.target.value)}
              placeholder="Cari judul, penulis, atau kategori..."
              className={fieldClassName}
            />
          </label>
          <p className="mt-4 text-sm text-[#718078]" aria-live="polite">
            {hasilPencarian.length} buku ditemukan
          </p>
        </div>

        {hasilPencarian.length > 0 ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {hasilPencarian.map((item) => (
              <article
                key={item.id}
                className="flex min-h-64 flex-col rounded-3xl border border-[#183b32]/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full bg-[#f4eee4] px-3 py-1.5 text-xs font-medium text-[#9a6044]">
                    {item.kategori}
                  </span>
                  <StockBadge stock={item.stok} />
                </div>
                <h2 className="mt-5 line-clamp-2 font-serif text-2xl leading-tight">
                  {item.judul}
                </h2>
                <p className="mt-2 text-sm text-[#597067]">
                  {item.penulis} · {item.tahun}
                </p>
                {item.deskripsi && (
                  <p className="mt-4 line-clamp-2 text-sm leading-6 text-[#718078]">
                    {item.deskripsi}
                  </p>
                )}
                <Link
                  href={`/daftarbuku/buku/${encodeURIComponent(item.id)}`}
                  className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-[#315c4d] hover:text-[#bd704c]"
                >
                  Lihat detail
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl border border-dashed border-[#183b32]/20 bg-white/60 px-6 py-14 text-center">
            <h2 className="font-serif text-2xl">
              {bukuAwal.length === 0
                ? "Koleksi masih kosong"
                : "Buku tidak ditemukan"}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#718078]">
              {bukuAwal.length === 0
                ? "Tambahkan buku pertama agar koleksi perpustakaan mulai terisi."
                : "Coba kata kunci lain, atau periksa kembali ejaan judul dan nama penulis."}
            </p>
            {bukuAwal.length === 0 && (
              <Link
                href="/daftarbuku/buku/baru"
                className="mt-6 rounded-full bg-[#183b32] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#285548]"
              >
                Tambahkan buku pertama
              </Link>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
