import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  CustomCursor,
  Reveal,
  ParticleField,
  SkillRing,
  Magnetic,
} from "@/components/portfolio-primitives";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Shirt,
  TrendingUp,
  Scissors,
  PenTool,
  User,
  Calendar,
  MapPin,
  Heart,
  Quote,
} from "lucide-react";
import heroFlower from "@/assets/hero-flower.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

/* ------------------------------------------------------------
   BRAND MARKS
------------------------------------------------------------ */
const AdobeMark = ({ label, bg, fg }: { label: string; bg: string; fg: string }) => (
  <div
    className="w-6 h-6 rounded-[4px] flex items-center justify-center font-display text-[10px] font-bold"
    style={{ background: bg, color: fg }}
  >
    {label}
  </div>
);
const PrMark = () => <AdobeMark label="Pr" bg="#2A0A4A" fg="#B490FF" />;
const PsMark = () => <AdobeMark label="Ps" bg="#001E36" fg="#31A8FF" />;
const AeMark = () => <AdobeMark label="Ae" bg="#2A0A4A" fg="#B490FF" />;

const YouTubeMark = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden>
    <rect width="24" height="24" rx="6" fill="#FF0000" />
    <path d="M10 8.5 16 12l-6 3.5v-7Z" fill="#fff" />
  </svg>
);
const InstagramMark = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden>
    <defs>
      <linearGradient id="igg" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#F58529" />
        <stop offset="45%" stopColor="#DD2A7B" />
        <stop offset="100%" stopColor="#8134AF" />
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="6" fill="url(#igg)" />
    <rect x="5.5" y="5.5" width="13" height="13" rx="4" fill="none" stroke="#fff" strokeWidth="1.6" />
    <circle cx="12" cy="12" r="3.2" fill="none" stroke="#fff" strokeWidth="1.6" />
    <circle cx="16.3" cy="7.7" r="0.9" fill="#fff" />
  </svg>
);
const TikTokMark = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden>
    <rect width="24" height="24" rx="6" fill="#000" />
    <path
      d="M15.3 5.5c.3 1.4 1.2 2.5 2.7 2.7v2.1a5.3 5.3 0 0 1-2.9-.9v4.7a4.4 4.4 0 1 1-4.5-4.4l.5.02v2.2a2.3 2.3 0 1 0 1.9 2.24V5.5h2.3Z"
      fill="#fff"
    />
    <path d="M13.4 5.5h2.3v.35a3.6 3.6 0 0 0 2.7 3.53" fill="none" />
  </svg>
);

/* Logo mark "DP" */
const LogoMark = ({ className = "" }: { className?: string }) => (
  <div className={`inline-flex items-center gap-2 ${className}`}>
    <svg viewBox="0 0 40 40" className="w-8 h-8">
      <defs>
        <linearGradient id="lm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A8C3A1" />
          <stop offset="100%" stopColor="#2F5D50" />
        </linearGradient>
      </defs>
      <path
        d="M8 6h10c6 0 10 4 10 10s-4 10-10 10h-6v8H8V6Zm4 4v12h5c3.5 0 6-2.5 6-6s-2.5-6-6-6h-5Z"
        fill="url(#lm)"
      />
    </svg>
  </div>
);

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-clip">
      <CustomCursor />
      <AmbientBackdrop />
      <ScrollFlora />
      <Nav />
      <Hero />

      <main className="relative mx-auto max-w-6xl px-5 md:px-8 space-y-6 md:space-y-8 pb-24">
        <AboutCard />
        <SkillsCard />
        <StrengthsRow />
        <TriRow />
        <Connections />
      </main>
      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------
   AMBIENT BACKDROP (subtle glow behind everything)
