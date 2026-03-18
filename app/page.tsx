"use client";

// ─────────────────────────────────────────────────────────────
// THIS IS PAGE 2 VIEW
// Variant B · Dark hero
// File:  app/page1/page.tsx
// Route: localhost:3000/page1
//
// Differences from app/page.tsx (Variant A):
//   • Hero background is dark bark, text is cream
//   • Stats live inside the hero above the fold (no separate strip)
//   • Nav has dark gradient
//   • Everything else: copy, images, Formspree, identical
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface PackMember {
  name: string;
  trait: string;
  desc: string;
  src: string;
}

const PACK: PackMember[] = [
  {
    name: "Ziba",
    trait: "The One Who Started It All",
    desc: "My Labrador for 14.5 years. She taught us what a truly right match looks like when it has time to unfold, the kind of bond that shapes everything around it. She's the reason we know this kind of bond is possible. And why FetchMyHeart exists.",
    src: "/ZibaHeadShot-18.jpg",
  },
  {
    name: "Ranger",
    trait: "The Foster Who Proved the Problem",
    desc: "Ranger came to us as a foster and stayed three months. He met four families before the right one appeared. He taught us that a wrong match isn't about bad people. It's about missing the right information at the right moment.",
    src: "/RangerGlasses.jpg",
  },
  {
    name: "Daisy",
    trait: "The Foster Fail",
    desc: "Daisy was our 8th foster. We never planned to keep her. But some matches are just obvious, and she never left. She's living proof that when it's right, you just know.",
    src: "/DaisyCampingGunison.jpg",
  },
];

const HeartbeatPawIcon = () => (
  <svg width="44" height="34" viewBox="0 0 56 40" style={{ display: "block", overflow: "visible" }}>
    <line x1="2" y1="24" x2="10" y2="24" stroke="#7A9E7E" strokeWidth="2.2" strokeLinecap="round"/>
    <polyline
      points="10,24 14,24 17,12 20,32 23,18 26,24 30,24"
      fill="none" stroke="#7A9E7E" strokeWidth="2.2"
      strokeLinecap="round" strokeLinejoin="round"
    />
    <line x1="30" y1="24" x2="36" y2="24" stroke="#7A9E7E" strokeWidth="2.2" strokeLinecap="round"/>
    <ellipse cx="29" cy="26" rx="7" ry="6" fill="#7A9E7E"/>
    <ellipse cx="16" cy="15" rx="3.2" ry="2.8" fill="#7A9E7E"/>
    <ellipse cx="24" cy="11" rx="3.2" ry="2.8" fill="#7A9E7E"/>
    <ellipse cx="33" cy="11" rx="3.2" ry="2.8" fill="#7A9E7E"/>
    <ellipse cx="41" cy="15" rx="3.2" ry="2.8" fill="#7A9E7E"/>
  </svg>
);

const STEPS = [
  {
    icon: "🧬", num: "01", title: "Tell Us Your World",
    desc: "Answer questions about your lifestyle, activity level, living space, family dynamic, and experience with dogs. No judgment, just honest data.",
    accent: "#E8873A",
  },
  {
    icon: <HeartbeatPawIcon />, num: "02", title: "We Read Between the Leash",
    desc: "While a shelter runs a 15-minute meet-and-greet, our model is processing energy thresholds, reactivity triggers, living environment, and lifestyle patterns, building a picture of compatibility that holds up six months in, not just the first couple of days.",
    accent: "#7A9E7E",
  },
  {
    icon: "🏡", num: "03", title: "Meet Your Match",
    desc: "Connect with shelters near you to meet your top matches in person. Less guesswork. Less heartbreak. More forever homes that actually stick.",
    accent: "#C4694B",
  },
];

const STATS = [
  { num: "6.3M",   label: "companion animals enter U.S. shelters every year" },
  { num: "15%",    label: "of adopted dogs are returned within six months" },
  { num: "1 in 7", label: "returned dogs rehomed more than once before age two" },
];

const TAGS = [
  "🏔️ Activity Matching", "🏠 Home Environment", "👨‍👩‍👧 Family Dynamics",
  "🧠 Dog Temperament", "📍 Local Shelters", "🔁 Reduced Returns",
];

