import { useEffect, useRef, useState } from "react";

/* ============================================================
   Custom Cursor
   ============================================================ */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x, ry = y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    };
    const loop = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor='hover']")) document.body.classList.add("cursor-hover");
      else document.body.classList.remove("cursor-hover");
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}

/* ============================================================
   Reveal
   ============================================================ */
export function Reveal({
  children, className = "", variant = "up", delay = 0, as: Tag = "div",
}: {
  children: React.ReactNode; className?: string;
  variant?: "up" | "zoom"; delay?: number; as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add("in-view"), delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  const base = variant === "zoom" ? "reveal-zoom" : "reveal";
  // @ts-expect-error dynamic tag
  return <Tag ref={ref} className={`${base} ${className}`}>{children}</Tag>;
}

/* ============================================================
   Ambient particle field (subtle background)
   ============================================================ */
export function ParticleField({ density = 14000 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let w = 0, h = 0;
    let mx = -9999, my = -9999;
    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    let parts: P[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.floor((w * h) / density);
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.4 + 0.4,
        a: Math.random() * 0.5 + 0.25,
      }));
    };
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left; my = e.clientY - rect.top;
    };
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        const dx = p.x - mx, dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < 12000) {
          const f = (12000 - d2) / 12000;
          p.vx += (dx / Math.sqrt(d2 + 0.01)) * 0.03 * f;
          p.vy += (dy / Math.sqrt(d2 + 0.01)) * 0.03 * f;
        }
        p.vx *= 0.98; p.vy *= 0.98;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 7);
        g.addColorStop(0, `oklch(0.9 0.09 90 / ${p.a})`);
        g.addColorStop(1, `oklch(0.9 0.09 90 / 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 7, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    resize(); tick();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [density]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden />;
}

/* ============================================================
   Skill Ring (purple/blue gradient like reference)
   ============================================================ */
export function SkillRing({
  label, value, accentFrom = "#8B7BFF", accentTo = "#3EA0FF", brandChildren,
}: {
  label: string; value: number;
  accentFrom?: string; accentTo?: string;
  brandChildren: React.ReactNode;
}) {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const R = 62;
  const C = 2 * Math.PI * R;
  const idFrom = `${label.replace(/\s+/g, "")}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { setProgress(value); io.unobserve(el); }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  const offset = C - (progress / 100) * C;

  return (
    <div ref={ref} className="flex flex-col items-center gap-4">
      <div className="relative w-36 h-36 skill-ring">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
          <defs>
            <linearGradient id={`grad-${idFrom}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={accentFrom} />
              <stop offset="100%" stopColor={accentTo} />
            </linearGradient>
          </defs>
          <circle cx="80" cy="80" r={R} stroke="oklch(1 0 0 / 0.08)" strokeWidth="6" fill="none" />
          <circle
            cx="80" cy="80" r={R}
            stroke={`url(#grad-${idFrom})`} strokeWidth="6" fill="none"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={offset}
            style={{ filter: `drop-shadow(0 0 10px ${accentFrom}80)` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="font-display text-3xl font-medium tabular-nums tracking-tight">
            <CountUp target={progress} />%
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 flex items-center justify-center shrink-0">{brandChildren}</div>
        <div className="text-sm text-muted-foreground font-display tracking-wide">{label}</div>
      </div>
    </div>
  );
}

function CountUp({ target }: { target: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (target === 0) return;
    const start = performance.now();
    const dur = 1800;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return <>{n}</>;
}

/* ============================================================
   Magnetic wrapper
   ============================================================ */
export function Magnetic({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = innerRef.current, parent = outerRef.current;
    if (!el || !parent) return;
    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    };
    const onLeave = () => { el.style.transform = ""; };
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return (
    <div ref={outerRef} className={`inline-block ${className}`}>
      <div ref={innerRef} className="inline-block transition-transform duration-300 ease-out">{children}</div>
    </div>
  );
}
