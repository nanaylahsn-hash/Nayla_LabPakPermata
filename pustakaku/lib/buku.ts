export type Buku = {
  id: string;
  judul: string;
  penulis: string;
  kategori: string;
  tahun: number;
  stok: number;
  deskripsi: string;
};

export type BukuBaru = Omit<Buku, "id">;
