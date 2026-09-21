export function FinalCTA() {
  return (
    <section id="contact" className="relative min-h-[100svh] border-t border-white/[.08] bg-[#050706]">
      <div className="container-wp flex min-h-[100svh] flex-col justify-between py-10 md:py-14">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[.14em] text-white/30">
          <span>Watt Power</span>
          <span>Marrakech, Maroc</span>
        </div>

        <div>
          <span className="eyebrow">Votre projet commence ici</span>
          <h2 className="mt-6 display-xl">VOTRE ÉNERGIE.</h2>
          <h2 className="display-xl text-white/28">VOTRE CONTRÔLE.</h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/44">
            Villa, hôtel, commerce ou entreprise : nous concevons une installation solaire adaptée à votre architecture et à vos usages.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="mailto:hello@wattpower.example?subject=Etude%20solaire"
              className="rounded-full bg-[color:var(--accent)] px-6 py-4 text-[11px] font-medium uppercase tracking-[.14em] text-black transition hover:scale-[1.02]"
            >
              Demander une étude solaire
            </a>
            <a
              href="mailto:hello@wattpower.example"
              className="rounded-full border border-white/15 px-6 py-4 text-[11px] uppercase tracking-[.14em] text-white/65 transition hover:border-white/35 hover:text-white"
            >
              Parler à un expert
            </a>
          </div>
        </div>

        <footer className="flex flex-col gap-4 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[.13em] text-white/26 md:flex-row md:items-center md:justify-between">
          <span>© 2026 Watt Power</span>
          <span>Énergie solaire · Marrakech · Maroc</span>
        </footer>
      </div>
    </section>
  );
}