const MARQUEE = [
  "Smarter Adoption", "Built with Love", "Every Dog Deserves a Forever Home",
  "Machine Learning for Good", "Zero Returns. All Rescues.",
];

const FORMSPREE_URL = "https://formspree.io/f/mzdjjlkq";
type SubmitStatus = "idle" | "loading" | "success" | "error";

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

function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function EmailCapture({ placeholder, buttonText, dark = false, onSuccess }: {
  placeholder: string; buttonText: string; dark?: boolean; onSuccess: () => void;
}) {
  const [email, setEmail]           = useState("");
  const [status, setStatus]         = useState<SubmitStatus>("idle");
  const [btnHovered, setBtnHovered] = useState(false);
  const isLoading = status === "loading";
  const isError   = status === "error";

  async function submit() {
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      setStatus("error"); setTimeout(() => setStatus("idle"), 2000); return;
    }
    setStatus("loading");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      if (res.ok) { setStatus("success"); onSuccess(); }
      else        { setStatus("error"); setTimeout(() => setStatus("idle"), 3000); }
    } catch {
      setStatus("error"); setTimeout(() => setStatus("idle"), 3000);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", maxWidth: 460 }}>
      <div className="email-capture-wrap" style={{
        display: "flex", borderRadius: 100, overflow: "hidden",
        background: dark ? "rgba(253,246,236,0.07)" : "#fff",
        border: isError ? "1px solid rgba(196,105,75,0.7)"
          : dark ? "1px solid rgba(253,246,236,0.18)" : "none",
        boxShadow: dark ? "none"
          : isError ? "0 4px 40px rgba(196,105,75,0.15), 0 0 0 2px rgba(196,105,75,0.2)"
          : "0 4px 40px rgba(61,43,31,0.12), 0 0 0 2px rgba(232,135,58,0.08)",
        width: "100%", transition: "box-shadow 0.25s",
      }}>
        <input
          type="email" value={email}
          onChange={(e) => { setEmail(e.target.value); if (isError) setStatus("idle"); }}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder={placeholder} disabled={isLoading}
          style={{
            flex: 1, minWidth: 0, padding: "16px 24px",
            border: "none", outline: "none",
            fontFamily: "var(--font-dm-sans), sans-serif", fontSize: 17,
            color: dark ? "#FDF6EC" : "#3D2B1F",
            background: "transparent", opacity: isLoading ? 0.5 : 1, transition: "opacity 0.2s",
          }}
        />
        <button
          onClick={submit} disabled={isLoading}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            background: isError ? "#C4694B" : btnHovered && !isLoading ? "#C4694B" : "#E8873A",
            color: "#fff", border: "none", padding: "16px 30px",
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: 16, fontWeight: 500, letterSpacing: "0.3px",
            cursor: isLoading ? "not-allowed" : "pointer",
            borderRadius: "0 100px 100px 0", whiteSpace: "nowrap",
            transition: "background 0.2s, opacity 0.2s",
            flexShrink: 0, minWidth: 140,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            opacity: isLoading ? 0.75 : 1,
          }}
        >
          {isLoading ? (
            <><span style={{
              width: 14, height: 14,
              border: "2px solid rgba(255,255,255,0.35)", borderTopColor: "#fff",
              borderRadius: "50%", display: "inline-block",
              animation: "spin 0.7s linear infinite",
            }} />Sending…</>
          ) : isError ? "Try again" : buttonText}
        </button>
      </div>
      {isError && (
        <p style={{
          fontSize: 14, paddingLeft: 20,
          color: dark ? "rgba(245,168,92,0.85)" : "#C4694B",
          animation: "fadeUp 0.3s both",
        }}>Please enter a valid email address.</p>
      )}
    </div>
  );
}

