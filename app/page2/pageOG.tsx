"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
interface PackMember {
  name: string;
  trait: string;
  desc: string;
  src: string;
  offset?: number;
}

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────
const PACK: PackMember[] = [
  {
    name: "Daisy",
    trait: "The Adventurer",
    desc: "Give Daisy a mountain and she's home. She belongs with the family that plans hikes before vacations.",
    src: "/DaisyCampingGunison.jpg",
    offset: 0,
  },
  {
    name: "Ziba",
    trait: "The Free Spirit",
    desc: "Born to run. Born to explore. Ziba would be miserable on a couch — she needs a trail family who can keep up.",
    src: "/ZibaHeadShot-18.jpg",
    offset: -32,
  },
  {
    name: "Ranger",
    trait: "The Protector",
    desc: "Steady, loyal, watchful. Ranger needs a home where he has a job — and a family who earns his trust.",
    src: "/RangerGlasses.jpg",
    offset: 0,
  },
];

const STEPS = [
  {
    icon: "🧬",
    num: "01",
    title: "Tell Us Your World",
    desc: "Answer questions about your lifestyle, activity level, living space, family dynamic, and dog experience. No judgment — just honest data.",
    accent: "#E8873A",
  },
  {
    icon: "🤖",
    num: "02",
    title: "Our App Does the Work",
    desc: "Our model analyzes thousands of compatibility signals — energy levels, anxiety triggers, space needs — to surface dogs genuinely suited to your life.",
    accent: "#7A9E7E",
  },
  {
    icon: "🏡",
    num: "03",
    title: "Meet Your Match",
    desc: "Connect with shelters near you to meet your top matches in person. Less guesswork. Less heartbreak. More forever homes that actually stick.",
    accent: "#C4694B",
  },
];

const STATS = [
  { num: "6.3M", label: "companion animals enter U.S. shelters every year" },
  { num: "15%", label: "of adopted dogs are returned within six months" },
  { num: "1 in 5", label: "returned dogs rehomed more than once before age two" },
];

const TAGS = [
  "🏔️ Activity Matching",
  "🏠 Home Environment",
  "👨‍👩‍👧 Family Dynamics",
  "🧠 Dog Temperament",
  "📍 Local Shelters",
  "🔁 Reduced Returns",
];

const MARQUEE = [
  "Smarter Adoption",
  "Built with Love",
  "Every Dog Deserves a Forever Home",
  "Machine Learning for Good",
  "Reduce Returns. All Rescues.",
];

