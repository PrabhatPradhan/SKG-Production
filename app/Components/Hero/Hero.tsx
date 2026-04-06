 
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "./hero.css"
import ShootCards from "../ShootCards/ShootCards";
import OurModels from "../OurModels/OurModels";
const stats = [
  { num: "850+", label: "Projects Done" },
  { num: "12",   label: "Years Experience" },
  { num: "40+",  label: "Awards Won" },
  { num: "98%",  label: "Happy Clients" },
];

const galleryItems = [
  { label: "Portrait",   icon: "📷", bg: "#EDE8E1", span: true  },
  { label: "Wedding",    icon: "💍", bg: "#E8E2D8", span: false },
  { label: "Fashion",    icon: "👗", bg: "#E4DDD3", span: false },
  { label: "Events",     icon: "🎉", bg: "#EAE5DE", span: false },
  { label: "Commercial", icon: "📸", bg: "#E1DBD2", span: false },
];

export default function HomeContent() {
  const [visible, setVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      
      <div className="page-wrapper"  suppressHydrationWarning ref={heroRef}>

        {/* ══════════════════════════════
            HERO
        ══════════════════════════════ */}
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 2rem 72px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 22 }}>

            <div className={`hero-tag fade-up ${visible ? "visible" : ""} delay-1`}>
              Professional Photography Studio
            </div>

            <h1 className={`hero-title fade-up ${visible ? "visible" : ""} delay-2`}>
              Capturing <em>Timeless</em><br />Moments
            </h1>

            <div className={`gold-line fade-up ${visible ? "visible" : ""} delay-3`} />

            <p className={`hero-sub fade-up ${visible ? "visible" : ""} delay-3`}>
              Portrait, Fashion, Wedding &amp; Commercial photography crafted with a refined artistic vision and meticulous attention to detail.
            </p>

            <div className={`fade-up ${visible ? "visible" : ""} delay-4`} style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
              <Link href="#" className="btn-primary">
                <span>View Portfolio</span>
                <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link href="/contact" className="btn-outline">Book a Session →</Link>
            </div>

          </div>
        </section>

       

        {/* ══════════════════════════════
            GALLERY
        ══════════════════════════════ */}
        {/* <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 2rem" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div className="section-eyebrow">Our Work</div>
              <div className="section-title">Featured Work</div>
            </div>
            <Link href="/portfolio" className="section-link">
              View all
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          <div className="gallery-grid">
            {galleryItems.map((item, i) => (
              <div key={i} className="g-item" style={{ background: item.bg, gridRow: item.span ? "1 / 3" : "auto" }}>
                <div className="g-inner">
                  <span className="g-icon">{item.icon}</span>
                </div>
                <div className="g-overlay" />
                <div className="g-label">{item.label}</div>
              </div>
            ))}
          </div>
        </section> */}
       <ShootCards/>
       <OurModels/>

       
        {/* ══════════════════════════════
            SERVICES
        ══════════════════════════════ */}
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem 80px" }}>
          <div style={{ marginBottom: 36 }}>
            <div className="section-eyebrow">What We Offer</div>
            <div className="section-title">Our Services</div>
          </div>
          <div className="services-grid">
            {[
              { num: "01", icon: "🖼", name: "Portrait",   desc: "Intimate, expressive portraits that reveal your true character through careful lighting and composition." },
              { num: "02", icon: "💍", name: "Wedding",    desc: "Timeless wedding photography capturing the emotion, elegance and joy of your most important day." },
              { num: "03", icon: "👗", name: "Fashion",    desc: "High-concept editorial and commercial fashion imagery with a bold, sophisticated visual language." },
              { num: "04", icon: "📸", name: "Commercial", desc: "Brand and product photography that tells your story and connects with your audience." },
              { num: "05", icon: "🎉", name: "Events",     desc: "Dynamic event coverage from corporate functions to private celebrations, every moment preserved." },
              { num: "06", icon: "👥", name: "Models",     desc: "Professional model portfolio shoots — men, women and children — for agencies and individuals." },
            ].map((s, i) => (
              <div className="service-card" key={i}>
                <div className="service-num">{s.num}</div>
                <div className="service-icon">{s.icon}</div>
                <div className="service-name">{s.name}</div>
                <div className="service-desc">{s.desc}</div>
                <div className="service-arrow">
                  Explore
                  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </section>

{/* ══════════════════════════════
            STATS
        ══════════════════════════════ */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem", marginBottom:"1rem", }}>
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div className="stat-item" key={i}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════
            TESTIMONIAL
        ══════════════════════════════ */}
        <div className="testimonial-section">
          <p className="testimonial-quote">
            "SKG Production transformed our wedding memories into timeless art. Every photograph feels like a painting — deeply personal, flawlessly composed."
          </p>
          <div className="testimonial-author">Priya & Arjun Sharma — Delhi</div>
          <div className="testimonial-dots">
            {[0,1,2].map(i => (
              <div key={i} className={`t-dot ${i === 0 ? "active" : ""}`} />
            ))}
          </div>
        </div>

        {/* ══════════════════════════════
            CTA BANNER
        ══════════════════════════════ */}
        <div className="cta-banner">
          <div style={{ maxWidth: 1200, width: "100%", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 28 }}>
            <div>
              <div className="section-eyebrow" style={{ marginBottom: 10 }}>Ready to Begin?</div>
              <div className="cta-heading">Let's Create Something <em>Beautiful</em><br />Together</div>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-primary">
                <span>Book a Session</span>
                <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link href="/portfolio" className="btn-outline">See Our Work</Link>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════
            FOOTER
        ══════════════════════════════ */}
       

      </div>
    </>
  );
}