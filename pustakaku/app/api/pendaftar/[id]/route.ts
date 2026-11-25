import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type Konteks = { params: Promise<{ id: string }> };

function parseId(id: string): number | null {
  const nomor = Number(id);

  if (!Number.isSafeInteger(nomor) || nomor <= 0) {
    return null;
  }

  return nomor;
}

// GET /api/pendaftar/5
export async function GET(_request: Request, { params }: Konteks) {
  const { id } = await params;
  const nomor = parseId(id);

  if (nomor === null) {
    return NextResponse.json({ error: "ID tidak valid." }, { status: 400 });
  }

  try {
    const data = await prisma.pendaftar.findUnique({
      where: { id: nomor },
    });

    if (!data) {
      return NextResponse.json(
        { error: "Data tidak ditemukan." },
        { status: 404 },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Gagal mengambil data pendaftar:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan di server." },
      { status: 500 },
    );
  }
}

// DELETE /api/pendaftar/5
export async function DELETE(_request: Request, { params }: Konteks) {
  const { id } = await params;
  const nomor = parseId(id);

  if (nomor === null) {
    return NextResponse.json({ error: "ID tidak valid." }, { status: 400 });
  }

  try {
    await prisma.pendaftar.delete({ where: { id: nomor } });
    return NextResponse.json({ pesan: "Data berhasil dihapus." });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "Data tidak ditemukan." },
        { status: 404 },
      );
    }

    console.error("Gagal menghapus data pendaftar:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan di server." },
      { status: 500 },
    );
  }
}