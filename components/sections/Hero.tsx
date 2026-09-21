"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroEnergyScene } from "@/components/three/HeroEnergyScene";
import { SceneGate } from "@/components/three/SceneGate";

gsap.registerPlugin(ScrollTrigger);

const telemetry = [
  ["Production", "TEMPS RÉEL"],
  ["Installation", "CONNECTÉE"],
  ["Pilotage", "APPLICATION"],
];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set("[data-hero-word],[data-hero-copy],[data-hero-scene],[data-telemetry]", { opacity: 1, y: 0 });
        return;
      }

      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .from("[data-hero-kicker]", { opacity: 0, y: 12, duration: 0.65 })
        .from("[data-hero-word]", { yPercent: 112, duration: 1.15, stagger: 0.07 }, "-=.3")
        .from("[data-hero-copy]", { opacity: 0, y: 20, duration: 0.8 }, "-=.55")
        .from("[data-hero-scene]", { opacity: 0, scale: 1.04, duration: 1.5 }, "-=1.2")
        .from("[data-telemetry]", { opacity: 0, y: 10, duration: 0.55, stagger: 0.08 }, "-=.8");

      gsap.timeline({
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 1 },
      })
        .to("[data-hero-scene]", { yPercent: 7, scale: 1.035, ease: "none" }, 0)
        .to("[data-hero-copy]", { yPercent: -9, opacity: 0.22, ease: "none" }, 0);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={root} className="relative min-h-[100svh] overflow-hidden bg-[#060806] pt-18">
      <div data-hero-scene className="absolute inset-0 lg:left-[24%]">
        <SceneGate rootMargin="20% 0px"><HeroEnergyScene /></SceneGate>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#060806_0%,rgba(6,8,6,.96)_20%,rgba(6,8,6,.68)_41%,rgba(6,8,6,.12)_69%,rgba(6,8,6,.3)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38vh] bg-gradient-to-t from-[#060806] via-[#060806]/65 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#060806]/70 to-transparent" />

      <div className="container-wp relative z-10 flex min-h-[calc(100svh-4.5rem)] flex-col justify-between py-8 md:py-11">
        <div data-hero-kicker className="flex items-center justify-between gap-6 pt-4 text-[10px] uppercase tracking-[.18em] text-white/36">
          <div className="flex items-center gap-3"><span className="accent-dot" /> Énergie solaire intelligente — Marrakech</div>
          <span className="hidden lg:block">Production · stockage · pilotage</span>
        </div>

        <div data-hero-copy className="max-w-[880px] pb-[10vh] pt-[18vh] lg:pb-[7vh]">
          <div className="overflow-hidden"><h1 data-hero-word className="display-xl">WATT</h1></div>
          <div className="overflow-hidden"><h1 data-hero-word className="display-xl text-white/31">POWER.</h1></div>

          <div className="mt-8 flex max-w-2xl flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="max-w-md text-lg leading-relaxed text-white/67 md:text-xl">Votre énergie. Sous contrôle.</p>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/36">
                Une installation solaire pensée comme un système technologique complet, du toit jusqu&apos;à votre téléphone.
              </p>
            </div>
            <a href="#system" className="group flex w-fit items-center gap-3 text-[10px] uppercase tracking-[.16em] text-white/45 transition hover:text-white">
              Explorer le système
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-white/[.025] transition group-hover:border-white/30 group-hover:bg-white/[.06]">↓</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-white/[.09] pt-5 md:flex-row md:items-end md:justify-between">
          <span className="text-[9px] uppercase tracking-[.15em] text-white/25">01 / Watt Power</span>
          <div className="grid w-full max-w-[660px] grid-cols-3 gap-5">
            {telemetry.map(([label, value]) => (
              <div data-telemetry key={label} className="border-l border-white/[.09] pl-4">
                <div className="text-[8px] uppercase tracking-[.14em] text-white/23">{label}</div>
                <div className="mt-1 flex items-center gap-2 text-[9px] uppercase tracking-[.1em] text-white/58">
                  <span className="h-1 w-1 rounded-full bg-[color:var(--accent)] shadow-[0_0_10px_rgba(217,255,90,.6)]" />
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
