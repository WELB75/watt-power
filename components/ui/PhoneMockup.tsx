const chart = "M5 126 C34 124 42 102 69 108 C96 113 104 80 132 87 C161 94 171 52 201 61 C229 69 239 31 270 40 C297 48 310 25 339 20";

export function PhoneMockup() {
  return (
    <div className="relative mx-auto aspect-[9/18.5] w-[min(76vw,340px)] rounded-[3.2rem] border border-white/25 bg-[#050708] p-[9px] shadow-[0_35px_100px_rgba(0,0,0,.65),0_0_80px_rgba(217,255,90,.05)]">
      <div className="relative h-full overflow-hidden rounded-[2.65rem] border border-white/8 bg-[#0a0d0e] p-5">
        <div className="absolute left-1/2 top-3 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
        <div className="pt-8">
          <div className="flex items-center justify-between text-[9px] uppercase tracking-[.12em] text-white/35"><span>Watt Power</span><span>Live</span></div>
          <div className="mt-7 flex items-end justify-between">
            <div><div className="text-[10px] text-white/38">Production</div><div className="mt-1 text-3xl font-medium tracking-[-.05em]">4.8 <span className="text-base text-white/38">kW</span></div></div>
            <div className="accent-dot mb-2" />
          </div>
          <div className="mt-6 rounded-2xl border border-white/8 bg-white/[.025] p-3">
            <svg viewBox="0 0 345 145" className="w-full" fill="none" aria-label="Demo solar production chart">
              <defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop stopColor="var(--accent)" stopOpacity=".25"/><stop offset="1" stopColor="var(--accent)" stopOpacity="0"/></linearGradient></defs>
              <path d={`${chart} L339 145 L5 145 Z`} fill="url(#area)" />
              <path d={chart} stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div className="mt-1 flex justify-between text-[8px] text-white/25"><span>06:00</span><span>12:00</span><span>18:00</span></div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/8 p-3"><div className="text-[9px] text-white/35">Consumption</div><div className="mt-2 text-xl">2.1 <span className="text-xs text-white/30">kW</span></div></div>
            <div className="rounded-2xl border border-white/8 p-3"><div className="text-[9px] text-white/35">Battery</div><div className="mt-2 text-xl">78<span className="text-xs text-white/30">%</span></div></div>
          </div>
          <div className="mt-5 flex justify-between rounded-full border border-white/8 p-1 text-[8px] text-white/32">
            {['Today','Week','Month','Year'].map((x,i)=><span key={x} className={i===0?'rounded-full bg-white/10 px-3 py-2 text-white':'px-3 py-2'}>{x}</span>)}
          </div>
          <div className="mt-5 flex items-center justify-between text-[9px] text-white/35"><span>Estimated self-use</span><span className="text-white">82%</span></div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/7"><div className="h-full w-[82%] rounded-full bg-[color:var(--accent)]" /></div>
          <div className="mt-5 text-center text-[8px] uppercase tracking-[.12em] text-white/20">Demo data</div>
        </div>
      </div>
    </div>
  );
}
