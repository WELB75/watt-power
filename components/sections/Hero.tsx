"use client";

import Image from "next/image";
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

// Roof coordinates are in the image's 1536 × 1024 plane, so they stay
// registered to the architecture when the viewport crops the composition.
const roofPanels = Array.from({ length: 8 }, (_, index) => {
  const col = index % 4;
  const row = Math.floor(index / 4);
  const point = (u: number, v: number) => `${934 + 284 * u + 174 * v},${326 + 14 * u - 32 * v}`;
  const u = col / 4, v = row / 2;
  return [point(u, v), point(u + .23, v), point(u + .23, v + .43), point(u, v + .43)].join(" ");
});

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to("[data-hero-intro]", { autoAlpha: 0, y: -36, duration: 0.08 }, 0.18)
        .fromTo("[data-anatomy]", { autoAlpha: 0, x: 32 }, { autoAlpha: 1, x: 0, duration: 0.08 }, 0.18)
        .to("[data-layer-glass]", { y: -135, z: 120, duration: 0.12 }, 0.2)
        .to("[data-layer-eva-front]", { y: -78, z: 72, duration: 0.12 }, 0.205)
        .to("[data-layer-cells]", { y: -18, z: 18, duration: 0.12 }, 0.21)
        .to("[data-layer-eva-rear]", { y: 48, z: -45, duration: 0.12 }, 0.215)
        .to("[data-layer-backsheet]", { y: 108, z: -95, duration: 0.12 }, 0.22)
        .to("[data-layer-junction]", { y: 158, z: -130, duration: 0.12 }, 0.225)
        .from("[data-layer-label]", { opacity: 0, x: 16, stagger: 0.012, duration: 0.06 }, 0.24)
        .to("[data-anatomy]", { autoAlpha: 0, x: -18, duration: 0.06 }, 0.44)
        .to("[data-panel-layer]", { y: 0, z: 0, duration: 0.1, stagger: 0.006 }, 0.44)
        .fromTo("[data-install-copy]", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.56)
        .to("[data-panel-stage]", {
          x: () => {
            const plane = el.querySelector(".villa-plane")!.getBoundingClientRect();
            const host = el.querySelector(".panel-host")!.getBoundingClientRect();
            return plane.left + plane.width * 1004 / 1536 - (host.left + host.width / 2);
          },
          y: () => {
            const plane = el.querySelector(".villa-plane")!.getBoundingClientRect();
            const host = el.querySelector(".panel-host")!.getBoundingClientRect();
            return plane.top + plane.height * 321 / 1024 - (host.top + host.height / 2);
          },
          scale: 0.2,
          rotateZ: 3,
          rotateX: 76,
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
            y: -(index % 4) * 3.5 + Math.floor(index / 4) * 16,
            x: -(index % 4) * 71 - Math.floor(index / 4) * 87,
            scale: 1,
            rotate: 0,
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

      tl.to("[data-install-copy]", { autoAlpha: 0, duration: 0.05 }, 0.86)
        .fromTo("[data-final-copy]", { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.88)
        .to("[data-villa-plane]", { scale: 1.035, duration: 1, ease: "none" }, 0);
      }, el);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, []);

  return (
    <section id="top" ref={root} className="solar-story relative h-[420svh] bg-[#050706]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="villa-plane" aria-hidden="true">
          <div data-villa-plane className="relative h-full w-full">
          <Image src="/assets/images/villa-aerial-v2.webp" alt="" fill sizes="(max-width: 700px) 150vw, 100vw" preload className="object-cover" />
          <svg viewBox="0 0 1536 1024" className="absolute inset-0 h-full w-full overflow-visible">
            <defs>
              <pattern id="roof-cells" width="12" height="8" patternUnits="userSpaceOnUse" patternTransform="matrix(1 .05 -.8 .35 0 0)">
                <rect width="12" height="8" fill="#17282e" />
                <path d="M0 0H12M0 0V8" stroke="#819296" strokeWidth=".65" />
              </pattern>
            </defs>
            <g data-roof-array className="installed-array">
              {roofPanels.map((points, index) => <polygon data-roof-panel key={index} points={points} fill="url(#roof-cells)" stroke="#91928b" strokeWidth="2" />)}
            </g>
          </svg>
          </div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,6,.94)_0%,rgba(5,7,6,.82)_25%,rgba(5,7,6,.26)_54%,rgba(5,7,6,.09)_75%,rgba(5,7,6,.24)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[42vh] bg-gradient-to-t from-[#050706] via-[#050706]/35 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#050706]/65 to-transparent" />

        <div className="container-wp relative z-10 h-full pt-24">
          <div className="absolute left-[var(--space-page)] right-[var(--space-page)] top-24 flex items-center justify-between text-[10px] uppercase tracking-[.18em] text-white/52">
            <div className="flex items-center gap-3"><span className="accent-dot" /> Marrakech · Solaire premium</div>
            <span className="hidden md:block">Conception · Installation · Pilotage</span>
          </div>

          <div data-hero-intro className="absolute left-[var(--space-page)] hero-intro top-[23%] max-w-[780px]">
            <h1 className="hero-title">L&apos;énergie solaire.<br /><span>À votre mesure.</span></h1>
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

          <div className="panel-host absolute right-[7vw] top-[38%] z-20 h-[38vh] w-[min(40vw,590px)] [perspective:1300px]">
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

          <div data-anatomy className="anatomy-copy absolute left-[var(--space-page)] top-[24%] w-[285px] opacity-0">
            <span className="eyebrow !text-white/45">Technologie / panneau premium</span>
            <h2 className="mt-4 text-4xl font-medium leading-[.95] tracking-[-.05em]">La précision, à chaque couche.</h2>
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
              Votre toit.<br /><span className="text-white/60">Une ressource.</span>
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/54 md:text-base">
              Une installation dimensionnée pour vos usages, intégrée avec soin à l&apos;architecture de votre villa.
            </p>
          </div>

          <div data-final-copy className="absolute bottom-[16%] left-[var(--space-page)] max-w-[420px] opacity-0">
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
