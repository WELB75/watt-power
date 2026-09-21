"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EnergySystemScene } from "@/components/three/EnergySystemScene";

gsap.registerPlugin(ScrollTrigger);

const stages = ["Soleil", "Panneaux", "Onduleur", "Batterie", "Maison"];

export function EnergySystem() {
  const root = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const progress = useRef(0);

  useEffect(() => {
    const el = root.current;
    const sc = scene.current;
    if (!el || !sc) return;

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "+=320%",
        pin: sc,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          progress.current = self.progress;
        },
      });

      gsap.to("[data-system-intro]", {
        opacity: 0.18,
        y: -24,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "35% top",
          scrub: true,
        },
      });

      gsap.fromTo(
        "[data-system-result]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "70% top",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );

      return () => trigger.kill();
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="system" ref={root} className="relative h-[420vh] border-t border-white/8 bg-[#080a0b]">
      <div ref={scene} className="relative flex h-[100svh] items-center overflow-hidden">
        <div className="absolute inset-0">
          <EnergySystemScene progress={progress} />
        </div>

        <div className="energy-grid pointer-events-none absolute inset-0 opacity-15" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(8,10,11,.78),transparent_28%,transparent_72%,rgba(8,10,11,.72))]" />

        <div className="container-wp pointer-events-none relative z-10 flex h-full flex-col justify-between py-24">
          <div data-system-intro className="max-w-3xl">
            <span className="eyebrow">Le système énergétique</span>
            <h2 className="mt-5 text-[clamp(2.8rem,7vw,7rem)] font-medium leading-[.9] tracking-[-.055em]">L&apos;énergie devient visible.</h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/42 md:text-base">Faites défiler : la caméra traverse le système Watt Power, de la production solaire jusqu&apos;à la maison.</p>
          </div>

          <div>
            <p data-system-result className="mb-8 max-w-xl text-sm leading-relaxed text-white/54 opacity-0 md:text-base">
              Production, conversion, stockage et consommation sont reliés par un même flux énergétique.
            </p>
            <div className="grid grid-cols-5 border-t border-white/10 pt-4">
              {stages.map((stage, index) => (
                <div key={stage} className="min-w-0">
                  <div className="text-[8px] tabular-nums text-white/20">0{index + 1}</div>
                  <div className="mt-1 truncate text-[8px] uppercase tracking-[.11em] text-white/42 sm:text-[10px] md:text-[11px]">{stage}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
