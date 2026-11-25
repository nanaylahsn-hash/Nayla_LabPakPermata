"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import StockBadge from "./stockbadge";
import { hapusBuku as hapusBukuDariDatabase } from "../app/daftarbuku/buku/actions";
import type { Buku } from "../lib/buku";

type BukuDetailProps = {
  buku: Buku | null;
};

export default function BukuDetail({ buku }: BukuDetailProps) {
  const router = useRouter();
  const [pesanError, setPesanError] = useState("");
  const [sedangMenghapus, setSedangMenghapus] = useState(false);
  const adalahBukuHujan =
    buku?.judul.trim().toLocaleLowerCase("id") === "hujan";

  async function hapusBukuSaatIni(): Promise<void> {
    if (!buku || !window.confirm(`Hapus buku "${buku.judul}"?`)) {
      return;
    }

    setSedangMenghapus(true);
    try {
      const hasil = await hapusBukuDariDatabase(buku.id);
      if (!hasil.sukses) {
        setPesanError(hasil.pesan);
        return;
      }

      router.push("/daftarbuku/buku");
      router.refresh();
    } catch (error) {
      setPesanError(
        error instanceof Error
          ? error.message
          : "Buku gagal dihapus dari database.",
      );
    } finally {
      setSedangMenghapus(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f6f0] text-[#183b32]">
      <div className="mx-auto max-w-4xl px-6 py-8 sm:px-10 sm:py-12">
        <Link
          href="/daftarbuku/buku"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#597067] transition hover:text-[#183b32]"
        >
          <span aria-hidden="true">←</span>
          Kembali ke daftar buku
        </Link>

        {pesanError ? (
          <p
            role="alert"
            className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700"
          >
            {pesanError}
          </p>
        ) : buku ? (
          <article className="mt-8 rounded-3xl border border-[#183b32]/10 bg-white p-6 shadow-sm sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full bg-[#f4eee4] px-3 py-1.5 text-xs font-medium text-[#9a6044]">
                {buku.kategori}
              </span>
              <StockBadge stock={buku.stok} />
            </div>
            <div
              className={
                adalahBukuHujan
                  ? "mt-8 grid gap-8 sm:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] sm:items-start"
                  : "mt-8"
              }
            >
              {adalahBukuHujan && (
                <Image
                  src="/hujan.png"
                  alt={`Sampul buku ${buku.judul}`}
                  width={650}
                  height={997}
                  className="mx-auto h-auto w-full max-w-56 rounded-2xl sm:mx-0"
                />
              )}
              <div>
                <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
                  {buku.judul}
                </h1>
                <p className="mt-4 text-lg text-[#597067]">
                  oleh {buku.penulis}
                </p>
                <div className="mt-8 grid gap-4 border-y border-[#183b32]/10 py-5 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-[#89968f]">
                      Tahun terbit
                    </p>
                    <p className="mt-1 text-sm font-semibold">{buku.tahun}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-[#89968f]">
                      Jumlah stok
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      {buku.stok} buku
                    </p>
                  </div>
                </div>
                <section className="mt-8">
                  <h2 className="text-xs font-medium uppercase tracking-wider text-[#89968f]">
                    Deskripsi
                  </h2>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-[#597067]">
                    {buku.deskripsi || "Belum ada deskripsi untuk buku ini."}
                  </p>
                </section>
                <button
                  type="button"
                  onClick={hapusBukuSaatIni}
                  disabled={sedangMenghapus}
                  className="mt-8 min-h-11 rounded-full border border-red-200 px-5 text-sm font-semibold text-red-700 transition hover:border-red-300 hover:bg-red-50"
                >
                  {sedangMenghapus ? "Menghapus..." : "Hapus buku"}
                </button>
              </div>
            </div>
          </article>
        ) : (
          <section className="mt-8 rounded-3xl border border-dashed border-[#183b32]/20 bg-white/60 px-6 py-14 text-center">
            <h1 className="font-serif text-3xl">Buku tidak ditemukan</h1>
            <p className="mt-3 text-sm text-[#718078]">
              Buku ini mungkin sudah dihapus dari database.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