------------------------------------------------------------ */
function AmbientBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.30 0.05 155 / 0.55), transparent 60%), radial-gradient(ellipse 60% 40% at 90% 80%, oklch(0.48 0.055 160 / 0.25), transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.9'/></svg>\")",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------
   SCROLL FLORA — flower extends & drifts through the whole page
------------------------------------------------------------ */
function ScrollFlora() {
  const [p, setP] = useState(0); // 0 → 1 scroll progress
  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setP(Math.min(1, window.scrollY / max));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Three layered flower "petals" — different parallax speeds, hues, blurs
  const layers = [
    { top: "8%",   right: "-14%", size: 780, blur: 0,  opacity: 0.55, speedY: -160, speedR: 18,  hue: 0 },
    { top: "45%",  right: "-28%", size: 900, blur: 6,  opacity: 0.30, speedY:  220, speedR: -24, hue: -10 },
    { top: "78%",  right: "20%",  size: 620, blur: 14, opacity: 0.22, speedY: -280, speedR: 32,  hue: 20 },
    { top: "115%", right: "-10%", size: 820, blur: 4,  opacity: 0.38, speedY: -360, speedR: -14, hue: -6 },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden" aria-hidden>
      {layers.map((l, i) => (
        <div
          key={i}
          className="absolute will-change-transform"
          style={{
            top: l.top,
            right: l.right,
            width: l.size,
            height: l.size,
            transform: `translate3d(0, ${p * l.speedY}px, 0) rotate(${p * l.speedR}deg) scale(${1 + p * 0.12})`,
            filter: `blur(${l.blur}px) saturate(0.85) contrast(1.05) hue-rotate(${l.hue}deg)`,
            opacity: l.opacity,
            transition: "transform 0.15s linear",
          }}
        >
          <img
            src={heroFlower}
            alt=""
            className="w-full h-full object-cover animate-float-slow"
            style={{
              maskImage:
                "radial-gradient(ellipse 65% 70% at 50% 50%, #000 55%, transparent 85%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 65% 70% at 50% 50%, #000 55%, transparent 85%)",
            }}
          />
        </div>
      ))}

      {/* Vignette that deepens as we scroll for readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 30% 40%, transparent 40%, oklch(0.16 0.012 155 / 0.85) 90%)",
          opacity: 0.55 + p * 0.35,
          transition: "opacity 0.2s linear",
        }}
      />

      {/* Traveling forest glow */}
      <div
        className="absolute left-1/2 w-[80vw] h-[80vw] rounded-full blur-3xl"
        style={{
          top: `${20 + p * 60}%`,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, oklch(0.48 0.055 160 / 0.35), transparent 65%)",
          opacity: 0.35 + p * 0.25,
          transition: "top 0.2s linear, opacity 0.2s linear",
        }}
      />
    </div>
  );
}


