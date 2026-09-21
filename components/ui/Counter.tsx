"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Counter({ value, suffix = "", decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { value: 0 };
    const tween = gsap.to(obj, {
      value,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: () => {
        el.textContent = `${obj.value.toFixed(decimals)}${suffix}`;
      },
    });
    return () => tween.kill();
  }, [value, suffix, decimals]);

  return <span ref={ref}>0{suffix}</span>;
}
