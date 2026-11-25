-- CreateTable
CREATE TABLE "Buku" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "judul" TEXT NOT NULL,
    "penulis" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "tahun" INTEGER NOT NULL,
    "stok" INTEGER NOT NULL,
    "deskripsi" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
