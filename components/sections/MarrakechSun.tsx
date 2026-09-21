"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { MarrakechScene } from "@/components/three/MarrakechScene";
import { SceneGate } from "@/components/three/SceneGate";
import { REAL_ASSETS } from "@/components/three/realAssets";

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

      gsap.fromTo(
        "[data-marrakech-copy]",
        { y: 80, opacity: 0.15 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 75%", end: "center 38%", scrub: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative min-h-[115vh] overflow-hidden bg-[#100d0a]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: `url("${REAL_ASSETS.marrakechBackdrop}")` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,13,10,.08),rgba(8,10,11,.38))]" />

      <div className="absolute inset-0 lg:left-[24%]">
        <SceneGate rootMargin="35% 0px"><MarrakechScene progress={progress} /></SceneGate>
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-[48%] bg-cover bg-center opacity-[.075] mix-blend-soft-light"
        style={{ backgroundImage: `url("${REAL_ASSETS.plasterTexture}")` }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#100d0a_0%,rgba(16,13,10,.95)_20%,rgba(16,13,10,.68)_43%,rgba(16,13,10,.13)_72%,rgba(16,13,10,.24)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#060806] via-[#060806]/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#060806]/82 to-transparent" />

      <div className="container-wp relative z-10 grid min-h-[115vh] items-center py-28 lg:grid-cols-[.82fr_1.18fr]">
        <div data-marrakech-copy className="max-w-xl">
          <span className="eyebrow !text-[#e0c3a1]">Marrakech / soleil / architecture</span>
          <AnimatedHeading className="mt-6">
            <h2 className="display-lg text-balance">Le solaire s&apos;intègre à l&apos;architecture.</h2>
          </AnimatedHeading>

          <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/58">
            Une installation Watt Power n&apos;est pas pensée comme un équipement ajouté après coup. La production solaire s&apos;intègre au bâtiment, puis devient visible dans une seule interface.
          </p>

          <div className="mt-10 flex flex-wrap gap-x-9 gap-y-5 border-t border-white/[.1] pt-6">
            <div>
              <div className="text-[9px] uppercase tracking-[.15em] text-white/28">Contexte</div>
              <div className="mt-1 text-sm text-white/70">Marrakech</div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-[.15em] text-white/28">3D</div>
              <div className="mt-1 text-sm text-white/70">Modèles GLB réels</div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-[.15em] text-white/28">Environnement</div>
              <div className="mt-1 text-sm text-white/70">Photo CC0 / Poly Haven</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
