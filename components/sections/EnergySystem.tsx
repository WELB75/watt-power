"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EnergyFlow } from "@/components/ui/EnergyFlow";

gsap.registerPlugin(ScrollTrigger);

export function EnergySystem() {
  const root = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const sc = scene.current;
    if (!el || !sc) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set("[data-energy-node]", { opacity: 1 });
        gsap.set("[data-energy-line]", { width: "84%" });
        return;
      }
      const nodes = gsap.utils.toArray<HTMLElement>("[data-energy-node]");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=280%",
          pin: sc,
          scrub: 1,
          anticipatePin: 1,
        },
      });
      tl.to("[data-system-intro]", { opacity: 0, y: -35, duration: .7 }, 0)
        .to("[data-energy-line]", { width: "84%", duration: 4.2, ease: "none" }, .4);
      nodes.forEach((node, index) => {
        tl.to(node, { opacity: 1, scale: 1.04, duration: .45 }, .5 + index * .78)
          .to(node, { scale: 1, duration: .3 }, .86 + index * .78);
      });
      tl.fromTo("[data-system-result]", { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: .8 }, 4.4);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="system" ref={root} className="relative h-[380vh] border-t border-white/8">
      <div ref={scene} className="flex h-[100svh] items-center overflow-hidden">
        <div className="container-wp w-full">
          <div data-system-intro className="mb-12 flex items-end justify-between gap-8">
            <div>
              <span className="eyebrow">The energy system</span>
              <h2 className="mt-5 max-w-4xl text-[clamp(2.8rem,7vw,7rem)] font-medium leading-[.9] tracking-[-.055em]">One continuous flow.</h2>
            </div>
            <p className="hidden max-w-xs text-sm leading-relaxed text-white/45 md:block">Energy moves through each component. Watt Power makes the entire path visible.</p>
          </div>
          <EnergyFlow />
          <p data-system-result className="mx-auto mt-12 max-w-xl text-center text-sm leading-relaxed text-white/48 opacity-0 md:text-base">
            Production, storage, consumption and system status become one readable experience.
          </p>
        </div>
      </div>
    </section>
  );
}
