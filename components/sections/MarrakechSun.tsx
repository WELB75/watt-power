"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";

gsap.registerPlugin(ScrollTrigger);

export function MarrakechSun() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo("[data-marrakech-photo]", { scale: 1.08, yPercent: 5 }, {
        scale: 1,
        yPercent: -3,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.from("[data-marrakech-stat]", {
        y: 24,
        opacity: 0,
        stagger: .09,
        duration: .7,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 58%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative min-h-[110vh] overflow-hidden bg-[#080a09]">
      <div className="absolute inset-y-0 right-0 w-full lg:w-[68%]">
        <Image fill sizes="(min-width: 1024px) 68vw, 100vw"
          data-marrakech-photo
          src="/assets/images/villa-aerial-v2.webp"
          alt="Illustration architecturale d’une villa contemporaine au pied de l’Atlas"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#080a09_0%,rgba(8,10,9,.98)_26%,rgba(8,10,9,.72)_48%,rgba(8,10,9,.15)_78%,rgba(8,10,9,.25)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#050706] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050706] to-transparent" />

      <div className="container-wp relative z-10 flex min-h-[110vh] items-center py-28">
        <div className="max-w-2xl">
          <span className="eyebrow !text-white/44">Marrakech / architecture / énergie</span>
          <AnimatedHeading className="mt-6">
            <h2 className="display-lg">Le solaire doit respecter la maison.</h2>
          </AnimatedHeading>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/55">
            Notre approche part de l&apos;architecture : orientation, esthétique de toiture, usages du logement et niveau d&apos;autonomie recherché.
          </p>

          <div className="mt-14 grid max-w-xl gap-px overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/10 sm:grid-cols-3">
            {[
              ["01", "Étude", "Dimensionnement sur mesure"],
              ["02", "Pose", "Intégration propre"],
              ["03", "Suivi", "Pilotage intelligent"],
            ].map(([n, title, copy]) => (
              <div data-marrakech-stat key={n} className="bg-[#080a09]/92 p-5 backdrop-blur-xl">
                <div className="text-[9px] text-[color:var(--accent)]">{n}</div>
                <div className="mt-4 text-lg tracking-[-.03em]">{title}</div>
                <div className="mt-2 text-xs leading-relaxed text-white/38">{copy}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
