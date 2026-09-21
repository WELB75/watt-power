"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EnergySystemScene } from "@/components/three/EnergySystemScene";
import { SceneGate } from "@/components/three/SceneGate";

gsap.registerPlugin(ScrollTrigger);

const stages = ["Panneaux", "Conversion", "Stockage", "Maison"];

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
        end: "+=330%",
        pin: sc,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          progress.current = self.progress;
        },
      });

      gsap.to("[data-system-intro]", {
        opacity: 0.12,
        y: -36,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "32% top", scrub: true },
      });

      gsap.fromTo(
        "[data-system-result]",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: { trigger: el, start: "66% top", end: "bottom bottom", scrub: true },
        },
      );

      return () => trigger.kill();
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="system" ref={root} className="relative h-[430vh] bg-[#060806]">
      <div ref={scene} className="relative flex h-[100svh] items-center overflow-hidden">
        <div className="absolute inset-0 lg:left-[13%] lg:right-[4%]">
          <SceneGate rootMargin="30% 0px"><EnergySystemScene progress={progress} /></SceneGate>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#060806_0%,rgba(6,8,6,.92)_18%,rgba(6,8,6,.14)_42%,rgba(6,8,6,.05)_68%,rgba(6,8,6,.56)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#060806] to-transparent" />

        <div className="container-wp pointer-events-none relative z-10 flex h-full flex-col justify-between py-24">
          <div data-system-intro className="max-w-2xl pt-[3vh]">
            <span className="eyebrow">Architecture du système</span>
            <h2 className="mt-5 text-[clamp(3rem,7vw,7rem)] font-medium leading-[.88] tracking-[-.058em]">
              Une maison.<br /><span className="text-white/28">Un seul écosystème.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/45 md:text-base">
              Le scroll révèle la logique complète de l&apos;installation : captation, conversion, stockage puis alimentation du logement.
            </p>
          </div>

          <div>
            <p data-system-result className="mb-8 max-w-xl text-sm leading-relaxed text-white/57 opacity-0 md:text-base">
              Chaque composant reste identifiable, mais l&apos;expérience est pensée comme un système unique et cohérent.
            </p>

            <div className="grid max-w-3xl grid-cols-4 gap-4 border-t border-white/[.09] pt-4">
              {stages.map((stage, index) => (
                <div key={stage}>
                  <div className="text-[8px] tabular-nums text-white/20">0{index + 1}</div>
                  <div className="mt-1 text-[8px] uppercase tracking-[.12em] text-white/45 sm:text-[10px]">{stage}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
