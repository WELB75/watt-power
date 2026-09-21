"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PhoneScene } from "@/components/three/PhoneScene";
import { SceneGate } from "@/components/three/SceneGate";

gsap.registerPlugin(ScrollTrigger);

export function AppExperience() {
  const root = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const progress = useRef(0);

  useEffect(() => {
    const el = root.current;
    const sc = scene.current;
    if (!el || !sc) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "+=300%",
        pin: sc,
        scrub: reduced ? false : 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          progress.current = self.progress;
        },
      });

      if (!reduced) {
        gsap.timeline({
          scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 1 },
        })
          .fromTo("[data-app-copy]", { opacity: 1, y: 0 }, { opacity: 0.12, y: -45, duration: 0.42 }, 0.22)
          .fromTo("[data-app-card-a]", { opacity: 0, x: 30, y: 22 }, { opacity: 1, x: 0, y: 0, duration: 0.24 }, 0.32)
          .fromTo("[data-app-card-b]", { opacity: 0, x: -30, y: -18 }, { opacity: 1, x: 0, y: 0, duration: 0.24 }, 0.46)
          .to("[data-app-card-a],[data-app-card-b]", { opacity: 0.2, duration: 0.18 }, 0.7)
          .fromTo("[data-app-end]", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.25 }, 0.73);
      }

      return () => trigger.kill();
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="app" ref={root} className="relative h-[400vh] bg-[#060806]">
      <div ref={scene} className="relative flex h-[100svh] items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_51%_46%,rgba(217,255,90,.08),transparent_24%),radial-gradient(circle_at_74%_70%,rgba(90,120,255,.05),transparent_22%)]" />
        <div className="absolute inset-y-0 left-[21%] right-[21%]">
          <SceneGate rootMargin="30% 0px"><PhoneScene progress={progress} /></SceneGate>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#060806_0%,rgba(6,8,6,.9)_18%,rgba(6,8,6,.12)_39%,rgba(6,8,6,.12)_63%,rgba(6,8,6,.9)_84%,#060806_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#060806] to-transparent" />

        <div className="container-wp relative z-10 grid w-full items-center lg:grid-cols-[.8fr_1.4fr_.8fr]">
          <div data-app-copy className="max-w-md">
            <span className="eyebrow">Application Watt Power</span>
            <h2 className="mt-5 text-[clamp(3rem,6.5vw,6.7rem)] font-medium leading-[.88] tracking-[-.058em]">
              Toute votre énergie.<br /><span className="text-white/28">Dans un seul écran.</span>
            </h2>
            <p className="mt-7 max-w-sm text-sm leading-relaxed text-white/45 md:text-base">
              Production solaire, consommation, batterie, historique et état du système : l&apos;installation devient lisible et pilotable.
            </p>
          </div>

          <div className="relative min-h-[72vh]" />

          <div className="relative hidden h-[68vh] lg:block">
            <div data-app-card-a className="absolute right-0 top-[15%] w-52 rounded-[1.35rem] border border-white/[.1] bg-black/35 p-4 opacity-0 backdrop-blur-2xl">
              <div className="text-[8px] uppercase tracking-[.14em] text-white/28">Production instantanée</div>
              <div className="mt-2 text-3xl tracking-[-.06em]">4.8 <span className="text-sm text-white/28">kW</span></div>
              <div className="mt-4 h-px bg-gradient-to-r from-[color:var(--accent)] to-transparent" />
              <div className="mt-3 text-[9px] text-white/32">Données de démonstration</div>
            </div>

            <div data-app-card-b className="absolute bottom-[17%] left-0 w-52 rounded-[1.35rem] border border-white/[.1] bg-black/35 p-4 opacity-0 backdrop-blur-2xl">
              <div className="text-[8px] uppercase tracking-[.14em] text-white/28">Batterie</div>
              <div className="mt-2 flex items-end justify-between">
                <span className="text-3xl tracking-[-.06em]">78%</span>
                <span className="mb-1 text-[8px] uppercase tracking-[.12em] text-[color:var(--accent)]">En charge</span>
              </div>
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/[.07]">
                <div className="h-full w-[78%] bg-[color:var(--accent)]" />
              </div>
            </div>

            <div data-app-end className="absolute right-0 top-1/2 max-w-xs -translate-y-1/2 text-right opacity-0">
              <span className="text-[9px] uppercase tracking-[.15em] text-white/26">Pilotage en temps réel</span>
              <p className="mt-3 text-xl leading-tight tracking-[-.035em] text-white/84">
                Comprendre votre énergie devient aussi simple que regarder votre téléphone.
              </p>
              <div className="mt-6 ml-auto h-px w-24 bg-gradient-to-l from-[color:var(--accent)] to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
