"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { BukuBaru } from "@/lib/buku";

type HasilAksi = { sukses: true } | { sukses: false; pesan: string };

function validasiBuku(input: unknown): BukuBaru | null {
  if (!input || typeof input !== "object") {
    return null;
  }

  const data = input as Record<string, unknown>;
  const judul = typeof data.judul === "string" ? data.judul.trim() : "";
  const penulis = typeof data.penulis === "string" ? data.penulis.trim() : "";
  const kategori = typeof data.kategori === "string" ? data.kategori.trim() : "";
  const deskripsi =
    typeof data.deskripsi === "string" ? data.deskripsi.trim() : "";
  const tahun = data.tahun;
  const stok = data.stok;

  if (
    !judul ||
    judul.length > 120 ||
    !penulis ||
    penulis.length > 80 ||
    !kategori ||
    kategori.length > 80 ||
    typeof tahun !== "number" ||
    !Number.isSafeInteger(tahun) ||
    tahun < 0 ||
    tahun > 9999 ||
    typeof stok !== "number" ||
    !Number.isSafeInteger(stok) ||
    stok < 0 ||
    deskripsi.length > 500
  ) {
    return null;
  }

  return { judul, penulis, kategori, tahun, stok, deskripsi };
}

export async function simpanBuku(input: unknown): Promise<HasilAksi> {
  const buku = validasiBuku(input);

  if (!buku) {
    return { sukses: false, pesan: "Periksa kembali informasi buku." };
  }

  try {
    await (prisma as any).buku.create({ data: buku });
  } catch (error) {
    console.error("Gagal menyimpan buku:", error);
    return {
      sukses: false,
      pesan: "Buku gagal disimpan ke database. Silakan coba lagi.",
    };
  }

  revalidatePath("/daftarbuku/buku");
  return { sukses: true };
}

export async function hapusBuku(id: string): Promise<HasilAksi> {
  if (typeof id !== "string") {
    return { sukses: false, pesan: "ID buku tidak valid." };
  }

  const idBuku = id.trim();
  if (!idBuku) {
    return { sukses: false, pesan: "ID buku tidak valid." };
  }

  try {
    await (prisma as any).buku.delete({ where: { id: idBuku } });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return { sukses: false, pesan: "Buku tidak ditemukan." };
    }

    console.error("Gagal menghapus buku:", error);
    return {
      sukses: false,
      pesan: "Buku gagal dihapus dari database. Silakan coba lagi.",
    };
  }

  revalidatePath("/daftarbuku/buku");
  return { sukses: true };
}