import Link from "next/link";

export const metadata = {
  title: "Crédits 3D — Watt Power",
};

const credits = [
  {
    name: "Solar Panel",
    author: "Quaternius",
    source: "Poly Pizza",
    href: "https://poly.pizza/m/ah89Y79JdT",
    license: "CC0 1.0",
  },
  {
    name: "Battery",
    author: "Quaternius",
    source: "Poly Pizza",
    href: "https://poly.pizza/m/MYa3uWdwPU",
    license: "CC0 1.0",
  },
  {
    name: "COTEK SP-3000 inverter",
    author: "Rising Tide Research Foundation",
    source: "Solander 38",
    href: "https://github.com/risingtideresearch/solander-38-website",
    license: "CC BY 4.0",
  },
  {
    name: "Modern House",
    author: "henry ham",
    source: "Poly Pizza",
    href: "https://poly.pizza/m/d_k2teZePG6",
    license: "Creative Commons Attribution",
  },
  {
    name: "Rogland Sunset",
    author: "Greg Zaal",
    source: "Poly Haven",
    href: "https://polyhaven.com/a/rogland_sunset",
    license: "CC0",
  },
  {
    name: "Painted Plaster Wall",
    author: "Amal Kumar",
    source: "Poly Haven",
    href: "https://polyhaven.com/a/painted_plaster_wall",
    license: "CC0",
  },
];

export default function CreditsPage() {
  return (
    <main className="min-h-screen bg-[#060806] px-5 py-24 text-white md:px-12">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-[10px] uppercase tracking-[.16em] text-white/38 transition hover:text-white">
          ← Watt Power
        </Link>
        <h1 className="mt-12 text-5xl font-medium tracking-[-.055em] md:text-7xl">Crédits 3D & visuels.</h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/48">
          Watt Power utilise des assets tiers sélectionnés pour le prototype visuel. Les références et licences sont conservées ici afin de garder une provenance claire.
        </p>

        <div className="mt-14 border-t border-white/10">
          {credits.map((credit) => (
            <a
              key={credit.name}
              href={credit.href}
              target="_blank"
              rel="noreferrer"
              className="grid gap-3 border-b border-white/10 py-6 transition hover:bg-white/[.02] md:grid-cols-[1.3fr_1fr_1fr_auto] md:items-center"
            >
              <span className="text-xl tracking-[-.025em]">{credit.name}</span>
              <span className="text-sm text-white/45">{credit.author}</span>
              <span className="text-sm text-white/45">{credit.source}</span>
              <span className="text-[10px] uppercase tracking-[.12em] text-[color:var(--accent)]">{credit.license}</span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
