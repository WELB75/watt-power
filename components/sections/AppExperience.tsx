"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PhoneMockup } from "@/components/ui/PhoneMockup";

gsap.registerPlugin(ScrollTrigger);

export function AppExperience() {
  const root = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const sc = scene.current;
    if (!el || !sc) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: { trigger: el, start: "top top", end: "+=220%", pin: sc, scrub: 1, anticipatePin: 1 },
      })
        .fromTo("[data-phone]", { scale: .58, rotateY: -13, rotateX: 5, y: 90 }, { scale: 1.05, rotateY: 0, rotateX: 0, y: 0, duration: 2.1, ease: "power2.inOut" }, 0)
        .fromTo("[data-app-copy]", { opacity: .2, y: 40 }, { opacity: 1, y: 0, duration: .8 }, .3)
        .to("[data-app-copy]", { opacity: .2, y: -35, duration: .8 }, 1.7)
        .to("[data-phone]", { scale: 1.25, rotateY: 7, y: -20, duration: 1.1 }, 1.7)
        .fromTo("[data-app-end]", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .8 }, 2.0);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="app" ref={root} className="relative h-[320vh] border-t border-white/8 bg-[#090b0c]">
      <div ref={scene} className="relative flex h-[100svh] items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_52%,rgba(217,255,90,.06),transparent_28%)]" />
        <div className="container-wp relative grid w-full items-center gap-12 lg:grid-cols-[.75fr_1fr_.75fr]">
          <div data-app-copy className="relative z-10 self-center">
            <span className="eyebrow">Watt Power app</span>
            <h2 className="mt-5 text-[clamp(3rem,6.8vw,6.5rem)] font-medium leading-[.88] tracking-[-.055em]">Energy in your hand.</h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/48 md:text-base">Production. Consumption. History. Battery. Savings estimates. System status.</p>
          </div>
          <div data-phone className="relative z-20 [transform-style:preserve-3d] [perspective:1200px]"><PhoneMockup /></div>
          <div data-app-end className="relative z-10 self-end pb-14 text-right opacity-0 lg:self-center lg:pb-0">
            <span className="text-[10px] uppercase tracking-[.14em] text-white/35">Live visibility</span>
            <p className="mt-3 ml-auto max-w-xs text-xl leading-tight tracking-[-.03em]">See what your system is doing — now, today, this month, this year.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
