import Link from "next/link";

export function FinalCTA() {
  return (
    <section id="contact" className="relative min-h-[100svh] border-t border-white/8">
      <div className="container-wp flex min-h-[100svh] flex-col justify-between py-10 md:py-14">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[.14em] text-white/30">
          <span>Watt Power</span>
          <span>Marrakech, Maroc</span>
        </div>
        <div>
          <h2 className="display-xl">VOTRE ÉNERGIE.</h2>
          <h2 className="display-xl text-white/28">VOTRE CONTRÔLE.</h2>
          <div className="mt-12 flex flex-wrap gap-3">
            <a href="mailto:hello@wattpower.example" className="rounded-full bg-[color:var(--accent)] px-6 py-4 text-[11px] font-medium uppercase tracking-[.14em] text-black transition hover:scale-[1.02]">
              Découvrir Watt Power
            </a>
            <a href="mailto:hello@wattpower.example?subject=Etude%20solaire" className="rounded-full border border-white/15 px-6 py-4 text-[11px] uppercase tracking-[.14em] text-white/65 transition hover:border-white/35 hover:text-white">
              Demander une étude solaire
            </a>
          </div>
        </div>
        <footer className="flex flex-col gap-4 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[.13em] text-white/26 md:flex-row md:items-center md:justify-between">
          <span>© 2026 Watt Power</span>
          <div className="flex flex-wrap gap-5">
            <Link href="/credits" className="transition hover:text-white/70">Crédits 3D & visuels</Link>
            <span>Prototype — contenus définitifs à intégrer avant lancement.</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
