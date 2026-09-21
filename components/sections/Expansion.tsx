"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Expansion() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-ring]", { scale: .62, opacity: .08 }, {
        scale: 1,
        opacity: .35,
        stagger: .12,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 80%", end: "center 35%", scrub: true },
      });
      gsap.from("[data-place]", {
        y: 18,
        opacity: 0,
        stagger: .18,
        scrollTrigger: { trigger: el, start: "top 55%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative min-h-[100svh] overflow-hidden border-t border-white/8">
      <div className="container-wp relative flex min-h-[100svh] items-center py-28">
        <div className="relative z-10 max-w-4xl">
          <span className="eyebrow">De Marrakech vers la suite</span>
          <h2 className="mt-6 text-[clamp(3rem,8vw,8.5rem)] font-medium leading-[.86] tracking-[-.06em]">Né localement.<br /><span className="text-white/32">Pensé pour grandir.</span></h2>
          <div className="mt-12 flex flex-wrap gap-8 text-[11px] uppercase tracking-[.16em] text-white/45 md:gap-16">
            <span data-place>01 — Marrakech</span><span data-place>02 — Maroc</span><span data-place>03 — Afrique</span>
          </div>
        </div>
        <div className="pointer-events-none absolute right-[-22vw] top-1/2 aspect-square w-[86vw] -translate-y-1/2 md:right-[-30vw]">
          {[0,1,2,3].map((ring) => <div key={ring} data-ring className="absolute rounded-full border border-white/20" style={{ inset: `${ring * 12}%` }} />)}
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--accent)] shadow-[0_0_35px_rgba(217,255,90,.8)]" />
        </div>
      </div>
    </section>
  );
}
