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
    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.set("[data-app-chart]", { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set("[data-app-bar]", { scaleX: 0 });
      gsap.set("[data-flow-pulse]", { xPercent: -130 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=260%",
          pin: sc,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl
        .fromTo("[data-phone]", { scale: 0.58, rotateY: -14, rotateX: 5, y: 105 }, { scale: 1.02, rotateY: 0, rotateX: 0, y: 0, duration: 1.9, ease: "power2.inOut" }, 0)
        .fromTo("[data-app-copy]", { opacity: 0.18, y: 42 }, { opacity: 1, y: 0, duration: 0.7 }, 0.25)
        .fromTo("[data-floating-left]", { opacity: 0, x: 45, y: 30 }, { opacity: 1, x: 0, y: 0, duration: 0.6 }, 0.8)
        .fromTo("[data-floating-right]", { opacity: 0, x: -45, y: -20 }, { opacity: 1, x: 0, y: 0, duration: 0.6 }, 1.0)
        .to("[data-app-chart]", { strokeDashoffset: 0, duration: 1.1, ease: "none" }, 0.72)
        .to("[data-app-bar]", { scaleX: 1, duration: 0.9, ease: "power2.out" }, 1.0)
        .to("[data-flow-pulse]", { xPercent: 400, duration: 1.1, ease: "none", stagger: 0.08 }, 1.15)
        .to("[data-app-copy]", { opacity: 0.18, y: -38, duration: 0.65 }, 1.75)
        .to("[data-floating-left]", { opacity: 0, x: -20, duration: 0.55 }, 1.82)
        .to("[data-floating-right]", { opacity: 0, x: 20, duration: 0.55 }, 1.82)
        .to("[data-phone]", { scale: 1.22, rotateY: 6, y: -18, duration: 1.0, ease: "power2.inOut" }, 1.72)
        .fromTo("[data-app-end]", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7 }, 2.03);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="app" ref={root} className="relative h-[360vh] border-t border-white/8 bg-[#080a0b]">
      <div ref={scene} className="relative flex h-[100svh] items-center overflow-hidden">
        <div className="energy-grid absolute inset-0 opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,255,90,.07),transparent_26%),radial-gradient(circle_at_15%_42%,rgba(255,255,255,.035),transparent_20%)]" />
        <div className="absolute left-1/2 top-1/2 h-[76vh] w-[76vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[.04]" />
        <div className="absolute left-1/2 top-1/2 h-[58vh] w-[58vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[.045]" />

        <div className="container-wp relative grid w-full items-center gap-10 lg:grid-cols-[.76fr_1fr_.76fr]">
          <div data-app-copy className="relative z-10 self-center">
            <span className="eyebrow">Application Watt Power</span>
            <h2 className="mt-5 text-[clamp(3rem,6.7vw,6.8rem)] font-medium leading-[.87] tracking-[-.058em]">Votre énergie.<br /><span className="text-white/28">Dans votre main.</span></h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/43 md:text-base">Production. Consommation. Historique. Batterie. Économies estimées. État du système. Une seule interface.</p>
            <div className="mt-8 flex items-center gap-3 text-[9px] uppercase tracking-[.15em] text-white/26"><span className="accent-dot !h-1 !w-1" /> Concept de suivi en temps réel</div>
          </div>

          <div className="relative min-h-[620px] lg:min-h-[720px]">
            <div data-phone className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d] [perspective:1300px]"><PhoneMockup /></div>

            <div data-floating-left className="absolute left-[-3%] top-[22%] z-30 hidden rounded-2xl border border-white/10 bg-black/38 px-4 py-3 backdrop-blur-xl md:block lg:left-[-14%]">
              <div className="text-[8px] uppercase tracking-[.14em] text-white/24">Production instantanée</div>
              <div className="mt-1 text-2xl tracking-[-.05em]">4.8 <span className="text-xs text-white/28">kW</span></div>
              <div className="mt-2 h-px w-24 bg-gradient-to-r from-[color:var(--accent)] to-transparent" />
            </div>

            <div data-floating-right className="absolute bottom-[23%] right-[-3%] z-30 hidden rounded-2xl border border-white/10 bg-black/38 px-4 py-3 backdrop-blur-xl md:block lg:right-[-13%]">
              <div className="text-[8px] uppercase tracking-[.14em] text-white/24">Batterie</div>
              <div className="mt-1 flex items-end gap-2"><span className="text-2xl tracking-[-.05em]">78%</span><span className="mb-1 text-[8px] uppercase tracking-[.12em] text-[color:var(--accent)]">En charge</span></div>
            </div>
          </div>

          <div data-app-end className="relative z-10 self-end pb-14 text-right opacity-0 lg:self-center lg:pb-0">
            <span className="text-[9px] uppercase tracking-[.15em] text-white/28">Visibilité en temps réel</span>
            <p className="mt-3 ml-auto max-w-xs text-xl leading-tight tracking-[-.035em] text-white/84">Voyez ce que fait votre système — maintenant, aujourd&apos;hui, ce mois-ci, cette année.</p>
            <div className="mt-6 ml-auto h-px w-24 bg-gradient-to-l from-[color:var(--accent)] to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