/* ------------------------------------------------------------
   NAV
------------------------------------------------------------ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 30);
    s();
    window.addEventListener("scroll", s, { passive: true });
    return () => window.removeEventListener("scroll", s);
  }, []);
  const links = [
    ["Home", "#top"],
    ["About", "#about"],
    ["Skills", "#skills"],
    ["Vision", "#vision"],
    ["Thinking", "#thinking"],
    ["Connect", "#connect"],
  ] as const;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}
    >
      <div
        className={`mx-auto max-w-6xl px-5 md:px-8 flex items-center justify-between gap-6 transition-all duration-500 ${
          scrolled ? "glass-strong rounded-full py-2.5 md:px-4" : ""
        }`}
      >
        <a href="#top" aria-label="Home" data-cursor="hover">
          <LogoMark />
        </a>
        <nav className="hidden lg:flex items-center gap-8 text-xs tracking-[0.2em] uppercase font-display text-muted-foreground">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="hover:text-foreground transition-colors relative group">
              {label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-sage transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <a
          href="#connect"
          data-cursor="hover"
          className="glass rounded-full px-4 md:px-5 py-2 text-xs tracking-[0.2em] uppercase font-display flex items-center gap-2 hover:border-sage/50 transition-colors"
        >
          Let's Connect
          <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse-glow" />
        </a>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------
   HERO
------------------------------------------------------------ */
function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Flower — desktop right side; mobile behind */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[62%] pointer-events-none">
        <div className="relative h-full w-full">
          <img
            src={heroFlower}
            alt=""
            aria-hidden
            width={1024}
            height={1600}
            className="absolute inset-0 w-full h-full object-cover object-center md:object-right animate-float-slow will-change-transform"
            style={{ filter: "saturate(0.85) contrast(1.05)" }}
          />
          {/* Fade to background on left edge */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, #0B0F0C 0%, #0B0F0C 10%, transparent 55%, transparent 100%), linear-gradient(to bottom, transparent 60%, #0B0F0C 100%)",
            }}
          />
          {/* mobile darken */}
          <div className="absolute inset-0 md:hidden bg-background/70" />
        </div>
      </div>

      {/* Subtle particles */}
      <div className="absolute inset-0 pointer-events-none opacity-70">
        <ParticleField density={22000} />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-5 md:px-8 w-full pt-28 pb-16 md:pt-32">
        <div className="max-w-xl">
          <Reveal delay={80}>
            <div className="text-sage font-display text-sm md:text-base tracking-wide mb-3 md:mb-4 italic">
              Hey, I'm
            </div>
          </Reveal>

          <Reveal delay={160}>
            <h1 className="font-display font-medium leading-[0.95] tracking-[-0.02em] text-[clamp(2.75rem,8vw,6.5rem)]">
              Danith <span className="text-gradient-sage">Perera</span>
            </h1>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-4 md:mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sage font-display text-[11px] md:text-xs tracking-[0.3em] uppercase">
              <span>Creator</span>
              <span className="w-1 h-1 rounded-full bg-sage/70" />
              <span>Strategist</span>
              <span className="w-1 h-1 rounded-full bg-sage/70" />
              <span>Dreamer</span>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <blockquote className="mt-8 md:mt-10 pl-4 border-l border-sage/40 text-foreground/85 text-base md:text-lg italic leading-relaxed max-w-md">
              Turning ideas into reality — and building a brand that lasts.
            </blockquote>
          </Reveal>

          <Reveal delay={520}>
            <div className="mt-10">
              <Magnetic>
                <a href="#about" className="btn-outline group" data-cursor="hover">
                  Explore More
                  <ArrowDown className="w-4 h-4 transition-transform duration-500 group-hover:translate-y-1" />
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-3 text-[10px] tracking-[0.35em] uppercase text-muted-foreground/80 font-display [writing-mode:vertical-rl]">
        <span className="w-px h-16 bg-gradient-to-b from-transparent to-sage/60" />
        <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse-glow" />
        Scroll
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   ABOUT CARD
------------------------------------------------------------ */
function AboutCard() {
  return (
    <Reveal>
      <section id="about" className="glass-card p-6 md:p-10">
        <SectionKicker>About Me</SectionKicker>
        <h2 className="font-display text-3xl md:text-5xl font-medium mt-3 tracking-tight">
          Who I Am<span className="text-sage">.</span>
        </h2>

        <div className="mt-8 md:mt-10 grid md:grid-cols-[minmax(220px,260px)_1fr] gap-6 md:gap-12">
          <ul className="space-y-4">
            <InfoRow icon={<User className="w-4 h-4" />} label="Name" value="Danith Perera" />
            <InfoRow icon={<Calendar className="w-4 h-4" />} label="Age" value="16" />
            <InfoRow icon={<MapPin className="w-4 h-4" />} label="Location" value="Colombo, Sri Lanka" />
          </ul>

          <div className="space-y-4 text-muted-foreground leading-relaxed md:text-[15px]">
            <p>
              <span className="text-foreground">I'm Danith Perera</span>, 16, from Colombo, Sri Lanka —
              a creative mind with a passion for building, designing, and turning ideas into impact.
            </p>
            <p>
              Also known as <span className="text-foreground">SadTerrorKING</span> — a name that
              represents my journey as a content creator, storyteller, and future brand builder.
            </p>
            <p>
              I believe in discipline, consistency, and always becoming a better version of myself.
              Great brands aren't built overnight — they're built through attention to detail and
              ideas that mean something.
            </p>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1 w-8 h-8 rounded-full glass flex items-center justify-center text-sage shrink-0">
        {icon}
      </span>
      <div>
        <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-display">{label}</div>
        <div className="text-foreground text-sm mt-0.5">{value}</div>
      </div>
    </li>
  );
}

