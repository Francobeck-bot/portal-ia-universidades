"use client";
import { useEffect } from "react";

export default function NavCardsAutoScroll() {
  useEffect(() => {
    const el = document.querySelector(".nav-cards-scroll") as HTMLElement | null;
    if (!el) return;

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
        if (el!.scrollLeft >= el!.scrollWidth - el!.clientWidth - 1) {
          el!.scrollLeft = 0;
        }
      }
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchstart", onTouch);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  return null;
}
