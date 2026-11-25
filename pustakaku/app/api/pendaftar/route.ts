import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// GET /api/pendaftar atau /api/pendaftar?cari=nayla
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const cari = searchParams.get("cari")?.trim();

    const data = await prisma.pendaftar.findMany({
    where: cari ? { nama: { contains: cari } } : undefined,
    orderBy: { createdAt: "desc" },
});
    return NextResponse.json(data);
}

// POST /api/pendaftar (body: JSON)
export async function POST(request: Request) {
// 1. Baca body JSON (hasilnya null kalau body bukan JSON yang valid)
const body: { nama?: unknown; email?: unknown; pesan?: unknown } | null =
    await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
 }

    // 2. Rapikan dan validasi
const nama = typeof body.nama === "string" ? body.nama.trim() : "";
const email =
     typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const pesan = typeof body.pesan === "string" ? body.pesan.trim() : "";
if (nama.length < 3) {
    return NextResponse.json(
    { error: "Nama minimal 3 karakter." },
    { status: 400 }
 )  

 }
if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json(
    { error: "Format email tidak valid." },
    { status: 400 }
    );
}

 // 3. Simpan ke database
try {
    const baru = await prisma.pendaftar.create({
        data: { nama, email, pesan: pesan || null },
    });
    return NextResponse.json(baru, { status: 201 });
 } catch (e) {
 if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
 return NextResponse.json(
 { error: "Email ini sudah terdaftar." },
 { status: 409 }
    );
}
    return NextResponse.json(
    { error: "Terjadi kesalahan di server." },
    { status: 500 }
    );
}
}