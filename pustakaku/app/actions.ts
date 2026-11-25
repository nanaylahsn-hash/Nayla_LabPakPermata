"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type FormState = {
  sukses: boolean;
  pesan: string;
  galat?: { nama?: string; email?: string };
  values?: { nama: string; email: string; pesan: string };
};

export async function simpanPendaftar(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const nama = String(formData.get("nama") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const pesan = String(formData.get("pesan") ?? "").trim();
  const values = { nama, email, pesan };

  const galat: NonNullable<FormState["galat"]> = {};
  if (nama.length < 3) galat.nama = "Nama minimal 3 karakter.";
  if (!/^\S+@\S+\.\S+$/.test(email)) galat.email = "Format email tidak valid.";

  if (Object.keys(galat).length > 0) {
    return { sukses: false, pesan: "Periksa kembali isian Anda.", galat, values };
  }

  try {
    await prisma.pendaftar.create({
      data: { nama, email, pesan: pesan || null },
    });
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        sukses: false,
        pesan: "Gagal menyimpan.",
        galat: { email: "Email ini sudah terdaftar." },
        values,
      };
    }

    console.error("Gagal menyimpan pendaftar:", error);
    return { sukses: false, pesan: "Terjadi kesalahan di server.", values };
  }

  revalidatePath("/");
  return { sukses: true, pesan: "Data berhasil disimpan!" };
}
