import { Counter } from "@/components/ui/Counter";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";

export function EnergyData() {
  return (
    <section id="control" className="section-pad relative overflow-hidden border-t border-white/8">
      <div className="container-wp">
        <span className="eyebrow">See your energy</span>
        <AnimatedHeading className="mt-6 max-w-6xl">
          <h2 className="display-lg">Every watt.<br /><span className="text-white/35">Visible.</span></h2>
        </AnimatedHeading>

        <div className="mt-20 grid gap-px overflow-hidden rounded-[2rem] border border-white/8 bg-white/8 md:grid-cols-3">
          <div className="bg-[color:var(--background)] p-8 md:p-10">
            <div className="eyebrow">Solar production</div>
            <div className="mt-8 text-[clamp(3rem,7vw,7rem)] leading-none tracking-[-.06em]"><Counter value={4.8} suffix=" kW" decimals={1} /></div>
            <div className="mt-6 text-[10px] uppercase tracking-[.14em] text-white/25">Demo data</div>
          </div>
          <div className="bg-[color:var(--background)] p-8 md:p-10">
            <div className="eyebrow">Home consumption</div>
            <div className="mt-8 text-[clamp(3rem,7vw,7rem)] leading-none tracking-[-.06em]"><Counter value={2.1} suffix=" kW" decimals={1} /></div>
            <div className="mt-6 text-[10px] uppercase tracking-[.14em] text-white/25">Demo data</div>
          </div>
          <div className="bg-[color:var(--background)] p-8 md:p-10">
            <div className="eyebrow">Battery state</div>
            <div className="mt-8 text-[clamp(3rem,7vw,7rem)] leading-none tracking-[-.06em]"><Counter value={78} suffix="%" /></div>
            <div className="mt-6 text-[10px] uppercase tracking-[.14em] text-white/25">Demo data</div>
          </div>
        </div>

        <div className="relative mt-16 h-72 overflow-hidden rounded-[2rem] border border-white/8 bg-white/[.018] p-6 md:h-96 md:p-10">
          <div className="absolute inset-0 energy-grid opacity-35" />
          <div className="relative flex items-center justify-between"><span className="eyebrow">Production / consumption</span><span className="text-[10px] uppercase tracking-[.14em] text-white/25">Demo data</span></div>
          <svg className="relative mt-8 h-[70%] w-full" viewBox="0 0 1200 300" fill="none" aria-label="Demo energy visualization">
            <defs><linearGradient id="dataArea" x1="0" y1="0" x2="0" y2="1"><stop stopColor="var(--accent)" stopOpacity=".16"/><stop offset="1" stopColor="var(--accent)" stopOpacity="0"/></linearGradient></defs>
            <path d="M0 248 C90 238 120 195 205 204 C300 214 330 155 405 169 C485 184 530 91 620 116 C720 143 790 56 870 80 C954 105 1032 47 1200 35 L1200 300 L0 300 Z" fill="url(#dataArea)" />
            <path d="M0 248 C90 238 120 195 205 204 C300 214 330 155 405 169 C485 184 530 91 620 116 C720 143 790 56 870 80 C954 105 1032 47 1200 35" stroke="var(--accent)" strokeWidth="2" />
            <path d="M0 235 C102 221 161 252 246 226 C331 201 410 239 500 208 C601 173 658 212 760 185 C844 163 957 203 1200 154" stroke="rgba(255,255,255,.36)" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </section>
  );
}
