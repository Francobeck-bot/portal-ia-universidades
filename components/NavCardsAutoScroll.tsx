"use client";
import { useEffect } from "react";

export default function NavCardsAutoScroll() {
  useEffect(() => {
    const el = document.querySelector(".nav-cards-scroll") as HTMLElement | null;
    if (!el) return;

    const originals = Array.from(el.children) as HTMLElement[];

    // Largura total dos cards originais (antes de qualquer modificação)
    const cardsWidth = originals.reduce((sum, c) => sum + c.offsetWidth, 0);

    // Espaçador entre último original e primeiro clone.
    // Reproduz o separador visual normal entre cards:
    // border-left 1px (equivale ao borderRight do card) + 28px de conteúdo vazio
    // (equivale ao paddingLeft do próximo card) = 29px total.
    const spacer = document.createElement("div");
    spacer.style.cssText = "flex-shrink:0;width:29px;border-left:1px solid var(--hairline);box-sizing:border-box;";
    el.appendChild(spacer);

    // Clona todos os cards sem modificar nenhum estilo — ficam idênticos aos originais
    const clones = originals.map(child => {
      const clone = child.cloneNode(true) as HTMLElement;
      el.appendChild(clone);
      return clone;
    });

    // Ponto de reset: largura dos originais + espaçador
    const originalWidth = cardsWidth + spacer.offsetWidth;

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
        // Quando o clone-card-1 chega à mesma posição visual que o original-card-1,
        // reseta sem salto perceptível
        if (el!.scrollLeft >= originalWidth) {
          el!.scrollLeft -= originalWidth;
        }
      }
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      if (el.contains(spacer)) el.removeChild(spacer);
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
