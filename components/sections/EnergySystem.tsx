"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  ["01", "Produire", "Les panneaux transforment la lumière en énergie."],
  ["02", "Convertir", "L’onduleur rend cette énergie utilisable par le bâtiment."],
  ["03", "Stocker", "La batterie conserve l’énergie disponible si elle est installée."],
  ["04", "Piloter", "L’application centralise production, consommation et état du système."],
];

export function EnergySystem() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo("[data-flow-line]", { scaleX: 0 }, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 62%", end: "bottom 64%", scrub: true },
      });

      gsap.from("[data-system-card]", {
        opacity: 0,
        y: 40,
        stagger: .14,
        duration: .8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 55%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="system" ref={root} className="section-pad relative overflow-hidden border-t border-white/[.07] bg-[#050706]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(217,255,90,.055),transparent_31%)]" />
      <div className="container-wp relative z-10">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <span className="eyebrow">Le système Watt Power</span>
            <h2 className="mt-6 text-[clamp(3.2rem,7vw,7.4rem)] font-medium leading-[.88] tracking-[-.06em]">
              Une énergie.<br /><span className="text-white/28">Un seul parcours.</span>
            </h2>
          </div>
          <p className="max-w-lg text-base leading-relaxed text-white/46 lg:justify-self-end">
            Pas de jargon inutile : nous relions production, conversion, stockage et pilotage dans une installation cohérente.
          </p>
        </div>

        <div className="relative mt-24">
          <div className="absolute left-0 right-0 top-10 h-px bg-white/[.08]" />
          <div data-flow-line className="absolute left-0 right-0 top-10 h-px origin-left bg-[color:var(--accent)] shadow-[0_0_24px_rgba(217,255,90,.35)]" />

          <div className="relative grid gap-5 md:grid-cols-4">
            {stages.map(([number, title, copy]) => (
              <article data-system-card key={number} className="relative pt-20">
                <div className="absolute left-0 top-[34px] h-3 w-3 rounded-full border-2 border-[#050706] bg-[color:var(--accent)] shadow-[0_0_18px_rgba(217,255,90,.55)]" />
                <div className="text-[9px] uppercase tracking-[.14em] text-white/24">{number}</div>
                <h3 className="mt-4 text-3xl tracking-[-.045em]">{title}.</h3>
                <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-white/40">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
