"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroEnergyScene } from "@/components/three/HeroEnergyScene";
import { SceneGate } from "@/components/three/SceneGate";

gsap.registerPlugin(ScrollTrigger);

const layers = [
  ["01", "Verre trempé"],
  ["02", "Encapsulation EVA"],
  ["03", "Cellules photovoltaïques"],
  ["04", "Backsheet"],
  ["05", "Cadre aluminium"],
];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const scroll = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        scrub: reduced ? false : 1,
        onUpdate: (self) => {
          progress.current = self.progress;
        },
      });

      if (!reduced) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        tl
          .from("[data-hero-kicker]", { opacity: 0, y: 12, duration: 0.06 }, 0)
          .from("[data-hero-word]", { yPercent: 112, duration: 0.11, stagger: 0.018 }, 0.015)
          .from("[data-hero-sub]", { opacity: 0, y: 18, duration: 0.06 }, 0.08)
          .to("[data-hero-intro]", { opacity: 0.08, y: -38, duration: 0.11 }, 0.17)

          .fromTo(
            "[data-explode-copy]",
            { opacity: 0, x: 35 },
            { opacity: 1, x: 0, duration: 0.07 },
            0.17,
          )
          .fromTo(
            "[data-layer]",
            { opacity: 0, x: 24 },
            { opacity: 1, x: 0, duration: 0.08, stagger: 0.015 },
            0.2,
          )
          .to("[data-explode-copy],[data-layer]", { opacity: 0, x: -20, duration: 0.07 }, 0.46)

          .fromTo(
            "[data-install-copy]",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.08 },
            0.56,
          )
          .fromTo(
            "[data-install-step]",
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.08, stagger: 0.025 },
            0.62,
          )
          .fromTo(
            "[data-final-copy]",
            { opacity: 0, y: 26 },
            { opacity: 1, y: 0, duration: 0.08 },
            0.86,
          );
      } else {
        gsap.set("[data-hero-word],[data-hero-sub],[data-install-copy],[data-install-step],[data-final-copy]", {
          opacity: 1,
          y: 0,
        });
      }

      return () => scroll.kill();
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="relative h-[520vh] bg-[#060806]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden pt-18">
        <div data-hero-scene className="absolute inset-0">
          <SceneGate rootMargin="10% 0px">
            <HeroEnergyScene progress={progress} />
          </SceneGate>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_68%_42%,rgba(217,255,90,.055),transparent_28%),linear-gradient(90deg,#060806_0%,rgba(6,8,6,.88)_20%,rgba(6,8,6,.2)_48%,rgba(6,8,6,.08)_72%,rgba(6,8,6,.42)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34vh] bg-gradient-to-t from-[#060806] via-[#060806]/55 to-transparent" />

        <div className="container-wp relative z-10 h-full">
          <div
            data-hero-kicker
            className="absolute left-[var(--space-page)] right-[var(--space-page)] top-7 flex items-center justify-between text-[10px] uppercase tracking-[.18em] text-white/36"
          >
            <div className="flex items-center gap-3">
              <span className="accent-dot" />
              Ingénierie solaire — Marrakech
            </div>
            <span className="hidden lg:block">De la cellule au toit</span>
          </div>

          <div
            data-hero-intro
            className="absolute left-[var(--space-page)] top-[22%] max-w-[760px]"
          >
            <div className="overflow-hidden">
              <h1 data-hero-word className="display-xl">WATT</h1>
            </div>
            <div className="overflow-hidden">
              <h1 data-hero-word className="display-xl text-white/31">POWER.</h1>
            </div>
            <div data-hero-sub className="mt-7 max-w-xl">
              <p className="text-lg leading-relaxed text-white/67 md:text-xl">
                Regardez comment une installation prend forme.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/36">
                Un panneau photovoltaïque, ses couches internes, puis une pose complète sur la toiture d&apos;une villa.
              </p>
            </div>
          </div>

          <div
            data-explode-copy
            className="absolute right-[var(--space-page)] top-[18%] hidden w-[310px] opacity-0 lg:block"
          >
            <span className="eyebrow">01 / Anatomie du panneau</span>
            <h2 className="mt-4 text-4xl font-medium leading-[.95] tracking-[-.05em]">
              Chaque couche a un rôle.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/42">
              Le panneau se décompose sans quitter la scène : protection, encapsulation, cellules, support et structure.
            </p>

            <div className="mt-8 border-t border-white/10">
              {layers.map(([number, label]) => (
                <div
                  data-layer
                  key={number}
                  className="flex items-center gap-4 border-b border-white/[.07] py-3 opacity-0"
                >
                  <span className="text-[9px] tabular-nums text-[color:var(--accent)]">{number}</span>
                  <span className="text-[11px] uppercase tracking-[.12em] text-white/58">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            data-install-copy
            className="absolute left-[var(--space-page)] top-[18%] max-w-[420px] opacity-0"
          >
            <span className="eyebrow">02 / Installation</span>
            <h2 className="mt-4 text-[clamp(2.8rem,5vw,5.2rem)] font-medium leading-[.9] tracking-[-.055em]">
              Du panneau.<br />
              <span className="text-white/28">À la toiture.</span>
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/45 md:text-base">
              Le système se recompose, se duplique et vient s&apos;aligner sur la villa comme une installation pensée dès le départ pour l&apos;architecture.
            </p>
          </div>

          <div className="absolute bottom-8 left-[var(--space-page)] right-[var(--space-page)] z-10">
            <div className="grid grid-cols-3 gap-4 border-t border-white/[.09] pt-4">
              {[
                ["01", "Décomposition"],
                ["02", "Assemblage"],
                ["03", "Pose toiture"],
              ].map(([number, label]) => (
                <div data-install-step key={number} className="opacity-0">
                  <div className="text-[8px] tabular-nums text-white/22">{number}</div>
                  <div className="mt-1 text-[9px] uppercase tracking-[.13em] text-white/45">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div
            data-final-copy
            className="absolute bottom-[16%] right-[var(--space-page)] max-w-[360px] text-right opacity-0"
          >
            <span className="text-[9px] uppercase tracking-[.15em] text-[color:var(--accent)]">
              Installation terminée
            </span>
            <p className="mt-3 text-2xl leading-tight tracking-[-.04em] text-white/86 md:text-3xl">
              L&apos;énergie solaire devient une partie de la maison.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
