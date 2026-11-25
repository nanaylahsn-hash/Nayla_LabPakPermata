"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BukuForm from "./bukuform";
import { simpanBuku } from "../app/daftarbuku/buku/actions";
import type { BukuBaru } from "../lib/buku";

export default function BukuTambah() {
  const router = useRouter();
  const [pesanError, setPesanError] = useState("");

  async function tambahBuku(data: BukuBaru): Promise<boolean> {
    try {
      const hasil = await simpanBuku(data);
      if (!hasil.sukses) {
        setPesanError(hasil.pesan);
        return false;
      }

      router.push("/daftarbuku/buku");
      return true;
    } catch (error) {
      setPesanError(
        error instanceof Error
          ? error.message
          : "Buku gagal disimpan ke database.",
      );
      return false;
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f6f0] text-[#183b32]">
      <div className="mx-auto max-w-3xl px-6 py-12 sm:px-10 sm:py-16">
        <Link
          href="/daftarbuku/buku"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#597067] transition hover:text-[#183b32]"
        >
          <span aria-hidden="true">←</span>
          Kembali ke daftar buku
        </Link>
        <p className="mt-8 text-xs font-semibold tracking-[0.18em] text-[#bd704c]">
          KOLEKSI PUSTAKAKU
        </p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
          Tambah buku
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#597067]">
          Lengkapi informasi buku yang ingin ditambahkan ke koleksi
          perpustakaan.
        </p>
        <p className="mt-3 text-xs text-[#718078]">
          Data buku akan disimpan ke database perpustakaan.
        </p>

        {pesanError && (
          <p
            role="alert"
            className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700"
          >
            {pesanError}
          </p>
        )}

        <section className="mt-8 rounded-3xl border border-[#183b32]/10 bg-white p-5 shadow-sm sm:p-8">
          <BukuForm
            onSimpan={tambahBuku}
            onBatal={() => router.push("/daftarbuku/buku")}
          />
        </section>
      </div>
    </main>
  );
}