/* ------------------------------------------------------------
   SKILLS CARD
------------------------------------------------------------ */
function SkillsCard() {
  return (
    <Reveal>
      <section id="skills" className="glass-card p-6 md:p-10">
        <SectionKicker>Skills In</SectionKicker>
        <div className="mt-10 md:mt-12 grid grid-cols-3 gap-4 md:gap-10 place-items-center">
          <SkillRing label="Premiere Pro" value={78} accentFrom="#8B7BFF" accentTo="#4A78FF" brandChildren={<PrMark />} />
          <SkillRing label="Photoshop" value={84} accentFrom="#4A78FF" accentTo="#31A8FF" brandChildren={<PsMark />} />
          <SkillRing label="After Effects" value={45} accentFrom="#8B7BFF" accentTo="#B490FF" brandChildren={<AeMark />} />
        </div>
      </section>
    </Reveal>
  );
}

/* ------------------------------------------------------------
   STRENGTHS ROW  (Marketing · Editing · Designing)
------------------------------------------------------------ */
const strengths = [
  {
    icon: TrendingUp,
    title: "Marketing",
    body: "I study trends, understand people, and create strategies that build real impact.",
  },
  {
    icon: Scissors,
    title: "Editing",
    body: "I turn raw clips into stories that connect and leave a mark.",
  },
  {
    icon: PenTool,
    title: "Designing",
    body: "I design with purpose, focusing on aesthetics and attention to detail.",
  },
];

