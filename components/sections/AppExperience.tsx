"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PhoneMockup } from "@/components/ui/PhoneMockup";

gsap.registerPlugin(ScrollTrigger);

export function AppExperience() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-app-phone]", {
        y: 90,
        scale: .86,
        rotate: -4,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: { trigger: el, start: "top 66%", once: true },
      });

      gsap.from("[data-app-note]", {
        opacity: 0,
        y: 22,
        stagger: .12,
        duration: .7,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 52%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="app" ref={root} className="section-pad relative overflow-hidden border-t border-white/[.07] bg-[#080a09]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_56%_50%,rgba(217,255,90,.07),transparent_25%)]" />
      <div className="container-wp relative z-10 grid items-center gap-16 lg:grid-cols-[.82fr_1fr_.72fr]">
        <div>
          <span className="eyebrow">Application Watt Power</span>
          <h2 className="mt-6 text-[clamp(3.2rem,6.6vw,6.7rem)] font-medium leading-[.88] tracking-[-.058em]">
            Votre énergie.<br /><span className="text-white/28">Enfin lisible.</span>
          </h2>
          <p className="mt-7 max-w-md text-base leading-relaxed text-white/48">
            Production solaire, consommation, batterie, historique et état du système réunis dans une interface simple.
          </p>
        </div>

        <div data-app-phone className="relative flex min-h-[640px] items-center justify-center">
          <div className="absolute h-[72%] w-[72%] rounded-full bg-[color:var(--accent)]/[.035] blur-3xl" />
          <PhoneMockup />
        </div>

        <div className="space-y-8">
          {[
            ["Production", "Suivez instantanément l’énergie produite."],
            ["Consommation", "Comprenez où et quand votre énergie est utilisée."],
            ["Batterie", "Visualisez l’autonomie et le niveau de charge."],
          ].map(([title, copy], i) => (
            <div data-app-note key={title} className="border-l border-white/10 pl-5">
              <div className="text-[9px] text-[color:var(--accent)]">0{i + 1}</div>
              <div className="mt-2 text-lg tracking-[-.03em]">{title}</div>
              <p className="mt-2 text-sm leading-relaxed text-white/38">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
