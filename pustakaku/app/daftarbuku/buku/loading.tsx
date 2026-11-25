export default function LoadingDaftarBuku() {
  return (
    <main
      aria-label="Memuat daftar buku"
      className="min-h-screen animate-pulse bg-[#f7f6f0] p-8 sm:p-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="h-10 w-56 rounded-xl bg-[#e8e9d8]" />
        <div className="mt-5 h-5 w-96 max-w-full rounded-lg bg-[#e8e9d8]" />
        <div className="mt-10 h-12 max-w-xl rounded-full bg-[#e8e9d8]" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="h-56 rounded-3xl bg-[#e8e9d8]" />
          ))}
        </div>
      </div>
    </main>
  );
}
