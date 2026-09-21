"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  ["01", "Produire", "Transformez la lumière du soleil en énergie utilisable."],
  ["02", "Stocker", "Gardez de l’énergie disponible lorsque votre installation comprend une batterie."],
  ["03", "Suivre", "Visualisez la production et la consommation en temps réel."],
  ["04", "Optimiser", "Utilisez les données pour mieux piloter votre énergie."],
];

export function IntelligentEnergy() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-benefit]", {
        y: 40,
        opacity: 0,
        stagger: .12,
        duration: .9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section-pad border-t border-white/8">
      <div className="container-wp">
        <div className="mb-16 flex items-end justify-between gap-8">
          <div><span className="eyebrow">Énergie intelligente</span><h2 className="mt-5 text-[clamp(3rem,7vw,7.5rem)] font-medium leading-[.9] tracking-[-.06em]">Quatre actions.<br /><span className="text-white/30">Un seul système.</span></h2></div>
        </div>
        <div className="border-t border-white/10">
          {benefits.map(([n, title, copy]) => (
            <article key={title} data-benefit className="group grid gap-4 border-b border-white/10 py-7 transition-colors hover:bg-white/[.018] md:grid-cols-[90px_1fr_1fr] md:items-center md:py-9">
              <span className="text-xs tabular-nums text-white/24">{n}</span>
              <h3 className="text-4xl tracking-[-.045em] transition-transform duration-300 group-hover:translate-x-2 md:text-6xl">{title}.</h3>
              <p className="max-w-md text-sm leading-relaxed text-white/40 md:justify-self-end md:text-base">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