// ─────────────────────────────────────────────────────────────
// Scroll reveal hook
// ─────────────────────────────────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Email capture
// ─────────────────────────────────────────────────────────────
function EmailCapture({
  placeholder,
  buttonText,
  dark = false,
  onSuccess,
}: {
  placeholder: string;
  buttonText: string;
  dark?: boolean;
  onSuccess: () => void;
}) {
  const [email, setEmail] = useState("");
  const [btnHovered, setBtnHovered] = useState(false);

  function submit() {
    if (!email.trim() || !email.includes("@")) return;
    onSuccess();
  }

  return (
    <div className="email-capture-wrap" style={{
      display: "flex",
      borderRadius: 100,
      overflow: "hidden",
      background: dark ? "rgba(253,246,236,0.07)" : "#fff",
      border: dark ? "1px solid rgba(253,246,236,0.18)" : "none",
      boxShadow: dark
        ? "none"
        : "0 4px 40px rgba(61,43,31,0.12), 0 0 0 2px rgba(232,135,58,0.08)",
      width: "100%",
      maxWidth: 440,
    }}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder={placeholder}
        style={{
          flex: 1,
          minWidth: 0,
          padding: "15px 20px",
          border: "none",
          outline: "none",
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: 15,
          color: dark ? "#FDF6EC" : "#3D2B1F",
          background: "transparent",
        }}
      />
      <button
        onClick={submit}
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
        style={{
          background: btnHovered ? "#C4694B" : "#E8873A",
          color: "#fff",
          border: "none",
          padding: "15px 22px",
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: "0.3px",
          cursor: "pointer",
          borderRadius: "0 100px 100px 0",
          whiteSpace: "nowrap",
          transition: "background 0.2s",
          flexShrink: 0,
        }}
      >
        {buttonText}
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────
export default function FetchMyHeartPage() {
  const [heroSuccess, setHeroSuccess] = useState(false);
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);
  const [hoveredPack, setHoveredPack] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <>
      <style>{`
        /* ── Tokens ── */
        :root {
          --cream:       #FDF6EC;
          --warm-white:  #FFFBF5;
          --bark:        #3D2B1F;
          --bark-light:  #6B4A36;
          --amber:       #E8873A;
          --amber-glow:  #F5A85C;
          --sage:        #7A9E7E;
          --clay:        #C4694B;
          --mist:        #EDE5DA;
          --ink:         #1E1409;
        }

        /* ── Reset ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: var(--cream);
          color: var(--bark);
          font-family: var(--font-dm-sans), sans-serif;
          overflow-x: hidden;
        }

        /* ── Grain overlay ── */
        body::before {
          content: '';
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 9999;
          opacity: 0.28;
        }

        /* ── Animations ── */
        @keyframes drift1 {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(-40px,40px) scale(1.1); }
        }
        @keyframes drift2 {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(30px,-30px) scale(1.08); }
        }
        @keyframes pawFloat {
          from { transform: translateY(0) rotate(-4deg); }
          to   { transform: translateY(-14px) rotate(4deg); }
        }
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes successPop {
          0%   { opacity: 0; transform: scale(0.95) translateY(8px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* ── Hero entrance ── */
        .hero-eyebrow   { animation: fadeUp 0.7s 0.1s both; }
        .hero-headline  { animation: fadeUp 0.8s 0.3s both; }
        .hero-valueprop { animation: fadeUp 0.8s 0.5s both; }
        .hero-body      { animation: fadeUp 0.8s 0.65s both; }
        .hero-cta-row   { animation: fadeUp 0.8s 0.8s both; }
        .success-msg    { animation: successPop 0.5s both; }

        input[type="email"]::placeholder { color: #B8A090; }

        /* ── Layout helpers ── */
        .section-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
        }
        .section-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--amber);
          display: block;
          margin-bottom: 18px;
        }
        .section-heading {
          font-family: var(--font-playfair), serif;
          font-size: clamp(32px, 4vw, 56px);
          font-weight: 900;
          color: var(--bark);
          line-height: 1.05;
          max-width: 680px;
          margin-bottom: 18px;
        }
        .section-body {
          font-size: 17px;
          font-weight: 300;
          color: var(--bark-light);
          line-height: 1.75;
          max-width: 560px;
          margin-bottom: 56px;
        }

        /* ── Steps grid ── */
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        /* ── Pack grid ── */
        .pack-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          align-items: start;
        }
        .pack-card-offset {
          transform: translateY(-32px);
        }

        /* ── Mission grid ── */
        .mission-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        /* ── Stats grid ── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }
        .stat-cell {
          padding: 20px 36px;
          border-right: 1px solid rgba(253,246,236,0.1);
        }
        .stat-cell:last-child { border-right: none; }

        /* ── Footer ── */
        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }
        .footer-links {
          display: flex;
          gap: 28px;
        }

        /* ══════════════════════════════════════
           TABLET  ≤ 900px
        ══════════════════════════════════════ */
        @media (max-width: 900px) {
          .steps-grid {
            grid-template-columns: 1fr 1fr;
          }
          .pack-grid {
            grid-template-columns: 1fr 1fr;
          }
          .pack-card-offset {
            transform: none;
          }
          .mission-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }
          .stat-cell:nth-child(2) {
            border-right: none;
          }
          .stat-cell:nth-child(3) {
            border-right: none;
            border-top: 1px solid rgba(253,246,236,0.1);
            grid-column: 1 / -1;
          }
        }

        /* ══════════════════════════════════════
           MOBILE  ≤ 640px
        ══════════════════════════════════════ */
        @media (max-width: 640px) {
          .section-inner {
            padding: 0 20px;
          }
          .section-body {
            font-size: 15px;
            margin-bottom: 40px;
          }
          .steps-grid {
            grid-template-columns: 1fr;
          }
          .pack-grid {
            grid-template-columns: 1fr;
          }
          .stats-grid {
            grid-template-columns: 1fr;
          }
          .stat-cell {
            border-right: none !important;
            border-top: none;
            border-bottom: 1px solid rgba(253,246,236,0.1);
            padding: 20px 0;
          }
          .stat-cell:last-child {
            border-bottom: none;
          }
          .footer-inner {
            flex-direction: column;
            align-items: flex-start;
          }
          .footer-links {
            flex-wrap: wrap;
            gap: 16px;
          }
          /* Stack email form on very small screens */
          .email-capture-wrap {
            flex-direction: column !important;
            border-radius: 16px !important;
            max-width: 100% !important;
          }
          .email-capture-wrap input {
            border-radius: 16px 16px 0 0 !important;
          }
          .email-capture-wrap button {
            border-radius: 0 0 16px 16px !important;
            padding: 14px 20px !important;
            text-align: center;
          }
        }
      `}</style>

      {/* ════════════════════════════════════════════
          NAV
      ════════════════════════════════════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "linear-gradient(to bottom, rgba(253,246,236,0.97), transparent)",
      }}>
        <div style={{
          padding: "clamp(16px, 2vw, 22px) clamp(20px, 4vw, 48px)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(18px, 2.5vw, 22px)",
            fontWeight: 700, color: "var(--bark)",
          }}>
            Fetch<span style={{ color: "var(--amber)" }}>My</span>Heart
          </span>
          <span style={{
            fontSize: 11, fontWeight: 500, letterSpacing: "2.5px",
            textTransform: "uppercase", color: "var(--bark-light)",
            background: "var(--mist)", padding: "6px 14px", borderRadius: 100,
            whiteSpace: "nowrap",
          }}>
            Coming Soon
          </span>
        </div>
      </nav>

      {/* ════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════ */}
      <section
        aria-label="Hero"
        style={{
          minHeight: "100dvh",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "clamp(100px, 15vw, 140px) clamp(20px, 5vw, 48px) clamp(60px, 8vw, 80px)",
          position: "relative", overflow: "hidden",
        }}
      >
        {/* Ambient blobs — hidden on mobile for perf */}
        <div aria-hidden="true" style={{
          position: "absolute", width: "min(700px, 100vw)", height: "min(700px, 100vw)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,135,58,0.13) 0%, transparent 70%)",
          top: -120, right: "-10%", pointerEvents: "none",
          animation: "drift1 14s ease-in-out infinite alternate",
        }} />
        <div aria-hidden="true" style={{
          position: "absolute", width: "min(520px, 80vw)", height: "min(520px, 80vw)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(122,158,126,0.1) 0%, transparent 70%)",
          bottom: -80, left: -80, pointerEvents: "none",
          animation: "drift2 16s ease-in-out infinite alternate",
        }} />

        {/* Floating paws — desktop only */}
        {[
          { top: "18%", right: "8%",  delay: "0s",   size: 30 },
          { top: "62%", right: "22%", delay: "2.5s", size: 26 },
          { top: "38%", right: "38%", delay: "5s",   size: 16 },
        ].map((p, i) => (
          <span key={i} aria-hidden="true" style={{
            position: "absolute", top: p.top, right: p.right,
            fontSize: p.size, opacity: 0.07, pointerEvents: "none",
            animation: `pawFloat 8s ${p.delay} ease-in-out infinite alternate`,
          }}>🐾</span>
        ))}

        {/* Eyebrow */}
        <p className="hero-eyebrow" style={{
          fontSize: 11, fontWeight: 500, letterSpacing: "3px",
          textTransform: "uppercase", color: "var(--amber)", marginBottom: 20,
        }}>
          ML Powered Dog Adoption
        </p>

        {/* Headline */}
        <h1 className="hero-headline" style={{
          fontFamily: "var(--font-playfair), serif",
          fontSize: "clamp(44px, 8vw, 106px)",
          fontWeight: 900, lineHeight: 0.95,
          color: "var(--bark)", maxWidth: 900,
        }}>
          Every tail<br />
          tells a{" "}
          <em style={{ fontStyle: "italic", color: "var(--amber)" }}>story.</em>
        </h1>

        {/* ★ VALUE PROP — the line that earned the subheadline spot ★ */}
        <p className="hero-valueprop" style={{
          fontFamily: "var(--font-playfair), serif",
          fontSize: "clamp(16px, 2vw, 24px)",
          fontWeight: 400, fontStyle: "italic",
          color: "var(--bark-light)", lineHeight: 1.4,
          marginTop: 20, marginBottom: 14, maxWidth: 640,
        }}>
          &ldquo;The return is a failure of data — not a failure of the dog.&rdquo;
        </p>

        {/* Body copy */}
        <p className="hero-body" style={{
          fontSize: "clamp(14px, 1.5vw, 17px)",
          fontWeight: 300, color: "var(--bark-light)",
          lineHeight: 1.75, maxWidth: 520, marginBottom: 40,
        }}>
          We use machine learning to match dogs with individuals, couples, and
          families — based on lifestyle, energy, and home environment.
          The right dog. The right home.{" "}
          <strong style={{ fontWeight: 500 }}>The first time.</strong>
        </p>

        {/* CTA */}
        <div className="hero-cta-row" style={{
          display: "flex", alignItems: "center",
          gap: "clamp(12px, 3vw, 24px)", flexWrap: "wrap",
        }}>
          {heroSuccess ? (
            <p className="success-msg" style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(16px, 2vw, 20px)",
              fontStyle: "italic", color: "var(--amber)",
            }}>
              🐾 You&apos;re on the list — we&apos;ll fetch you when we&apos;re ready.
            </p>
          ) : (
            <>
              <EmailCapture
                placeholder="your@email.com"
                buttonText="Join Waitlist"
                onSuccess={() => setHeroSuccess(true)}
              />
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                fontSize: 13, color: "var(--bark-light)",
              }}>
                <div style={{ display: "flex" }}>
                  {["🐶", "🐕", "🦮"].map((e, i) => (
                    <span key={i} style={{
                      width: 30, height: 30, borderRadius: "50%",
                      border: "2px solid var(--cream)",
                      background: "var(--mist)",
                      marginLeft: i === 0 ? 0 : -8,
                      display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: 13,
                    }}>{e}</span>
                  ))}
                </div>
                <span>1,200+ future adopters waiting</span>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          STATS STRIP
      ════════════════════════════════════════════ */}
      <div
        role="region"
        aria-label="Adoption statistics"
        style={{
          background: "var(--bark)",
          padding: "clamp(32px, 5vw, 44px) clamp(20px, 5vw, 48px)",
          position: "relative", overflow: "hidden",
        }}
      >
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 50% 50%, rgba(232,135,58,0.13) 0%, transparent 70%)",
        }} />
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 110} className="stat-cell">
              <div style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(32px, 4vw, 54px)",
                fontWeight: 900, color: "var(--amber-glow)",
                lineHeight: 1, marginBottom: 8,
              }}>{s.num}</div>
              <div style={{
                fontSize: 13, color: "rgba(253,246,236,0.6)",
                lineHeight: 1.55, maxWidth: 210,
              }}>{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════
          MARQUEE
      ════════════════════════════════════════════ */}
      <div aria-hidden="true" style={{
        background: "var(--amber)",
        padding: "15px 0", overflow: "hidden", display: "flex",
      }}>
        <div style={{
          display: "flex", whiteSpace: "nowrap",
          animation: "marqueeScroll 22s linear infinite",
        }}>
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: 15, fontWeight: 700, fontStyle: "italic",
              color: "#fff", padding: "0 32px",
              display: "inline-flex", alignItems: "center", gap: 16,
            }}>
              {item}
              <span style={{ opacity: 0.4, fontStyle: "normal" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════════ */}
      <section
        aria-label="How FetchMyHeart works"
        style={{ padding: "clamp(72px, 10vw, 110px) 0" }}
      >
        <div className="section-inner">
          <Reveal><span className="section-label">How It Works</span></Reveal>
          <Reveal delay={80}>
            <h2 className="section-heading">
              Smarter matching.<br />
              <em style={{ fontStyle: "italic", color: "var(--clay)" }}>Happier homes.</em>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="section-body">
              We go beyond breed labels. Our engine looks at your actual life —
              your schedule, your energy, your space — and finds the dog who fits
              it naturally. Like they were always meant to be yours.
            </p>
          </Reveal>

          <div className="steps-grid">
            {STEPS.map((step, i) => (
              <Reveal key={i} delay={i * 120}>
                <div
                  onMouseEnter={() => setHoveredStep(i)}
                  onMouseLeave={() => setHoveredStep(null)}
                  style={{
                    background: "#fff",
                    borderRadius: 24, padding: "36px 28px",
                    position: "relative", overflow: "hidden",
                    boxShadow: hoveredStep === i
                      ? "0 20px 60px rgba(61,43,31,0.13)"
                      : "0 2px 20px rgba(61,43,31,0.06)",
                    transform: hoveredStep === i ? "translateY(-6px)" : "none",
                    transition: "box-shadow 0.3s, transform 0.3s",
                  }}
                >
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 4,
                    background: step.accent,
                  }} />
                  <span style={{ fontSize: 32, display: "block", marginBottom: 16 }}>
                    {step.icon}
                  </span>
                  <div style={{
                    fontSize: 11, fontWeight: 500, letterSpacing: "2px",
                    textTransform: "uppercase", color: step.accent, marginBottom: 10,
                  }}>
                    Step {step.num}
                  </div>
                  <h3 style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: 20, fontWeight: 700,
                    color: "var(--bark)", marginBottom: 10,
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontSize: 14, fontWeight: 300,
                    color: "var(--bark-light)", lineHeight: 1.7,
                  }}>
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          THE PACK — real photos
      ════════════════════════════════════════════ */}
      <section
        aria-label="Meet the pack"
        style={{
          background: "var(--warm-white)",
          padding: "clamp(72px, 10vw, 110px) 0",
        }}
      >
        <div className="section-inner">
          <Reveal><span className="section-label">The Inspiration</span></Reveal>
          <Reveal delay={80}>
            <h2 className="section-heading">
              Meet the pack<br />
              <em style={{ fontStyle: "italic", color: "var(--clay)" }}>behind the mission.</em>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="section-body">
              FetchMyHeart was born from the personalities of three real dogs —
              Daisy, Ziba, and Ranger. They reminded us that every dog is an
              individual, not a breed label. They deserve a home that truly gets them.
            </p>
          </Reveal>

          <div className="pack-grid">
            {PACK.map((dog, i) => (
              <Reveal key={i} delay={i * 130}>
                <div
                  className={i === 1 ? "pack-card-offset" : ""}
                  onMouseEnter={() => setHoveredPack(i)}
                  onMouseLeave={() => setHoveredPack(null)}
                  onTouchStart={() => setHoveredPack(i)}
                  onTouchEnd={() => setHoveredPack(null)}
                  style={{
                    borderRadius: 24, overflow: "hidden",
                    position: "relative",
                    boxShadow: hoveredPack === i
                      ? "0 28px 70px rgba(61,43,31,0.18)"
                      : "0 4px 30px rgba(61,43,31,0.1)",
                    transition: "box-shadow 0.4s",
                  }}
                >
                  <div style={{
                    position: "relative",
                    aspectRatio: "3/4",
                    width: "100%",
                  }}>
                    <Image
                      src={dog.src}
                      alt={`${dog.name} — ${dog.trait}`}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
                      priority={i === 0}
                    />
                    {/* Gradient overlay — always visible, stronger on hover */}
                    <div style={{
                      position: "absolute", inset: 0,
                      background:
                        "linear-gradient(to top, rgba(30,20,9,0.9) 0%, rgba(30,20,9,0.2) 50%, transparent 100%)",
                      opacity: hoveredPack === i ? 1 : 0.8,
                      transition: "opacity 0.35s",
                    }} />
                    {/* Text */}
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0,
                      padding: "clamp(20px, 3vw, 28px)",
                    }}>
                      <div style={{
                        fontSize: 11, fontWeight: 500, letterSpacing: "2px",
                        textTransform: "uppercase", color: "var(--amber-glow)",
                        marginBottom: 6,
                      }}>
                        {dog.trait}
                      </div>
                      <div style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontSize: "clamp(22px, 3vw, 28px)",
                        fontWeight: 900, color: "#fff", marginBottom: 8,
                      }}>
                        {dog.name}
                      </div>
                      {/* Description — visible on hover/touch */}
                      <div style={{
                        fontSize: 13, color: "rgba(255,255,255,0.78)",
                        lineHeight: 1.55,
                        maxHeight: hoveredPack === i ? 100 : 0,
                        overflow: "hidden",
                        transition: "max-height 0.4s ease",
                      }}>
                        {dog.desc}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          MISSION
      ════════════════════════════════════════════ */}
      <section
        aria-label="Our mission"
        style={{ padding: "clamp(72px, 10vw, 110px) 0" }}
      >
        <div className="section-inner">
          <div className="mission-grid">
            {/* Left — big stat + Ziba headshot */}
            <Reveal>
              <div>
                <div style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "clamp(80px, 14vw, 160px)",
                  fontWeight: 900, color: "var(--mist)",
                  lineHeight: 1, position: "relative",
                  userSelect: "none",
                }}>
                  15%
                  <span style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: 12, fontWeight: 500,
                    letterSpacing: "1.5px", textTransform: "uppercase",
                    color: "var(--bark-light)", textAlign: "center",
                    width: 170, lineHeight: 1.6,
                  }}>
                    of dogs returned<br />within 6 months
                  </span>
                </div>

                {/* Ziba headshot */}
                {/* <div style={{
                  marginTop: 24, borderRadius: 20, overflow: "hidden",
                  position: "relative", aspectRatio: "16/9",
                }}>
                  <Image
                    src="/ZibaHeadShot-18.jpg"
                    alt="Ziba — the dog who inspired FetchMyHeart"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 900px) 100vw, 50vw"
                  />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(30,20,9,0.65), transparent)",
                  }} />
                  <p style={{
                    position: "absolute", bottom: 18, left: 22,
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: 14, fontStyle: "italic",
                    color: "rgba(255,255,255,0.82)",
                  }}>
                    Ziba — the dog who started it all.
                  </p>
                </div> */}
              </div>
            </Reveal>

            {/* Right — copy */}
            <Reveal delay={180}>
              <div>
                <span className="section-label">Our Mission</span>
                <h2 className="section-heading">
                  We&rsquo;re fixing<br />
                  adoption with{" "}
                  <em style={{ fontStyle: "italic", color: "var(--clay)" }}>data.</em>
                </h2>
                <p style={{
                  fontSize: "clamp(14px, 1.5vw, 16px)", fontWeight: 300,
                  color: "var(--bark-light)", lineHeight: 1.8, marginBottom: 16,
                }}>
                  Serial rehoming — a dog bouncing between multiple households before
                  their second birthday — isn&rsquo;t a behavior problem.
                  It&rsquo;s a matching problem.
                </p>
                <p style={{
                  fontSize: "clamp(14px, 1.5vw, 16px)", fontWeight: 300,
                  color: "var(--bark-light)", lineHeight: 1.8, marginBottom: 36,
                }}>
                  We&rsquo;re building an intelligent adoption platform that looks beyond
                  breed labels and focuses on real compatibility: lifestyle, activity level,
                  home environment, and experience.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {TAGS.map((tag, i) => (
                    <span key={i} style={{
                      fontSize: 13, fontWeight: 400,
                      padding: "8px 16px", borderRadius: 100,
                      background: "var(--mist)", color: "var(--bark)",
                      border: "1px solid rgba(61,43,31,0.07)",
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          WAITLIST CTA
      ════════════════════════════════════════════ */}
      <section
        aria-label="Join the waitlist"
        style={{
          background: "var(--bark)",
          padding: "clamp(72px, 10vw, 110px) clamp(20px, 5vw, 48px)",
          position: "relative", overflow: "hidden",
        }}
      >
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(232,135,58,0.14) 0%, transparent 65%)",
        }} />
        <div style={{
          maxWidth: 620, margin: "0 auto",
          textAlign: "center", position: "relative", zIndex: 2,
        }}>
          <Reveal>
            <span style={{
              fontSize: 11, fontWeight: 500, letterSpacing: "3px",
              textTransform: "uppercase", color: "var(--amber-glow)",
              display: "block", marginBottom: 18,
            }}>Be First in Line</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(32px, 4vw, 54px)",
              fontWeight: 900, color: "#FDF6EC",
              lineHeight: 1.05, marginBottom: 18,
            }}>
              Your dog is already<br />
              <em style={{ fontStyle: "italic", color: "var(--amber-glow)" }}>
                out there waiting.
              </em>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p style={{
              fontSize: "clamp(14px, 1.5vw, 16px)", fontWeight: 300,
              color: "rgba(253,246,236,0.6)",
              lineHeight: 1.75, marginBottom: 44,
            }}>
              We&rsquo;re launching soon. Get early access, help us shape the platform,
              and be part of a movement that changes how dogs find homes — forever.
            </p>
          </Reveal>
          <Reveal delay={240}>
            {waitlistSuccess ? (
              <p className="success-msg" style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(18px, 2vw, 22px)",
                fontStyle: "italic", color: "var(--amber-glow)",
              }}>
                🐾 Welcome to the pack. We&rsquo;ll be in touch soon.
              </p>
            ) : (
              <div style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", gap: 16,
              }}>
                <EmailCapture
                  placeholder="Drop your email — no spam, just paws"
                  buttonText="Count Me In"
                  dark
                  onSuccess={() => setWaitlistSuccess(true)}
                />
                <p style={{
                  fontSize: 12, color: "rgba(253,246,236,0.3)",
                  letterSpacing: "0.4px",
                }}>
                  No spam. No data selling. Just launch updates —
                  and maybe a good dog pic.
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════ */}
      <footer style={{
        padding: "clamp(28px, 4vw, 40px) clamp(20px, 5vw, 48px)",
        borderTop: "1px solid rgba(61,43,31,0.08)",
      }}>
        <div className="footer-inner">
          <span style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: 18, fontWeight: 700, color: "var(--bark)",
          }}>
            Fetch<span style={{ color: "var(--amber)" }}>My</span>Heart
          </span>
          <p style={{ fontSize: 12, color: "var(--bark-light)", opacity: 0.5 }}>
            © 2025 FetchMyHeart. Built with love for dogs everywhere.
          </p>
          <div className="footer-links">
            {[
              { label: "Contact", href: "mailto:hello@fetchmyheart.com" },
              { label: "Privacy", href: "#" },
              { label: "For Shelters", href: "#" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontSize: 12, textDecoration: "none",
                  color: "var(--bark-light)", opacity: 0.55,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.55")}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
