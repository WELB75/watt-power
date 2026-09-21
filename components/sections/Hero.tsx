"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const telemetry = [
  ["Entrée solaire", "EN DIRECT"],
  ["État du système", "OPÉRATIONNEL"],
  ["Synchronisation app", "CONNECTÉE"],
];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const visual = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set("[data-hero-word],[data-hero-copy],[data-hero-visual],[data-telemetry]", { opacity: 1, y: 0 });
        return;
      }

      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .from("[data-hero-kicker]", { opacity: 0, y: 14, duration: 0.7 })
        .from("[data-hero-word]", { yPercent: 115, duration: 1.15, stagger: 0.08 }, "-=.35")
        .from("[data-hero-copy]", { opacity: 0, y: 24, duration: 0.85 }, "-=.55")
        .from("[data-hero-visual]", { opacity: 0, scale: 0.9, rotate: 2, duration: 1.35 }, "-=1.05")
        .from("[data-telemetry]", { opacity: 0, y: 12, duration: 0.6, stagger: 0.08 }, "-=.75");

      gsap.to("[data-orbit-a]", { rotate: 360, duration: 28, ease: "none", repeat: -1 });
      gsap.to("[data-orbit-b]", { rotate: -360, duration: 36, ease: "none", repeat: -1 });
      gsap.to("[data-core-pulse]", { scale: 1.08, opacity: 0.75, duration: 2.4, yoyo: true, repeat: -1, ease: "sine.inOut" });

      gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
        .to("[data-hero-visual]", { yPercent: 12, scale: 1.06, ease: "none" }, 0)
        .to("[data-hero-copy]", { yPercent: -10, opacity: 0.35, ease: "none" }, 0);
    }, el);

    return () => ctx.revert();
  }, []);

  const onMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!visual.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    gsap.to(visual.current, {
      x: x * 20,
      y: y * 14,
      rotateX: y * -3.5,
      rotateY: x * 4.5,
      duration: 0.9,
      ease: "power3.out",
    });
  };

  return (
    <section id="top" ref={root} onMouseMove={onMove} className="relative min-h-[100svh] overflow-hidden pt-18">
      <div className="energy-grid absolute inset-0 opacity-45" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_46%,rgba(217,255,90,.095),transparent_24%),radial-gradient(circle_at_15%_90%,rgba(255,255,255,.04),transparent_24%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#080a0b] to-transparent" />

      <div className="container-wp relative flex min-h-[calc(100svh-4.5rem)] flex-col justify-between py-8 md:py-12">
        <div data-hero-kicker className="flex items-center justify-between gap-6 pt-5 text-[10px] uppercase tracking-[.18em] text-white/38">
          <div className="flex items-center gap-3"><span className="accent-dot" /> Énergie solaire intelligente — Marrakech</div>
          <span className="hidden md:block">Entreprise technologique / systèmes énergétiques</span>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[1.04fr_.96fr]">
          <div data-hero-copy className="relative z-10 pt-10 lg:pt-0">
            <div className="overflow-hidden"><h1 data-hero-word className="display-xl">WATT</h1></div>
            <div className="overflow-hidden"><h1 data-hero-word className="display-xl text-white/32">POWER.</h1></div>

            <div className="mt-8 grid max-w-2xl gap-7 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="max-w-md text-base leading-relaxed text-white/55 md:text-lg">L&apos;énergie. Sous contrôle.</p>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/32">Produisez. Stockez. Suivez. Optimisez. Un seul système intelligent, visible depuis votre téléphone.</p>
              </div>
              <a href="#system" className="group flex w-fit items-center gap-3 text-[10px] uppercase tracking-[.16em] text-white/42 transition hover:text-white">
                Découvrir le système
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 transition group-hover:border-white/30 group-hover:bg-white/[.04]">↓</span>
              </a>
            </div>
          </div>

          <div ref={visual} data-hero-visual className="relative mx-auto aspect-square w-full max-w-[680px] [perspective:1400px] [transform-style:preserve-3d]">
            <div data-core-pulse className="absolute left-1/2 top-1/2 h-[37%] w-[37%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(236,255,175,.3)_0%,rgba(217,255,90,.11)_34%,rgba(217,255,90,.025)_56%,transparent_72%)] blur-[1px]" />
            <div data-orbit-a className="absolute inset-[11%] rounded-full border border-white/[.08]">
              <span className="absolute left-1/2 top-[-3px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[color:var(--accent)] shadow-[0_0_18px_rgba(217,255,90,.8)]" />
            </div>
            <div data-orbit-b className="absolute inset-[23%] rounded-full border border-dashed border-white/[.09]">
              <span className="absolute bottom-[12%] right-[4%] h-1 w-1 rounded-full bg-white/70" />
            </div>
            <div className="absolute inset-[22%] rotate-[-12deg] rounded-[2.1rem] border border-white/12 bg-black/42 p-3 shadow-[0_42px_100px_rgba(0,0,0,.48),inset_0_1px_rgba(255,255,255,.04)] backdrop-blur-md [transform:translateZ(70px)]">
              <div className="grid h-full grid-cols-4 grid-rows-3 gap-2">
                {Array.from({ length: 12 }).map((_, i) => <div className="solar-cell rounded-md" key={i} />)}
              </div>
            </div>
            <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 700 700" fill="none" aria-hidden="true">
              <path d="M92 520 C170 470 220 510 292 445 C366 378 418 401 476 326 C530 258 590 248 641 171" stroke="var(--accent)" strokeOpacity=".7" strokeWidth="1.4" />
              <path d="M92 520 C170 470 220 510 292 445 C366 378 418 401 476 326 C530 258 590 248 641 171" stroke="var(--accent)" strokeOpacity=".08" strokeWidth="18" />
              <circle cx="92" cy="520" r="4" fill="var(--accent)" />
              <circle cx="641" cy="171" r="4" fill="var(--accent)" />
            </svg>
            <div className="absolute left-[2%] top-[21%] rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-xl">
              <div className="text-[8px] uppercase tracking-[.16em] text-white/28">Entrée</div>
              <div className="mt-1 text-sm tracking-[-.03em]">Énergie solaire</div>
            </div>
            <div className="absolute bottom-[13%] right-[2%] rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-right backdrop-blur-xl">
              <div className="text-[8px] uppercase tracking-[.16em] text-white/28">Couche de contrôle</div>
              <div className="mt-1 text-sm tracking-[-.03em]">Application Watt Power</div>
            </div>
          </div>
        </div>

        <div className="grid gap-5 border-t border-white/10 pt-5 md:grid-cols-[auto_1fr] md:items-end">
          <span className="text-[10px] uppercase tracking-[.15em] text-white/28">01 / Énergie intelligente</span>
          <div className="grid gap-px overflow-hidden rounded-xl border border-white/8 bg-white/[.08] sm:grid-cols-3 md:ml-auto md:w-[min(100%,620px)]">
            {telemetry.map(([label, value]) => (
              <div data-telemetry key={label} className="bg-[#080a0b]/95 px-4 py-3">
                <div className="text-[8px] uppercase tracking-[.14em] text-white/25">{label}</div>
                <div className="mt-1 flex items-center gap-2 text-[10px] tracking-[.08em] text-white/62"><span className="h-1 w-1 rounded-full bg-[color:var(--accent)] shadow-[0_0_10px_rgba(217,255,90,.6)]" />{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