function StrengthsRow() {
  return (
    <div className="grid md:grid-cols-3 gap-3 md:gap-6">
      {strengths.map((s, i) => (
        <Reveal key={s.title} delay={i * 100}>
          <article
            data-cursor="hover"
            className="glass-card p-6 md:p-7 h-full group hover:border-sage/30 hover:-translate-y-1 transition-all duration-500"
          >
            <div className="flex items-start gap-4">
              <span className="w-10 h-10 rounded-lg glass flex items-center justify-center text-sage shrink-0 group-hover:text-foreground transition-colors">
                <s.icon className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-display text-lg text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------
   TRI-ROW: Thinking · Ideas · Future Goal
------------------------------------------------------------ */
const drivers = [
  "Build a brand that inspires",
  "Create products people love",
  "Financial freedom",
  "Travel the world",
  "Leave a legacy",
];

function TriRow() {
  return (
    <div className="grid md:grid-cols-3 gap-3 md:gap-6">
      {/* Thinking */}
      <Reveal>
        <article id="thinking" className="glass-card p-6 md:p-8 h-full relative overflow-hidden">
          <SectionKicker>My Way of Thinking</SectionKicker>
          <Quote className="w-8 h-8 text-sage/40 mt-6" />
          <p className="mt-4 text-foreground/90 leading-relaxed italic">
            I don't chase trends, I build timeless ideas. I stay focused, learn constantly, and move
            in silence. Let my work do the talking.
          </p>
          <Quote className="w-8 h-8 text-sage/40 ml-auto mt-4 rotate-180" />
        </article>
      </Reveal>

      {/* Ideas That Drive Me */}
      <Reveal delay={100}>
        <article className="glass-card p-6 md:p-8 h-full">
          <SectionKicker>Ideas That Drive Me</SectionKicker>
          <ul className="mt-6 space-y-3">
            {drivers.map((d, i) => (
              <li key={d} className="flex items-center gap-3 text-sm" style={{ animationDelay: `${i * 80}ms` }}>
                <span className="w-5 h-5 rounded-full bg-sage/15 border border-sage/40 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-sage" strokeWidth={3} />
                </span>
                <span className="text-foreground/90">{d}</span>
              </li>
            ))}
          </ul>
        </article>
      </Reveal>

      {/* Future Goal */}
      <Reveal delay={200}>
        <article id="vision" className="glass-card p-6 md:p-8 h-full relative overflow-hidden">
          <div
            className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl opacity-40"
            style={{ background: "var(--gradient-forest)" }}
          />
          <SectionKicker>Future Goal</SectionKicker>
          <div className="mt-6 flex items-start gap-4">
            <span className="w-12 h-12 rounded-xl glass flex items-center justify-center text-sage shrink-0">
              <Shirt className="w-6 h-6" />
            </span>
            <div>
              <p className="text-foreground leading-relaxed">
                To build my own brand,{" "}
                <span className="text-gradient-sage">mainly in fashion and clothing</span> —
                something real, something timeless, like{" "}
                <span className="text-foreground font-medium">CARNAGE</span>.
              </p>
            </div>
          </div>
        </article>
      </Reveal>
    </div>
  );
}

/* ------------------------------------------------------------
   CONNECTIONS
------------------------------------------------------------ */
const socials = [
  { name: "YouTube", handle: "SadTerrorKING", url: "https://www.youtube.com/@SadTerrorKING", Mark: YouTubeMark, ring: "#FF0000" },
  { name: "Instagram", handle: "@danithpereraoffcial", url: "http://instagram.com/danithpereraoffcial", Mark: InstagramMark, ring: "#DD2A7B" },
  { name: "TikTok", handle: "@sadterrorking_", url: "https://www.tiktok.com/@sadterrorking_", Mark: TikTokMark, ring: "#25F4EE" },
];

function Connections() {
  return (
    <section id="connect">
      <Reveal>
        <div className="glass-card p-6 md:p-10">
          <SectionKicker>Connections</SectionKicker>
          <div className="mt-8 grid md:grid-cols-3 gap-3 md:gap-5">
            {socials.map((s, i) => (
              <Reveal key={s.name} delay={i * 100} variant="zoom">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="hover"
                  className="social-card group relative flex items-center gap-4 glass rounded-2xl p-4 md:p-5 overflow-hidden hover:-translate-y-1 transition-all duration-500"
                  style={{ ["--ring" as string]: s.ring } as React.CSSProperties}
                >
                  <span className="pointer-events-none absolute inset-0 rounded-2xl social-border" />
                  <div className="w-10 h-10 rounded-lg glass flex items-center justify-center shrink-0">
                    <s.Mark />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-display">{s.name}</div>
                    <div className="text-foreground truncate">{s.handle}</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-sage group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------
   FOOTER
------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="relative pt-16 pb-8 overflow-hidden">
      <div
        className="absolute inset-x-0 bottom-0 h-[70%] pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 100%, oklch(0.48 0.055 160 / 0.35), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="text-center">
            <Quote className="w-8 h-8 text-sage/50 inline-block" />
            <p className="mt-4 font-display text-lg md:text-2xl leading-relaxed tracking-wide">
              Progress over perfection.<br />
              Discipline over motivation.<br />
              Purpose over everything.
            </p>
            <div className="mt-6 font-signature text-lg text-sage italic">— Danith Perera</div>
          </div>
        </Reveal>

        <div className="mt-14 pt-6 border-t border-border/60 flex items-center justify-between gap-4 text-xs text-muted-foreground font-display">
          <LogoMark />
          <div className="flex items-center gap-2">
            <span>Built with passion</span>
            <Heart className="w-3.5 h-3.5 text-sage fill-sage" />
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------
   SMALL HELPERS
------------------------------------------------------------ */
function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-[10px] md:text-xs tracking-[0.35em] uppercase text-muted-foreground font-display">
      {children}
      <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse-glow" />
    </div>
  );
}
