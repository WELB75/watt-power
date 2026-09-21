"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const layers = [
  ["01", "Verre trempé"],
  ["02", "Encapsulation EVA"],
  ["03", "Cellules photovoltaïques"],
  ["04", "Backsheet"],
  ["05", "Cadre aluminium"],
];

const roofPanels = Array.from({ length: 8 });

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set("[data-panel-layer],[data-roof-panel],[data-final-copy]", { opacity: 1 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      tl.from("[data-hero-title]", { yPercent: 115, duration: 0.07, stagger: 0.015 }, 0.015)
        .from("[data-hero-copy]", { opacity: 0, y: 20, duration: 0.06 }, 0.08)
        .to("[data-hero-intro]", { opacity: 0.12, y: -36, duration: 0.08 }, 0.18)
        .fromTo("[data-anatomy]", { opacity: 0, x: 32 }, { opacity: 1, x: 0, duration: 0.08 }, 0.18)
        .to("[data-layer-glass]", { y: -135, z: 120, duration: 0.12 }, 0.2)
        .to("[data-layer-eva-front]", { y: -78, z: 72, duration: 0.12 }, 0.205)
        .to("[data-layer-cells]", { y: -18, z: 18, duration: 0.12 }, 0.21)
        .to("[data-layer-eva-rear]", { y: 48, z: -45, duration: 0.12 }, 0.215)
        .to("[data-layer-backsheet]", { y: 108, z: -95, duration: 0.12 }, 0.22)
        .to("[data-layer-junction]", { y: 158, z: -130, duration: 0.12 }, 0.225)
        .from("[data-layer-label]", { opacity: 0, x: 16, stagger: 0.012, duration: 0.06 }, 0.24)
        .to("[data-anatomy]", { opacity: 0, x: -18, duration: 0.06 }, 0.44)
        .to("[data-panel-layer]", { y: 0, z: 0, duration: 0.1, stagger: 0.006 }, 0.44)
        .fromTo("[data-install-copy]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.08 }, 0.56)
        .to("[data-panel-stage]", {
          xPercent: 47,
          yPercent: -40,
          scale: 0.35,
          rotateZ: -4,
          rotateX: 66,
          duration: 0.16,
          ease: "power2.inOut",
        }, 0.56)
        .to("[data-panel-stage]", { opacity: 0, duration: 0.045 }, 0.72)
        .fromTo("[data-roof-array]", { opacity: 0 }, { opacity: 1, duration: 0.03 }, 0.68);

      gsap.utils.toArray<HTMLElement>("[data-roof-panel]").forEach((panel, index) => {
        tl.fromTo(
          panel,
          {
            opacity: 0,
            y: -150 - index * 14,
            x: (index % 2 === 0 ? -1 : 1) * (85 + index * 8),
            scale: 1.7,
            rotate: index % 2 === 0 ? -8 : 8,
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            rotate: 0,
            duration: 0.08,
            ease: "power3.out",
          },
          0.7 + index * 0.018,
        );
      });

      tl.to("[data-install-copy]", { opacity: 0.08, duration: 0.05 }, 0.86)
        .fromTo("[data-final-copy]", { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.08 }, 0.88)
        .to("[data-villa-image]", { scale: 1.035, duration: 1, ease: "none" }, 0);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={root} className="relative h-[520vh] bg-[#050706]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <img
          data-villa-image
          src="/api/media/villa"
          alt="Villa contemporaine à Marrakech avec piscine"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,6,.94)_0%,rgba(5,7,6,.82)_25%,rgba(5,7,6,.26)_54%,rgba(5,7,6,.09)_75%,rgba(5,7,6,.24)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[42vh] bg-gradient-to-t from-[#050706] via-[#050706]/35 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#050706]/65 to-transparent" />

        <div className="container-wp relative z-10 h-full pt-24">
          <div className="absolute left-[var(--space-page)] right-[var(--space-page)] top-6 flex items-center justify-between text-[10px] uppercase tracking-[.18em] text-white/52">
            <div className="flex items-center gap-3"><span className="accent-dot" /> Marrakech · Solaire premium</div>
            <span className="hidden md:block">Conception · Installation · Pilotage</span>
          </div>

          <div data-hero-intro className="absolute left-[var(--space-page)] top-[20%] max-w-[780px]">
            <div className="overflow-hidden"><h1 data-hero-title className="display-xl">L&apos;ÉNERGIE</h1></div>
            <div className="overflow-hidden"><h1 data-hero-title className="display-xl text-white/30">SOLAIRE.</h1></div>
            <div data-hero-copy className="mt-7 max-w-xl">
              <p className="text-xl leading-tight tracking-[-.03em] text-white/84 md:text-2xl">Pensée comme une architecture.</p>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/52 md:text-base">
                Des installations haut de gamme pour villas, hôtels et entreprises à Marrakech, avec suivi intelligent depuis votre téléphone.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#contact" className="rounded-full bg-[color:var(--accent)] px-6 py-3.5 text-[10px] font-medium uppercase tracking-[.14em] text-black">Demander une étude</a>
                <a href="#system" className="rounded-full border border-white/16 bg-black/15 px-6 py-3.5 text-[10px] uppercase tracking-[.14em] text-white/72 backdrop-blur-md">Voir le système</a>
              </div>
            </div>
          </div>

          <div className="absolute right-[5vw] top-[21%] z-20 h-[48vh] w-[min(36vw,590px)] [perspective:1300px]">
            <div
              data-panel-stage
              className="relative h-full w-full origin-center [transform-style:preserve-3d] [transform:rotateX(58deg)_rotateZ(-8deg)_rotateY(2deg)]"
            >
              <div data-panel-layer data-layer-backsheet className="solar-layer solar-backsheet" />
              <div data-panel-layer data-layer-eva-rear className="solar-layer solar-eva solar-eva-rear" />
              <div data-panel-layer data-layer-cells className="solar-layer solar-cells" />
              <div data-panel-layer data-layer-eva-front className="solar-layer solar-eva solar-eva-front" />
              <div data-panel-layer data-layer-glass className="solar-layer solar-glass" />
              <div data-panel-layer className="solar-frame" />
              <div data-panel-layer data-layer-junction className="solar-junction" />
            </div>
          </div>

          <div data-anatomy className="absolute right-[var(--space-page)] top-[16%] hidden w-[285px] opacity-0 xl:block">
            <span className="eyebrow !text-white/45">Technologie / panneau premium</span>
            <h2 className="mt-4 text-4xl font-medium leading-[.95] tracking-[-.05em]">Chaque couche a un rôle.</h2>
            <div className="mt-7 border-t border-white/10">
              {layers.map(([number, label]) => (
                <div data-layer-label key={number} className="flex items-center gap-4 border-b border-white/[.08] py-3">
                  <span className="text-[9px] tabular-nums text-[color:var(--accent)]">{number}</span>
                  <span className="text-[10px] uppercase tracking-[.12em] text-white/60">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div data-install-copy className="absolute left-[var(--space-page)] top-[19%] max-w-[470px] opacity-0">
            <span className="eyebrow !text-white/48">De l&apos;usine à votre toit</span>
            <h2 className="mt-4 text-[clamp(3rem,6vw,6.4rem)] font-medium leading-[.88] tracking-[-.06em]">
              Une pose.<br /><span className="text-white/32">Parfaite.</span>
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/54 md:text-base">
              Le panneau se recompose, se duplique puis vient s&apos;aligner sur la toiture en respectant l&apos;architecture de la villa.
            </p>
          </div>

          <div
            data-roof-array
            className="roof-array absolute right-[10.5%] top-[13.8%] z-10 grid w-[47%] grid-cols-4 gap-[0.55vw] opacity-0 [transform:perspective(1100px)_rotateX(64deg)_rotateZ(-3.5deg)_skewX(-2deg)]"
          >
            {roofPanels.map((_, index) => (
              <div data-roof-panel key={index} className="roof-panel">
                <div className="roof-panel-cells" />
              </div>
            ))}
          </div>

          <div data-final-copy className="absolute bottom-[12%] right-[var(--space-page)] max-w-[420px] text-right opacity-0">
            <span className="text-[9px] uppercase tracking-[.15em] text-[color:var(--accent)]">Installation terminée</span>
            <p className="mt-3 text-3xl font-medium leading-[.96] tracking-[-.05em] text-white md:text-5xl">
              Le solaire devient une partie de la maison.
            </p>
            <a href="#contact" className="mt-7 inline-flex rounded-full border border-white/18 bg-black/20 px-5 py-3 text-[10px] uppercase tracking-[.14em] text-white/78 backdrop-blur-md">
              Étudier mon projet
            </a>
          </div>

          <div className="absolute bottom-7 left-[var(--space-page)] right-[var(--space-page)] flex items-center justify-between border-t border-white/10 pt-4 text-[9px] uppercase tracking-[.14em] text-white/32">
            <span>Watt Power · Marrakech</span>
            <span>Faites défiler pour découvrir</span>
          </div>
        </div>
      </div>
    </section>
  );
}
