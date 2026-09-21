const chart = "M5 126 C34 124 42 102 69 108 C96 113 104 80 132 87 C161 94 171 52 201 61 C229 69 239 31 270 40 C297 48 310 25 339 20";

const flows = [
  ["Solaire", "4.8 kW", "bg-[color:var(--accent)]"],
  ["Maison", "2.1 kW", "bg-white/70"],
  ["Batterie", "78%", "bg-white/35"],
];

export function PhoneMockup() {
  return (
    <div className="relative mx-auto aspect-[9/19.2] w-[min(78vw,360px)] rounded-[3.45rem] border border-white/24 bg-[#030405] p-[9px] shadow-[0_50px_140px_rgba(0,0,0,.72),0_0_100px_rgba(217,255,90,.055)]">
      <div className="absolute -left-[3px] top-28 h-16 w-[3px] rounded-l-full bg-white/18" />
      <div className="absolute -right-[3px] top-36 h-24 w-[3px] rounded-r-full bg-white/14" />

      <div className="relative h-full overflow-hidden rounded-[2.9rem] border border-white/8 bg-[#090c0d] px-5 pb-5 pt-4">
        <div className="absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_50%_-15%,rgba(217,255,90,.14),transparent_68%)]" />
        <div className="absolute left-1/2 top-3 z-20 h-7 w-25 -translate-x-1/2 rounded-full border border-white/5 bg-black shadow-inner" />

        <div className="relative z-10 flex items-center justify-between px-1 pt-1 text-[8px] text-white/38">
          <span>09:41</span>
          <div className="flex items-center gap-1"><span>5G</span><span className="h-2 w-3 rounded-[2px] border border-white/30"><span className="block h-full w-[78%] bg-white/55" /></span></div>
        </div>

        <div className="relative z-10 pt-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[9px] uppercase tracking-[.14em] text-white/28">Watt Power</div>
              <div className="mt-1 text-sm tracking-[-.03em] text-white/80">Mon énergie</div>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/8 bg-white/[.025] px-3 py-2 text-[8px] uppercase tracking-[.12em] text-white/38"><span className="accent-dot !h-1 !w-1" /> En direct</div>
          </div>

          <div className="mt-6 rounded-[1.55rem] border border-white/8 bg-white/[.025] p-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-[9px] text-white/32">Production solaire</div>
                <div className="mt-1 text-[2.15rem] font-medium leading-none tracking-[-.06em]">4.8 <span className="text-sm text-white/32">kW</span></div>
              </div>
              <div className="rounded-full border border-[color:var(--accent)]/20 bg-[color:var(--accent)]/[.06] px-2 py-1 text-[8px] text-[color:var(--accent)]">+18%</div>
            </div>

            <svg viewBox="0 0 345 145" className="mt-3 w-full" fill="none" aria-label="Courbe de production solaire de démonstration">
              <defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop stopColor="var(--accent)" stopOpacity=".26"/><stop offset="1" stopColor="var(--accent)" stopOpacity="0"/></linearGradient></defs>
              <path d={`${chart} L339 145 L5 145 Z`} fill="url(#area)" />
              <path data-app-chart d={chart} pathLength="1" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div className="-mt-1 flex justify-between text-[7px] text-white/20"><span>06:00</span><span>12:00</span><span>18:00</span></div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {flows.map(([label, value, dot]) => (
              <div key={label} className="rounded-2xl border border-white/7 bg-white/[.018] p-3">
                <div className="flex items-center gap-1.5 text-[8px] text-white/28"><span className={`h-1.5 w-1.5 rounded-full ${dot}`} />{label}</div>
                <div className="mt-2 text-[12px] tracking-[-.02em] text-white/74">{value}</div>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-2xl border border-white/7 bg-white/[.018] p-3">
            <div className="flex items-center justify-between text-[8px] text-white/28"><span>Flux d&apos;énergie</span><span className="text-white/48">Maintenant</span></div>
            <div className="mt-4 flex items-center justify-between gap-2 text-[8px] text-white/42">
              <div className="text-center"><span className="mx-auto block h-6 w-6 rounded-full border border-[color:var(--accent)]/25 bg-[color:var(--accent)]/[.07]" /><span className="mt-1.5 block">Solaire</span></div>
              <div className="relative h-px flex-1 overflow-hidden bg-white/10"><span data-flow-pulse className="absolute inset-y-0 left-0 w-1/3 bg-[color:var(--accent)]" /></div>
              <div className="text-center"><span className="mx-auto block h-6 w-6 rounded-full border border-white/10 bg-white/[.03]" /><span className="mt-1.5 block">Maison</span></div>
              <div className="relative h-px flex-1 overflow-hidden bg-white/10"><span data-flow-pulse className="absolute inset-y-0 left-0 w-1/3 bg-white/50" /></div>
              <div className="text-center"><span className="mx-auto block h-6 w-6 rounded-full border border-white/10 bg-white/[.03]" /><span className="mt-1.5 block">Batterie</span></div>
            </div>
          </div>

          <div className="mt-4 flex justify-between rounded-full border border-white/8 bg-black/20 p-1 text-[7px] text-white/26">
            {["Aujourd’hui", "Semaine", "Mois", "Année"].map((x, i) => <span key={x} className={i === 0 ? "rounded-full bg-white/9 px-3 py-2 text-white/76" : "px-3 py-2"}>{x}</span>)}
          </div>

          <div className="mt-4 flex items-center justify-between text-[8px] text-white/28"><span>Autoconsommation estimée</span><span className="text-white/75">82%</span></div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/7"><div data-app-bar className="h-full w-[82%] origin-left rounded-full bg-[color:var(--accent)]" /></div>
          <div className="mt-4 text-center text-[7px] uppercase tracking-[.15em] text-white/16">Données de démonstration</div>
        </div>
      </div>
    </div>
  );
}
