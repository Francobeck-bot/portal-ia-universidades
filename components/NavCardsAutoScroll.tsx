"use client";
import { useEffect } from "react";

export default function NavCardsAutoScroll() {
  useEffect(() => {
    const el = document.querySelector(".nav-cards-scroll") as HTMLElement | null;
    if (!el) return;

    const originals = Array.from(el.children) as HTMLElement[];

    // Mede antes de qualquer mudança no DOM
    const originalWidth = originals.reduce((sum, c) => sum + c.offsetWidth, 0);

    // O último card não tem borderRight — adiciona para a costura ficar igual aos demais
    const last = originals[originals.length - 1];
    const prevBorder = last.style.borderRight;
    last.style.borderRight = "1px solid var(--hairline)";

    // Clona todos os cards e adiciona ao final
    const clones = originals.map((child, i) => {
      const clone = child.cloneNode(true) as HTMLElement;
      // O primeiro card tem paddingLeft:0 (compensa o padding do container).
      // No clone, ele aparece no meio do scroll — precisa de paddingLeft:28 como os demais.
      if (i === 0) clone.style.paddingLeft = "28px";
      el.appendChild(clone);
      return clone;
    });

    let paused = false;
    const onEnter = () => { paused = true; };
    const onLeave = () => { paused = false; };
    const onTouch = () => { paused = true; };
    const onTouchEnd = () => { setTimeout(() => { paused = false; }, 2500); };
    const onWheel = () => { paused = true; setTimeout(() => { paused = false; }, 2500); };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchstart", onTouch, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: true });

    let rafId: number;
    function tick() {
      if (!paused) {
        el!.scrollLeft += 0.5;
        // Quando o scroll chega ao início dos clones, volta para a posição
        // equivalente nos originais — visualmente idêntico, sem salto
        if (el!.scrollLeft >= originalWidth) {
          el!.scrollLeft -= originalWidth;
        }
      }
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      last.style.borderRight = prevBorder;
      clones.forEach(clone => { if (el.contains(clone)) el.removeChild(clone); });
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchstart", onTouch);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  return null;
}
