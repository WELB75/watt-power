const items = ["SUN", "PANELS", "INVERTER", "BATTERY", "HOME"];

export function EnergyFlow() {
  return (
    <div className="relative mx-auto w-full max-w-6xl">
      <div className="absolute left-[8%] right-[8%] top-1/2 h-px -translate-y-1/2 bg-white/10" />
      <div data-energy-line className="absolute left-[8%] top-1/2 h-px w-0 -translate-y-1/2 bg-[color:var(--accent)] shadow-[0_0_18px_rgba(217,255,90,.7)]" />
      <div className="relative grid grid-cols-5 gap-2">
        {items.map((item, i) => (
          <div key={item} data-energy-node className="flex min-h-40 flex-col items-center justify-center gap-4 opacity-25">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/12 bg-[#0d1011] shadow-[inset_0_0_0_1px_rgba(255,255,255,.02)] md:h-24 md:w-24">
              <span className="text-xs tabular-nums text-white/45">0{i + 1}</span>
            </div>
            <span className="text-[9px] tracking-[.14em] text-white/55 md:text-[11px]">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
