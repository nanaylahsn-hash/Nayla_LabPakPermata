import Link from "next/link";

const manfaat = [
  {
    nomor: "01",
    judul: "Jelajahi koleksi",
    deskripsi:
      "Temukan berbagai bacaan dan pilih yang sesuai dengan minat dan kebutuhan Anda, dari fiksi hingga non-fiksi.",
  },
  {
    nomor: "02",
    judul: "Temukan inspirasi",
    deskripsi:
      "Setiap buku membuka sudut pandang baru, ide, dan pengalaman yang berbeda.",
  },
  {
    nomor: "03",
    judul: "Mulai membaca",
    deskripsi:
      "Jadikan membaca bagian dari keseharian, satu halaman dan satu cerita dalam satu waktu.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f6f0] text-[#183b32]">
      <section className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 pb-20 pt-10 sm:px-10 md:grid-cols-[1.05fr_0.95fr] md:gap-8 md:pb-28 md:pt-16 lg:px-16">
        <div className="relative z-10">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#e8eee6] px-4 py-2 text-xs font-semibold tracking-[0.16em] text-[#426b52]">
            <span className="size-2 rounded-full bg-[#d68a5d]" />
            RUANG BACA DIGITAL
          </p>
          <h1 className="max-w-2xl text-5xl font-semibold leading-[1.08] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
            Cerita baru
            <br />
            <span className="font-serif font-normal italic text-[#bd704c]">
              menunggu
            </span>{" "}
            untuk ditemukan.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-[#597067] sm:text-lg sm:leading-8">
            Pustakaku adalah ruang untuk mengenal koleksi buku, menemukan bacaan
            yang menarik, dan merayakan kebiasaan membaca. Mulai perjalanan
            Anda dari sini.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/daftarbuku/buku"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#183b32] px-7 text-sm font-semibold text-white transition hover:bg-[#285548]"
            >
              Jelajahi daftar buku
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                className="size-4"
              >
                <path
                  d="M4 10h12m-5-5 5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <span className="px-2 text-sm text-[#718078]">
              Temukan bacaan favoritmu
            </span>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="relative mx-auto flex h-[360px] w-full max-w-[500px] items-center justify-center sm:h-[440px]"
        >
          <div className="absolute left-1/2 top-1/2 size-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8e9d8] sm:size-[370px]" />
          <div className="absolute left-[8%] top-[15%] h-24 w-24 rounded-full border border-[#bd704c]/40" />
          <div className="absolute bottom-[13%] right-[8%] size-12 rounded-full bg-[#d68a5d]" />
          <div className="absolute left-[13%] top-[26%] -rotate-12 rounded-[22px] bg-[#bd704c] px-5 py-4 text-xs font-medium text-white shadow-xl shadow-[#74402d]/15">
            Buka halaman,
            <br />
            buka kemungkinan.
          </div>
          <div className="relative flex h-[290px] w-[220px] -rotate-6 flex-col justify-between rounded-r-3xl rounded-l-md bg-[#315c4d] p-6 text-[#f7f2e7] shadow-2xl shadow-[#183b32]/25 sm:h-[340px] sm:w-[260px] sm:p-8">
            <div className="absolute inset-y-0 left-3 w-px bg-white/15" />
            <div className="relative">
              <p className="text-[10px] tracking-[0.28em] text-[#e4c9a8]">
                PERPUSTAKAAN
              </p>
              <div className="mt-8 h-px w-12 bg-[#d68a5d]" />
            </div>
            <div className="relative">
              <p className="font-serif text-4xl leading-tight sm:text-5xl">
                Ruang
                <br />
                untuk
                <br />
                bertumbuh.
              </p>
              <p className="mt-5 text-[10px] tracking-[0.2em] text-white/65">
                PUSTAKAKU · SEJAK HARI INI
              </p>
            </div>
          </div>
          <div className="absolute bottom-[13%] left-[12%] rotate-6 rounded-2xl border border-[#183b32]/10 bg-white/90 px-4 py-3 shadow-lg shadow-[#183b32]/5">
            <p className="text-xs font-semibold">Waktu membaca</p>
            <p className="mt-1 text-[11px] text-[#718078]">dimulai sekarang</p>
          </div>
        </div>
      </section>

      <section className="bg-[#183b32] text-[#f7f6f0]">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-10 md:py-20 lg:px-16">
          <div className="mb-10 flex flex-col justify-between gap-4 md:mb-14 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-[#d9a780]">
                TENTANG PUSTAKAKU
              </p>
              <h2 className="mt-4 max-w-xl font-serif text-3xl leading-tight sm:text-4xl">
                Lebih dekat dengan dunia buku.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-white/65">
              Kami percaya setiap orang punya cerita yang ingin ditemukan.
              Pustakaku membantu Anda memulai langkah kecil menuju bacaan
              berikutnya.
            </p>
          </div>

          <div className="grid gap-8 border-t border-white/15 pt-8 md:grid-cols-3 md:gap-10">
            {manfaat.map((item) => (
              <article key={item.nomor}>
                <p className="text-xs tracking-[0.15em] text-[#d9a780]">
                  {item.nomor}
                </p>
                <h3 className="mt-4 text-lg font-semibold">{item.judul}</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/65">
                  {item.deskripsi}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-12 border-t border-white/15 pt-6 text-xs text-white/45">
            Pustakaku · Temukan cerita, mulai perjalanan membaca.
          </div>
        </div>
      </section>
    </main>
  );
}
