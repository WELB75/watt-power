"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const visual = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from("[data-hero-word]", { yPercent: 110, duration: 1.2, stagger: 0.07 })
        .from("[data-hero-sub]", { y: 18, opacity: 0, duration: .8 }, "-=.45")
        .from("[data-hero-visual]", { scale: .86, opacity: 0, duration: 1.4 }, "-=1.0");
    }, el);
    return () => ctx.revert();
  }, []);

  const onMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!visual.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - r.left) / r.width - .5;
    const y = (event.clientY - r.top) / r.height - .5;
    gsap.to(visual.current, { x: x * 18, y: y * 12, rotateX: y * -3, rotateY: x * 4, duration: .8, ease: "power3.out" });
  };

  return (
    <section id="top" ref={root} onMouseMove={onMove} className="relative min-h-[100svh] overflow-hidden pt-18">
      <div className="energy-grid absolute inset-0 opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_48%,rgba(217,255,90,.08),transparent_27%)]" />
      <div className="container-wp relative flex min-h-[calc(100svh-4.5rem)] flex-col justify-between py-8 md:py-12">
        <div className="flex items-center gap-3 pt-6 text-[10px] uppercase tracking-[.18em] text-white/45">
          <span className="accent-dot" /> Intelligent solar energy — Marrakech
        </div>

        <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <div className="overflow-hidden"><h1 data-hero-word className="display-xl">WATT</h1></div>
            <div className="overflow-hidden"><h1 data-hero-word className="display-xl text-white/38">POWER.</h1></div>
            <p data-hero-sub className="mt-8 max-w-md text-base leading-relaxed text-white/55 md:text-lg">
              Your energy, visible. Your system, under control.
            </p>
          </div>

          <div ref={visual} data-hero-visual className="relative mx-auto aspect-[4/3] w-full max-w-[650px] [perspective:1200px]">
            <div className="absolute left-1/2 top-1/2 h-[44%] w-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--accent)]/30 bg-[radial-gradient(circle,rgba(217,255,90,.18),rgba(217,255,90,.02)_48%,transparent_70%)] shadow-[0_0_100px_rgba(217,255,90,.08)]" />
            <div className="absolute inset-[14%] rotate-[-10deg] rounded-[1.8rem] border border-white/10 bg-black/35 p-3 shadow-2xl backdrop-blur-md">
              <div className="grid h-full grid-cols-4 grid-rows-3 gap-2">
                {Array.from({ length: 12 }).map((_, i) => <div className="solar-cell rounded-md" key={i} />)}
              </div>
            </div>
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 700 525" fill="none" aria-hidden="true">
              <path d="M68 390 C210 290 290 420 420 305 S600 235 665 145" stroke="var(--accent)" strokeOpacity=".75" strokeWidth="1.5" />
              <path d="M68 390 C210 290 290 420 420 305 S600 235 665 145" stroke="var(--accent)" strokeOpacity=".16" strokeWidth="12" />
            </svg>
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-white/10 pt-5 text-[10px] uppercase tracking-[.15em] text-white/35">
          <span>01 / Intelligent energy</span><span>Scroll to explore ↓</span>
        </div>
      </div>
    </section>
  );
}
