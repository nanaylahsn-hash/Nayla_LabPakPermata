import BukuKatalog from "../../../component/bukukatalog";
import { prisma } from "@/lib/prisma";

export default async function DaftarBukuPage() {
  const buku = await (prisma as any).buku.findMany({
    orderBy: { createdAt: "desc" },
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

  return <BukuKatalog buku={buku} />;
}
