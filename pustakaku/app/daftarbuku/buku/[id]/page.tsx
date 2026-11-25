import { Suspense } from "react";
import Link from "next/link";
import BukuDetail from "../../../../component/bukudetail";
import { prisma } from "@/lib/prisma";

type BukuDetailPageProps = {
  params: Promise<{ id: string }>;
};

async function BukuDetailDenganParams({ params }: BukuDetailPageProps) {
  const { id } = await params;
  const buku = await (prisma as any).buku.findUnique({
    where: { id },
    select: {
      id: true,
      judul: true,
      penulis: true,
      kategori: true,
      tahun: true,
      stok: true,
      deskripsi: true,
    },
  });

  return <BukuDetail buku={buku} />;
}

function BukuDetailFallback() {
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
        <div
          aria-label="Memuat detail buku"
          className="mt-8 h-80 animate-pulse rounded-3xl bg-[#e8e9d8]"
        />
      </div>
    </main>
  );
}

export default function BukuDetailPage({ params }: BukuDetailPageProps) {
  return (
    <Suspense fallback={<BukuDetailFallback />}>
      <BukuDetailDenganParams params={params} />
    </Suspense>
  );
}
