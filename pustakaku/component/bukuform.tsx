"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import type { BukuBaru } from "../lib/buku";

type BukuFormProps = {
  onSimpan: (buku: BukuBaru) => Promise<boolean>;
  onBatal: () => void;
};

const inputClassName =
  "mt-2 w-full rounded-xl border border-[#183b32]/15 bg-white px-4 py-3 text-sm text-[#183b32] outline-none transition placeholder:text-[#89968f] focus:border-[#315c4d] focus:ring-2 focus:ring-[#315c4d]/10";

const kategoriBuku = [
  "Anak",
  "Biografi",
  "Fantasi",
  "Fiksi",
  "Horor",
  "Komik",
  "Misteri",
  "Nonfiksi",
  "Pendidikan",
  "Petualangan",
  "Puisi",
  "Romansa",
  "Sejarah",
  "Sains dan Teknologi",
];

export default function BukuForm({ onSimpan, onBatal }: BukuFormProps) {
  const [sedangMenyimpan, setSedangMenyimpan] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const tahun = Number(data.get("tahun"));
    const stok = Number(data.get("stok"));

    if (!Number.isInteger(tahun) || !Number.isInteger(stok) || stok < 0) {
      return;
    }

    setSedangMenyimpan(true);
    try {
      const berhasil = await onSimpan({
        judul: String(data.get("judul") ?? "").trim(),
        penulis: String(data.get("penulis") ?? "").trim(),
        kategori: String(data.get("kategori") ?? "").trim(),
        tahun,
        stok,
        deskripsi: String(data.get("deskripsi") ?? "").trim(),
      });

      if (berhasil) {
        form.reset();
      }
    } finally {
      setSedangMenyimpan(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium text-[#315c4d]">
          Judul buku
          <input
            required
            name="judul"
            maxLength={120}
            placeholder="Contoh: Laskar Pelangi"
            className={inputClassName}
          />
        </label>
        <label className="text-sm font-medium text-[#315c4d]">
          Penulis
          <input
            required
            name="penulis"
            maxLength={80}
            placeholder="Nama penulis"
            className={inputClassName}
          />
        </label>
        <label className="text-sm font-medium text-[#315c4d]">
          Kategori
          <select
            required
            name="kategori"
            defaultValue=""
            className={inputClassName}
          >
            <option value="" disabled>
              Pilih kategori buku
            </option>
            {kategoriBuku.map((kategori) => (
              <option key={kategori} value={kategori}>
                {kategori}
              </option>
            ))}
          </select>
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="text-sm font-medium text-[#315c4d]">
            Tahun terbit
            <input
              required
              type="number"
              name="tahun"
              min="0"
              max="9999"
              step="1"
              defaultValue={new Date().getFullYear()}
              className={inputClassName}
            />
          </label>
          <label className="text-sm font-medium text-[#315c4d]">
            Stok
            <input
              required
              type="number"
              name="stok"
              min="0"
              step="1"
              defaultValue="1"
              className={inputClassName}
            />
          </label>
        </div>
      </div>
      <label className="block text-sm font-medium text-[#315c4d]">
        Deskripsi <span className="font-normal text-[#89968f]">(opsional)</span>
        <textarea
          name="deskripsi"
          rows={3}
          maxLength={500}
          placeholder="Ceritakan singkat tentang buku ini"
          className={inputClassName}
        />
      </label>
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onBatal}
          disabled={sedangMenyimpan}
          className="rounded-full border border-[#183b32]/15 px-5 py-3 text-sm font-medium text-[#315c4d] transition hover:bg-[#f7f6f0]"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={sedangMenyimpan}
          className="rounded-full bg-[#183b32] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#285548]"
        >
          {sedangMenyimpan ? "Menyimpan..." : "Simpan buku"}
        </button>
      </div>
    </form>
  );
}
