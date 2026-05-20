"use client";

import { useEffect, useState } from "react";

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0);
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return progress;
}