export default function PageB() {
  const [heroSuccess,     setHeroSuccess]     = useState(false);
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);
  const [hoveredPack,     setHoveredPack]     = useState<number | null>(null);
  const [hoveredStep,     setHoveredStep]     = useState<number | null>(null);

  return (
    <>
      <style>{`
        :root {
          --cream:      #FDF6EC;
          --warm-white: #FFFBF5;
          --bark:       #3D2B1F;
          --bark-light: #6B4A36;
          --amber:      #E8873A;
          --amber-glow: #F5A85C;
          --sage:       #7A9E7E;
          --clay:       #C4694B;
          --mist:       #EDE5DA;
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: var(--cream); color: var(--bark);
          font-family: var(--font-dm-sans), sans-serif; overflow-x: hidden;
        }
        body::before {
          content: ''; position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 9999; opacity: 0.28;
        }

        @keyframes drift1      { from{transform:translate(0,0) scale(1)}     to{transform:translate(-40px,40px) scale(1.1)} }
        @keyframes drift2      { from{transform:translate(0,0) scale(1)}     to{transform:translate(30px,-30px) scale(1.08)} }
        @keyframes pawFloat    { from{transform:translateY(0) rotate(-4deg)} to{transform:translateY(-14px) rotate(4deg)} }
        @keyframes marqueeScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes fadeUp      { from{opacity:0;transform:translateY(22px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes successPop  { 0%{opacity:0;transform:scale(0.95) translateY(8px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes spin        { to{transform:rotate(360deg)} }

        .hero-eyebrow   { animation: fadeUp 0.7s 0.10s both; }
        .hero-headline  { animation: fadeUp 0.8s 0.30s both; }
        .hero-valueprop { animation: fadeUp 0.8s 0.50s both; }
        .hero-body      { animation: fadeUp 0.8s 0.65s both; }
        .hero-stats     { animation: fadeUp 0.8s 0.75s both; }
        .hero-cta-row   { animation: fadeUp 0.8s 0.90s both; }
        .success-msg    { animation: successPop 0.5s both; }

        input[type="email"]::placeholder { color: rgba(253,246,236,0.35); }

        /* ── Layout ── */
        .section-inner   { max-width: 1200px; margin: 0 auto; padding: 0 48px; }
        .section-label   { font-size: 16px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: var(--amber); display: block; margin-bottom: 24px; }
        .section-heading { font-family: var(--font-playfair), serif; font-size: clamp(48px, 6vw, 84px); font-weight: 900; color: var(--bark); line-height: 1.02; max-width: 820px; margin-bottom: 24px; }
        .section-body    { font-size: clamp(17px, 1.6vw, 22px); font-weight: 300; color: var(--bark-light); line-height: 1.8; max-width: 620px; margin-bottom: 60px; }

        .steps-grid      { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
        .pack-grid       { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; align-items: start; }
        .pack-card-offset { transform: translateY(-32px); }
        .mission-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }        .footer-inner    { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
        .footer-links    { display: flex; gap: 28px; }
        .founder-section { display: grid; grid-template-columns: 1fr 1fr; min-height: clamp(480px, 55vw, 720px); }

        /* ── Tablet ≤ 900px ── */
        @media (max-width: 900px) {
          .steps-grid        { grid-template-columns: 1fr 1fr; }
          .pack-grid         { grid-template-columns: 1fr 1fr; }
          .pack-card-offset  { transform: none; }
          .mission-grid      { grid-template-columns: 1fr; gap: 48px; }
          .hero-stats-grid   { grid-template-columns: 1fr 1fr !important; }
        }

        /* ── Tablet ≤ 768px ── */
        @media (max-width: 768px) {
          .founder-section { grid-template-columns: 1fr !important; }
          .founder-section > div:first-child { min-height: 320px; }
          .founder-photo-fade { background: linear-gradient(to bottom, transparent 50%, var(--cream) 100%) !important; }
        }

        /* ── Mobile ≤ 640px ── */
        @media (max-width: 640px) {
          .section-inner     { padding: 0 20px; }
          .section-body      { margin-bottom: 40px; }
          .steps-grid        { grid-template-columns: 1fr; }
          .pack-grid         { grid-template-columns: 1fr; }
          .footer-inner      { flex-direction: column; align-items: flex-start; }
          .footer-links      { flex-wrap: wrap; gap: 16px; }
          .hero-stats-grid   { grid-template-columns: 1fr !important; gap: 20px !important; }
          .email-capture-wrap { flex-direction: column !important; border-radius: 16px !important; max-width: 100% !important; }
          .email-capture-wrap input  { border-radius: 16px 16px 0 0 !important; }
          .email-capture-wrap button { border-radius: 0 0 16px 16px !important; padding: 14px 20px !important; }
        }
      `}</style>

      {/* ════════════════════════════════════════════
          NAV — dark
      ════════════════════════════════════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "linear-gradient(to bottom, rgba(61,43,31,0.97), transparent)",
      }}>
        <div style={{
          padding: "clamp(16px, 2vw, 24px) clamp(20px, 4vw, 48px)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(20px, 2.5vw, 26px)",
            fontWeight: 700, color: "var(--cream)",
          }}>
            Fetch<span style={{ color: "var(--amber)" }}>My</span>Heart
          </span>
          <span style={{
            fontSize: 12, fontWeight: 500, letterSpacing: "2.5px",
            textTransform: "uppercase", color: "rgba(253,246,236,0.6)",
            background: "rgba(253,246,236,0.08)",
            border: "1px solid rgba(253,246,236,0.15)",
            padding: "7px 16px", borderRadius: 100, whiteSpace: "nowrap",
          }}>
            Coming Soon
          </span>
        </div>
      </nav>

      {/* ════════════════════════════════════════════
          HERO — dark, stats inline above the fold
      ════════════════════════════════════════════ */}
      <section aria-label="Hero" style={{
        minHeight: "100dvh",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "clamp(100px, 15vw, 140px) clamp(20px, 5vw, 48px) clamp(60px, 8vw, 80px)",
        position: "relative", overflow: "hidden",
        background: "var(--bark)",
      }}>
        {/* Ambient blobs */}
        <div aria-hidden="true" style={{
          position: "absolute", width: "min(700px,100vw)", height: "min(700px,100vw)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,135,58,0.18) 0%, transparent 70%)",
          top: -120, right: "-10%", pointerEvents: "none",
          animation: "drift1 14s ease-in-out infinite alternate",
        }} />
        <div aria-hidden="true" style={{
          position: "absolute", width: "min(520px,80vw)", height: "min(520px,80vw)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(122,158,126,0.12) 0%, transparent 70%)",
          bottom: -80, left: -80, pointerEvents: "none",
          animation: "drift2 16s ease-in-out infinite alternate",
        }} />
        {[
          { top: "18%", right: "8%",  delay: "0s",   size: 32 },
          { top: "62%", right: "22%", delay: "2.5s", size: 26 },
          { top: "38%", right: "38%", delay: "5s",   size: 18 },
        ].map((p, i) => (
          <span key={i} aria-hidden="true" style={{
            position: "absolute", top: p.top, right: p.right,
            fontSize: p.size, opacity: 0.1, pointerEvents: "none",
            animation: `pawFloat 8s ${p.delay} ease-in-out infinite alternate`,
          }}>🐾</span>
        ))}

        <p className="hero-eyebrow" style={{
          fontSize: 16, fontWeight: 600, letterSpacing: "3px",
          textTransform: "uppercase", color: "var(--amber-glow)", marginBottom: 22,
        }}>
          Smart adoption. Forever matches.
        </p>

        <h1 className="hero-headline" style={{
          fontFamily: "var(--font-playfair), serif",
          fontSize: "clamp(56px, 10vw, 130px)",
          fontWeight: 900, lineHeight: 0.95,
          color: "var(--cream)", maxWidth: 960,
        }}>
          Every tail<br />
          tells a{" "}
          <em style={{ fontStyle: "italic", color: "var(--amber)" }}>story.</em>
        </h1>

        <p className="hero-valueprop" style={{
          fontFamily: "var(--font-playfair), serif",
          fontSize: "clamp(20px, 2.5vw, 34px)",
          fontWeight: 400, fontStyle: "italic",
          color: "rgba(253,246,236,0.7)", lineHeight: 1.4,
          marginTop: 24, marginBottom: 40, maxWidth: 700,
        }}>
          &ldquo;We’re making sure it’s a happy one..&rdquo;
        </p>

        <p className="hero-body" style={{
          fontSize: "clamp(17px, 1.8vw, 22px)",
          fontWeight: 300, color: "rgba(253,246,236,0.6)",
          lineHeight: 1.8, maxWidth: 580, marginBottom: 44,
        }}>
          <strong style={{ fontWeight: 500, color: "var(--cream)" }}> The return is a failure of data, not a failure of the dog. </strong>
          Most dogs aren't returned because they're difficult. They're returned because nobody asked the right questions before they went home.
          FetchMyHeart is changing that.
          The right dog. The right home.{" "}
          <strong style={{ fontWeight: 500, color: "var(--cream)" }}>The first time.</strong>
        </p>

        {/* Stats inline in hero */}
        <div className="hero-stats">
          <div
            className="hero-stats-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, auto)",
              gap: "clamp(24px, 5vw, 64px)",
              marginBottom: 48,
              paddingBottom: 48,
              borderBottom: "1px solid rgba(253,246,236,0.1)",
              width: "fit-content",
            }}
          >
            {STATS.map((s, i) => (
              <div key={i}>
                <div style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "clamp(34px, 4vw, 54px)",
                  fontWeight: 900, color: "var(--amber-glow)",
                  lineHeight: 1, marginBottom: 8,
                }}>{s.num}</div>
                <div style={{
                  fontSize: "clamp(13px, 1.1vw, 16px)",
                  color: "rgba(253,246,236,0.45)",
                  lineHeight: 1.55, maxWidth: 190,
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-cta-row" style={{
          display: "flex", alignItems: "center",
          gap: "clamp(12px, 3vw, 28px)", flexWrap: "wrap",
        }}>
          {heroSuccess ? (
            <p className="success-msg" style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(20px, 2vw, 26px)",
              fontStyle: "italic", color: "var(--amber-glow)",
            }}>
              🐾 You&apos;re on the list. We&apos;ll fetch you when we&apos;re ready.
            </p>
          ) : (
            <>
              <EmailCapture
                placeholder="your@email.com"
                buttonText="Join Waitlist"
                dark
                onSuccess={() => setHeroSuccess(true)}
              />
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                fontSize: 15, color: "rgba(253,246,236,0.5)",
              }}>
                <div style={{ display: "flex" }}>
                  {["🐶","🐕","🦮"].map((e, i) => (
                    <span key={i} style={{
                      width: 34, height: 34, borderRadius: "50%",
                      border: "2px solid rgba(253,246,236,0.15)",
                      background: "rgba(253,246,236,0.08)",
                      marginLeft: i === 0 ? 0 : -8,
                      display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: 15,
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
          FOUNDER PHOTO — Ali and Ziba at sunset
      ════════════════════════════════════════════ */}
      <section aria-label="The story behind FetchMyHeart" className="founder-section">
        <div style={{ position: "relative", overflow: "hidden" }}>
          <Image
            src="/ZibaAliSunset.jpg"
            alt="Ali and Ziba enjoying the sunset together"
            fill
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div aria-hidden="true" className="founder-photo-fade" style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, transparent 60%, var(--cream) 100%)",
          }} />
        </div>

        <Reveal>
          <div style={{
            display: "flex", flexDirection: "column", justifyContent: "center",
            padding: "clamp(40px, 6vw, 80px) clamp(32px, 5vw, 72px)",
            height: "100%",
          }}>
            <span style={{
              fontSize: 16, fontWeight: 600, letterSpacing: "3px",
              textTransform: "uppercase", color: "var(--amber)",
              display: "block", marginBottom: 20,
            }}>Why we built this</span>

            <h2 style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(48px, 5.5vw, 78px)",
              fontWeight: 900, lineHeight: 1.05,
              color: "var(--bark)", marginBottom: 22,
            }}>
              14.5 years.<br />
              <em style={{ fontStyle: "italic", color: "var(--amber)" }}>One perfect match.</em>
            </h2>

            <p style={{
              fontSize: "clamp(16px, 1.7vw, 21px)", fontWeight: 300,
              color: "var(--bark-light)", lineHeight: 1.8, marginBottom: 18,
            }}>
              That's me and Ziba. She was my Labrador for 14.5 years and she was the
              clearest example I've ever seen of what a truly right match looks
              like. When we lost her, we started fostering to fill the void.
            </p>

            <p style={{
              fontSize: "clamp(16px, 1.7vw, 21px)", fontWeight: 300,
              color: "var(--bark-light)", lineHeight: 1.8, marginBottom: 36,
            }}>
              One of our longer fosters, Ranger, met four families before the right
              one appeared. Good people, wrong match, every time. When the fifth walked
              in, I felt it instantly. That moment made one thing clear: this shouldn't
              come down to luck. FetchMyHeart exists to make the right match findable for
              every Ranger out there.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 52, height: 52, borderRadius: "50%", background: "var(--mist)",
                overflow: "hidden", position: "relative", flexShrink: 0,
              }}>
                <Image
                  src="/ZibaAliSunset.jpg"
                  alt="Ali, Founder of FetchMyHeart"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center 20%" }}
                  sizes="52px"
                />
              </div>
              <div>
                <div style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: 18, fontWeight: 700, color: "var(--bark)",
                }}>Ali, Founder</div>
                <div style={{ fontSize: 14, color: "var(--bark-light)", opacity: 0.6 }}>
                  Ziba&rsquo;s person, forever 🐾
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ════════════════════════════════════════════
          MARQUEE
      ════════════════════════════════════════════ */}
      <div aria-hidden="true" style={{
        background: "var(--amber)", padding: "20px 0",
        overflow: "hidden", display: "flex",
      }}>
        <div style={{
          display: "flex", whiteSpace: "nowrap",
          animation: "marqueeScroll 22s linear infinite",
        }}>
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: 18, fontWeight: 700, fontStyle: "italic",
              color: "#fff", padding: "0 36px",
              display: "inline-flex", alignItems: "center", gap: 18,
            }}>
              {item}<span style={{ opacity: 0.4, fontStyle: "normal" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════════ */}
      <section aria-label="How FetchMyHeart works" style={{ padding: "clamp(80px, 10vw, 120px) 0" }}>
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
              We go beyond breed labels. Our engine looks at your actual life,
              your schedule, your energy, your space, to find the dog who fits
              it naturally, like they were always meant to be yours.
            </p>
          </Reveal>

          <div className="steps-grid">
            {STEPS.map((step, i) => (
              <Reveal key={i} delay={i * 120}>
                <div
                  onMouseEnter={() => setHoveredStep(i)}
                  onMouseLeave={() => setHoveredStep(null)}
                  style={{
                    background: "#fff", borderRadius: 24, padding: "40px 32px",
                    position: "relative", overflow: "hidden",
                    boxShadow: hoveredStep === i
                      ? "0 20px 60px rgba(61,43,31,0.13)"
                      : "0 2px 20px rgba(61,43,31,0.06)",
                    transform: hoveredStep === i ? "translateY(-6px)" : "none",
                    transition: "box-shadow 0.3s, transform 0.3s",
                  }}
                >
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0,
                    height: 4, background: step.accent,
                  }} />
                  <span style={{ fontSize: 38, display: "block", marginBottom: 18 }}>{step.icon}</span>
                  <div style={{
                    fontSize: 12, fontWeight: 700, letterSpacing: "2px",
                    textTransform: "uppercase", color: step.accent, marginBottom: 12,
                  }}>Step {step.num}</div>
                  <h3 style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "clamp(20px, 1.8vw, 24px)",
                    whiteSpace: "nowrap",
                    fontWeight: 700, color: "var(--bark)", marginBottom: 12,
                  }}>{step.title}</h3>
                  <p style={{
                    fontSize: "clamp(15px, 1.2vw, 17px)",
                    fontWeight: 300, color: "var(--bark-light)", lineHeight: 1.75,
                  }}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          THE PACK
      ════════════════════════════════════════════ */}
      <section aria-label="Meet the pack" style={{
        background: "var(--warm-white)", padding: "clamp(80px, 10vw, 120px) 0",
      }}>
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
              FetchMyHeart was born from three real dogs. Ziba, Ranger, and Daisy.
              Each one taught us something different about what makes a match truly work.
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
                    borderRadius: 24, overflow: "hidden", position: "relative",
                    boxShadow: hoveredPack === i
                      ? "0 28px 70px rgba(61,43,31,0.18)"
                      : "0 4px 30px rgba(61,43,31,0.1)",
                    transition: "box-shadow 0.4s",
                  }}
                >
                  <div style={{ position: "relative", aspectRatio: "3/4", width: "100%" }}>
                    <Image
                      src={dog.src}
                      alt={`${dog.name}, ${dog.trait}`}
                      fill
                      style={{
                        objectFit: "cover",
                        objectPosition: "center center",
                      }}
                      sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
                      priority={i === 0}
                    />
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to top, rgba(30,20,9,0.9) 0%, rgba(30,20,9,0.2) 50%, transparent 100%)",
                      opacity: hoveredPack === i ? 1 : 0.8, transition: "opacity 0.35s",
                    }} />
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0,
                      padding: "clamp(20px, 3vw, 30px)",
                    }}>
                      <div style={{
                        fontSize: 12, fontWeight: 500, letterSpacing: "2px",
                        textTransform: "uppercase", color: "var(--amber-glow)", marginBottom: 6,
                      }}>{dog.trait}</div>
                      <div style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontSize: "clamp(24px, 2.5vw, 32px)",
                        fontWeight: 900, color: "#fff", marginBottom: 8,
                      }}>{dog.name}</div>
                      <div style={{
                        fontSize: "clamp(14px, 1.1vw, 16px)",
                        color: "rgba(255,255,255,0.78)", lineHeight: 1.6,
                        maxHeight: hoveredPack === i ? 200 : 0,
                        overflow: "hidden", transition: "max-height 0.4s ease",
                      }}>{dog.desc}</div>
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
      <section aria-label="Our mission" style={{ padding: "clamp(80px, 10vw, 120px) 0", overflow: "hidden" }}>
        <div className="section-inner">
          <div className="mission-grid">

            {/* Left: big stat + Ziba headshot */}
            <Reveal>
              <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

                {/* 15% stat */}
                <div>
                  <div style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "clamp(120px, 18vw, 260px)",
                    fontWeight: 900, color: "var(--mist)",
                    lineHeight: 1, userSelect: "none",
                    display: "block",
                  }}>
                    15%
                  </div>
                  <div style={{
                    fontSize: "clamp(15px, 1.3vw, 18px)",
                    fontWeight: 500, letterSpacing: "2px",
                    textTransform: "uppercase", color: "var(--amber-glow)",
                    lineHeight: 1.6, marginTop: 16,
                  }}>
                    of dogs returned within 6 months
                  </div>
                </div>

                {/* Ziba headshot — full image, no crop */}
                <div style={{
                    borderRadius: 20, overflow: "hidden",
                    background: "#1a1008",
                    position: "relative",
                    maxHeight: 500,
                    }}>
                    <Image
                    src="/ZibaHeadShot-18.jpg"
                    alt="Ziba, the dog who inspired FetchMyHeart"
                    width={800}
                    height={800}
                    style={{
                        width: "100%",
                        height: "420px",      // ← change "auto" to "420px"
                        objectFit: "cover",   // ← add this
                        objectPosition: "center 20%",  // ← add this to keep her face in frame
                        display: "block",
                    }}
                    sizes="(max-width: 900px) 100vw, 50vw"
                    />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(30,20,9,0.7) 0%, transparent 50%)",
                    pointerEvents: "none",
                  }} />
                  <div style={{
                    position: "absolute", bottom: 20, left: 24,
                  }}>
                    <div style={{
                      fontSize: 12, fontWeight: 500, letterSpacing: "2px",
                      textTransform: "uppercase", color: "var(--amber-glow)", marginBottom: 6,
                    }}>The One Who Started It All</div>
                    <div style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "clamp(22px, 2.5vw, 30px)",
                      fontWeight: 900, color: "#fff",
                    }}>Ziba</div>
                  </div>
                </div>

              </div>
            </Reveal>

            {/* Right: copy */}
            <Reveal delay={180}>
              <div>
                <span className="section-label">Our Mission</span>
                <h2 className="section-heading">
                  We&rsquo;re fixing<br />adoption with{" "}
                  <em style={{ fontStyle: "italic", color: "var(--clay)" }}>data.</em>
                </h2>
                <p style={{
                  fontSize: "clamp(16px, 1.7vw, 21px)", fontWeight: 300,
                  color: "var(--bark-light)", lineHeight: 1.8, marginBottom: 20,
                }}>
                  Serial rehoming, a dog bouncing between multiple households before
                  their second birthday, is not a behavior problem.
                  It&rsquo;s a matching problem.
                </p>
                <p style={{
                  fontSize: "clamp(16px, 1.7vw, 21px)", fontWeight: 300,
                  color: "var(--bark-light)", lineHeight: 1.8, marginBottom: 40,
                }}>
                  We&rsquo;re building an intelligent adoption platform that looks beyond
                  breed labels and focuses on real compatibility: lifestyle, activity level,
                  home environment, and experience.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {TAGS.map((tag, i) => (
                    <span key={i} style={{
                      fontSize: 15, fontWeight: 400, padding: "10px 20px",
                      borderRadius: 100, background: "var(--mist)", color: "var(--bark)",
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
          WAITLIST
      ════════════════════════════════════════════ */}
      <section aria-label="Join the waitlist" style={{
        background: "var(--bark)",
        padding: "clamp(80px, 10vw, 120px) clamp(20px, 5vw, 48px)",
        position: "relative", overflow: "hidden",
      }}>
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 50% 50%, rgba(232,135,58,0.14) 0%, transparent 65%)",
        }} />
        <div style={{
          maxWidth: 700, margin: "0 auto",
          textAlign: "center", position: "relative", zIndex: 2,
        }}>
          <Reveal>
            <span style={{
              fontSize: 16, fontWeight: 600, letterSpacing: "3px",
              textTransform: "uppercase", color: "var(--amber-glow)",
              display: "block", marginBottom: 20,
            }}>Be First in Line</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(48px, 6vw, 84px)",
              fontWeight: 900, color: "#FDF6EC", lineHeight: 1.05, marginBottom: 20,
            }}>
              Your dog is already<br />
              <em style={{ fontStyle: "italic", color: "var(--amber-glow)" }}>out there waiting.</em>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p style={{
              fontSize: "clamp(17px, 1.8vw, 22px)", fontWeight: 300,
              color: "rgba(253,246,236,0.6)", lineHeight: 1.8, marginBottom: 48,
            }}>
              We&rsquo;re launching soon. Get early access, help us shape the platform,
              and be part of a movement that changes how dogs find homes forever.
            </p>
          </Reveal>
          <Reveal delay={240}>
            {waitlistSuccess ? (
              <p className="success-msg" style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(22px, 2.2vw, 28px)",
                fontStyle: "italic", color: "var(--amber-glow)",
              }}>
                🐾 Welcome to the pack. We&rsquo;ll be in touch soon.
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <EmailCapture
                  placeholder="Drop your email"
                  buttonText="Join the Pack"
                  dark
                  onSuccess={() => setWaitlistSuccess(true)}
                />
                <p style={{
                  fontSize: 14, color: "rgba(253,246,236,0.3)", letterSpacing: "0.4px",
                }}>
                  No spam. No data selling. Just launch updates and maybe a good dog pic.
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
        padding: "clamp(28px, 4vw, 44px) clamp(20px, 5vw, 48px)",
        borderTop: "1px solid rgba(61,43,31,0.08)",
      }}>
        <div className="footer-inner">
          <span style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: 22, fontWeight: 700, color: "var(--bark)",
          }}>
            Fetch<span style={{ color: "var(--amber)" }}>My</span>Heart
          </span>
          <p style={{ fontSize: 14, color: "var(--bark-light)", opacity: 0.5 }}>
            © 2026 FetchMyHeart. Built with love for dogs everywhere. | 
            A Fourteen Labs LLC Project
          </p>
          <div className="footer-links">
            {[
              { label: "Contact",      href: "mailto:fourteenlabs@gmail.com" },
              { label: "Privacy",      href: "#" },
              { label: "For Shelters", href: "#" },
            ].map((link) => (
              <a key={link.label} href={link.href} style={{
                fontSize: 14, textDecoration: "none",
                color: "var(--bark-light)", opacity: 0.55, transition: "opacity 0.2s",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.55")}
              >{link.label}</a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
