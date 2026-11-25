type StockBadgeProps = {
  stock: number;
};

export default function StockBadge({ stock }: StockBadgeProps) {
  const kosong = stock === 0;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
        kosong ? "bg-red-100 text-red-700" : "bg-[#e8eee6] text-[#426b52]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full ${kosong ? "bg-red-600" : "bg-[#426b52]"}`}
      />
      {kosong ? "Stok kosong" : `Tersedia · ${stock} buku`}
    </span>
  );
}
