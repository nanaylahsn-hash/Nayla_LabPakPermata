-- CreateTable
CREATE TABLE "Pendaftar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "pesan" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Pendaftar_email_key" ON "Pendaftar"("email");
