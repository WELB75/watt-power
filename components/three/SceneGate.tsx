"use client";

import type { ReactNode } from "react";
import { Component, useEffect, useRef, useState } from "react";

class SceneErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("[Watt Power 3D] Scene failed:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <SceneFallback />;
    }

    return this.props.children;
  }
}

function SceneFallback() {
  return (
    <div className="h-full w-full bg-[radial-gradient(circle_at_62%_44%,rgba(217,255,90,.08),transparent_30%),linear-gradient(145deg,#0d110e,#060806)]" />
  );
}

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) ||
      canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true });

    return Boolean(gl);
  } catch {
    return false;
  }
}

export function SceneGate({
  children,
  rootMargin = "60% 0px",
}: {
  children: ReactNode;
  rootMargin?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [webglReady, setWebglReady] = useState<boolean | null>(null);

  useEffect(() => {
    setWebglReady(canUseWebGL());
  }, []);

  useEffect(() => {
    const element = host.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setNearViewport(entry.isIntersecting),
      { rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);

  const shouldRender = webglReady === true && nearViewport;

  return (
    <div ref={host} className="h-full w-full">
      {shouldRender ? (
        <SceneErrorBoundary fallback={<SceneFallback />}>{children}</SceneErrorBoundary>
      ) : (
        <SceneFallback />
      )}
    </div>
  );
}
