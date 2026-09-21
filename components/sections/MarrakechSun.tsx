"use client";

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
      gsap.fromTo("[data-sun-glow]", { opacity: .08, scale: .7 }, {
        opacity: .75,
        scale: 1.2,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.fromTo("[data-architecture]", { y: 120, opacity: .25 }, {
        y: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 75%", end: "center 30%", scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative min-h-[110vh] overflow-hidden border-t border-white/8">
      <div data-sun-glow className="absolute left-[55%] top-[24%] h-[42vw] w-[42vw] min-h-72 min-w-72 rounded-full bg-[radial-gradient(circle,rgba(244,239,194,.8)_0%,rgba(217,255,90,.16)_34%,transparent_70%)] blur-2xl" />
      <div className="container-wp relative grid min-h-[110vh] items-center gap-14 py-28 lg:grid-cols-[.9fr_1.1fr]">
        <div className="relative z-10">
          <span className="eyebrow">Marrakech / soleil</span>
          <AnimatedHeading className="mt-6"><h2 className="display-lg text-balance">Le soleil devient un système.</h2></AnimatedHeading>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/52">
            Watt Power transforme une ressource locale en énergie que vous pouvez produire, suivre et contrôler — sans masquer la technologie derrière de la complexité.
          </p>
          <div className="mt-10 w-fit rounded-full border border-white/10 bg-black/25 px-4 py-3 text-[10px] uppercase tracking-[.15em] text-white/42 backdrop-blur-lg">
            Potentiel solaire local — données vérifiées à intégrer
          </div>
        </div>

        <div data-architecture className="relative h-[55vh] min-h-[430px]">
          <div className="absolute inset-x-[2%] bottom-0 h-[54%] rounded-t-[2.8rem] border border-white/10 bg-[#101314] shadow-2xl" />
          <div className="absolute bottom-[14%] left-[12%] h-[46%] w-[40%] border border-white/10 bg-[#0c0f10]" />
          <div className="absolute bottom-[10%] right-[10%] h-[37%] w-[36%] bg-[#15191a]" />
          <div className="absolute bottom-[21%] left-[21%] h-[20%] w-[13%] bg-[linear-gradient(180deg,rgba(238,218,164,.22),rgba(238,218,164,.04))]" />
          <div className="absolute bottom-[18%] right-[17%] h-[17%] w-[11%] bg-[linear-gradient(180deg,rgba(238,218,164,.18),rgba(238,218,164,.03))]" />
          <div className="absolute bottom-[5%] left-[7%] h-[8%] w-[86%] border-t border-white/10" />
        </div>
      </div>
    </section>
  );
}
