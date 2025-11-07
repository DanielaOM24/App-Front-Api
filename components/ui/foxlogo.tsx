"use client";
import { useEffect, useRef } from "react";
import type { NextPage } from "next";
// @ts-ignore
import createMetamaskLogo from "@metamask/logo";

interface FoxlogoProp {
  className?: string;
}

const FoxLogo: NextPage<FoxlogoProp> = ({ className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const hasMounted = useRef(false); // ⚡ flag de inicialización

  useEffect(() => {
    if (hasMounted.current || !ref.current) return; // evita doble inicialización
    hasMounted.current = true;

    // ⚡ Limpiar canvas previo por si acaso
    const existingCanvas = ref.current.querySelector("canvas");
    if (existingCanvas) ref.current.removeChild(existingCanvas);

    const viewer = createMetamaskLogo({
      pxNotRatio: true,
      width: { className },
      height: { className },
      followMouse: true,
      slowDrift: false,
    });

    ref.current.appendChild(viewer.container);

    return () => {
      viewer.stopAnimation();
      if (ref.current && viewer.container.parentElement === ref.current) {
        ref.current.removeChild(viewer.container);
      }
    };
  }, []);

  return <div ref={ref} className={className} />;
};

export default FoxLogo;

