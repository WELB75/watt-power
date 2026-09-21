"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { MarrakechScene } from "@/components/three/MarrakechScene";

gsap.registerPlugin(ScrollTrigger);

export function MarrakechSun() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          progress.current = self.progress;
        },
      });

      gsap.fromTo("[data-marrakech-copy]", { y: 80, opacity: 0.15 }, {
        y: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 75%", end: "center 38%", scrub: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative min-h-[115vh] overflow-hidden bg-[#100d0a]">
      <div className="absolute inset-0 lg:left-[28%]">
        <MarrakechScene progress={progress} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#100d0a_0%,rgba(16,13,10,.96)_22%,rgba(16,13,10,.67)_46%,rgba(16,13,10,.08)_75%,rgba(16,13,10,.28)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#080a0b] via-[#080a0b]/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#080a0b] via-[#080a0b]/35 to-transparent" />

      <div className="container-wp relative z-10 grid min-h-[115vh] items-center py-28 lg:grid-cols-[.84fr_1.16fr]">
        <div data-marrakech-copy className="max-w-xl">
          <span className="eyebrow !text-[#d4b895]">Marrakech / soleil / architecture</span>
          <AnimatedHeading className="mt-6">
            <h2 className="display-lg text-balance">Le solaire s&apos;intègre à l&apos;architecture.</h2>
          </AnimatedHeading>

          <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/55">
            Une installation Watt Power n&apos;est pas pensée comme un équipement ajouté après coup. Panneaux, production et pilotage s&apos;intègrent à la maison comme un seul système.
          </p>

          <div className="mt-10 flex flex-wrap gap-x-9 gap-y-5 border-t border-white/[.09] pt-6">
            <div>
              <div className="text-[9px] uppercase tracking-[.15em] text-white/26">Contexte</div>
              <div className="mt-1 text-sm text-white/66">Marrakech</div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-[.15em] text-white/26">Approche</div>
              <div className="mt-1 text-sm text-white/66">Intégration architecturale</div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-[.15em] text-white/26">Données</div>
              <div className="mt-1 text-sm text-white/66">À valider avant publication</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
