// app/about/page.jsx  (ya pages/about.jsx)
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const timelineData = [
  { year: "2012", side: "left",  event: "Studio Founded",           desc: "Opened our first portrait studio in Lajpat Nagar, Delhi with just one camera and an unwavering vision." },
  { year: "2015", side: "right", event: "Wedding Division Launched", desc: "Expanded into destination wedding photography, shooting over 60 weddings in the first year alone." },
  { year: "2017", side: "left",  event: "First National Award",      desc: "Received the India Photography Excellence Award for Best Portrait Series at the Delhi Photo Festival." },
  { year: "2019", side: "right", event: "Fashion & Commercial Wing", desc: "Launched high-fashion and commercial photography, collaborating with leading Indian fashion brands and magazines." },
  { year: "2021", side: "left",  event: "New Studio, South Delhi",   desc: "Moved into our purpose-built 4,000 sq ft studio with multiple shooting sets, a post-processing suite, and model management." },
  { year: "2024", side: "right", event: "850+ Projects & Counting",  desc: "Crossed 850 completed projects with clients from across India, the UAE, UK and beyond. 40+ industry awards on the wall." },
];

const awardsData = [
  { year: "2024", icon: "🏆", name: "Best Wedding Photography Studio",      org: "Wedding Sutra Awards, Mumbai",       badge: "Gold" },
  { year: "2023", icon: "🥇", name: "Portrait Photographer of the Year",    org: "India Photo Festival, Delhi",        badge: "National" },
  { year: "2023", icon: "✦",  name: "Excellence in Commercial Photography", org: "Advertising Club of India",          badge: "Silver" },
  { year: "2022", icon: "🎖", name: "Best Fashion Editorial",               org: "Vogue India Creative Awards",        badge: "Featured" },
  { year: "2020", icon: "🏅", name: "Top 10 Studios — North India",         org: "Photography Business Review",        badge: "Ranked #3" },
  { year: "2017", icon: "⭐", name: "Best Portrait Series",                 org: "Delhi Photo Festival",               badge: "Debut Award" },
];

const valuesData = [
  { num: "01", name: "Authenticity", desc: "We capture real moments, real emotion. No manufactured poses — only genuine stories told through light and shadow." },
  { num: "02", name: "Precision",    desc: "Every frame is considered. From composition to post-processing, we obsess over detail so you never have to." },
  { num: "03", name: "Legacy",       desc: "We create work meant to endure for generations — images that your grandchildren will look at with wonder." },
  { num: "04", name: "Trust",        desc: "Our clients invite us into their most intimate moments. We honour that trust with discretion, respect and care." },
];

export default function AboutPage() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --cream: #FAF8F5; --cream2: #F2EFE9; --warm: #E8E2D9;
          --border: #D6CEBF; --text: #1C1917; --text2: #6B6257; --text3: #A09688;
          --gold: #8B6F3E; --gold2: #C4A265; --gold3: #E8D5B0;
        }

        .about-page {
          background: var(--cream);
          background-image:
            radial-gradient(ellipse at 10% 5%, rgba(196,162,101,0.06) 0%, transparent 55%),
            radial-gradient(ellipse at 90% 20%, rgba(139,111,62,0.04) 0%, transparent 50%);
          font-family: 'DM Sans', sans-serif;
          color: var(--text);
        }
        .wrap { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }

        /* FADE UP */
        .fade-up { opacity: 0; transform: translateY(22px); transition: opacity .7s ease, transform .7s ease; }
        .fade-up.in { opacity: 1; transform: translateY(0); }
        .d1 { transition-delay: .1s; } .d2 { transition-delay: .25s; }
        .d3 { transition-delay: .4s; } .d4 { transition-delay: .55s; }

        /* HERO */
        .about-hero {
          padding: 100px 2rem 72px; text-align: center;
          border-bottom: 1px solid var(--border);
          position: relative; overflow: hidden;
        }
        .about-hero::before {
          content: 'ABOUT';
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(80px, 15vw, 180px); font-weight: 700; letter-spacing: 20px;
          color: rgba(196,162,101,0.06);
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          white-space: nowrap; pointer-events: none; line-height: 1;
        }
        .page-eyebrow {
          font-size: 9px; letter-spacing: 5px; text-transform: uppercase;
          color: var(--gold2); margin-bottom: 18px;
        }
        .about-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(40px, 6vw, 72px); font-weight: 400;
          color: var(--text); line-height: 1.08; letter-spacing: 1px; margin-bottom: 20px;
        }
        .about-title em { font-style: italic; color: var(--gold); }
        .title-line {
          width: 48px; height: 1px;
          background: linear-gradient(90deg, var(--gold2), transparent);
          margin: 0 auto 20px;
        }
        .about-intro {
          font-size: 15px; line-height: 1.9; color: var(--text3);
          max-width: 560px; margin: 0 auto; letter-spacing: 0.3px;
        }

        /* FOUNDED STRIP */
        .founded-strip {
          background: var(--text); padding: 28px 2rem;
          display: flex; align-items: center; justify-content: center;
          gap: 48px; flex-wrap: wrap;
        }
        .f-item { text-align: center; }
        .f-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px; font-weight: 600; color: var(--gold2);
          line-height: 1; margin-bottom: 4px;
        }
        .f-label { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: rgba(250,248,245,0.4); }
        .f-divider { width: 1px; height: 40px; background: rgba(196,162,101,0.2); }

        /* STORY */
        .story-section { padding: 80px 0; }
        .section-tag { font-size: 9px; letter-spacing: 4px; text-transform: uppercase; color: var(--gold2); margin-bottom: 10px; }
        .section-h {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(26px, 3.5vw, 38px); font-weight: 500;
          color: var(--text); letter-spacing: 0.5px; line-height: 1.2; margin-bottom: 28px;
        }
        .section-h em { font-style: italic; color: var(--gold); }
        .story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
        .story-body p { font-size: 14px; line-height: 1.95; color: var(--text2); margin-bottom: 18px; letter-spacing: 0.2px; }
        .story-body p:last-child { margin-bottom: 0; }
        .story-img {
          width: 100%; aspect-ratio: 3/4;
          
          display: flex; align-items: center; justify-content: center;
          font-size: 56px; opacity: 0.3;
        }
        .story-img-label {
          background: var(--text); padding: 14px 18px;
          display: flex; justify-content: space-between; align-items: center;
        }
        .sil-text { font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase; color: rgba(250,248,245,0.5); }
        .sil-year { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 600; color: var(--gold2); }
        .story-pull {
          border-left: 2px solid var(--gold2); padding: 18px 22px;
          margin: 28px 0; background: rgba(196,162,101,0.04);
        }
        .story-pull p {
          font-family: 'Cormorant Garamond', serif !important;
          font-size: 19px !important; font-style: italic;
          color: var(--text) !important; line-height: 1.6 !important; margin: 0 !important;
        }

        /* TIMELINE */
        .timeline-section {
          background: var(--cream2);
          border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
          padding: 80px 0;
        }
        .timeline { position: relative; margin-top: 48px; }
        .timeline::before {
          content: ''; position: absolute; left: 50%; top: 0; bottom: 0;
          width: 1px; background: var(--border); transform: translateX(-50%);
        }
        .tl-item {
          display: grid; grid-template-columns: 1fr 40px 1fr;
          gap: 0; margin-bottom: 48px; align-items: start;
        }
        .tl-item:last-child { margin-bottom: 0; }
        .tl-left { padding-right: 32px; text-align: right; }
        .tl-right { padding-left: 32px; }
        .tl-year {
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px; font-weight: 600; letter-spacing: 2px; color: var(--gold2); margin-bottom: 6px;
        }
        .tl-event {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px; font-weight: 500; color: var(--text); margin-bottom: 6px;
        }
        .tl-desc { font-size: 12px; line-height: 1.75; color: var(--text3); }
        .tl-dot {
          width: 12px; height: 12px;
          border: 2px solid var(--gold2); background: var(--cream2);
          border-radius: 50%; margin-top: 4px; justify-self: center;
        }

        /* AWARDS */
        .awards-section { padding: 80px 0; }
        .awards-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: var(--border); border: 1px solid var(--border); margin-top: 48px;
        }
        .award-card {
          background: var(--cream); padding: 36px 28px;
          transition: background .2s; cursor: default; position: relative; overflow: hidden;
        }
        .award-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold2), transparent);
          opacity: 0; transition: opacity .25s;
        }
        .award-card:hover { background: var(--cream2); }
        .award-card:hover::before { opacity: 1; }
        .award-year { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--gold2); margin-bottom: 14px; }
        .award-icon { font-size: 26px; margin-bottom: 14px; opacity: 0.7; }
        .award-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 19px; font-weight: 600; color: var(--text); margin-bottom: 8px; line-height: 1.3;
        }
        .award-org { font-size: 11px; letter-spacing: 1px; color: var(--text3); }
        .award-badge {
          display: inline-block; margin-top: 14px;
          font-size: 8px; letter-spacing: 2px; text-transform: uppercase;
          padding: 4px 10px; border: 1px solid var(--gold3); color: var(--gold2);
        }

        /* VALUES */
        .values-section { background: var(--text); padding: 80px 0; }
        .values-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; margin-top: 48px; }
        .value-item { border-top: 1px solid rgba(196,162,101,0.25); padding-top: 24px; }
        .value-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px; font-weight: 300; color: rgba(196,162,101,0.3);
          line-height: 1; margin-bottom: 12px;
        }
        .value-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px; font-weight: 500; color: rgba(250,248,245,0.9); margin-bottom: 10px;
        }
        .value-desc { font-size: 12px; line-height: 1.8; color: rgba(250,248,245,0.4); }

        /* CTA */
        .about-cta {
          background: var(--cream2); border-top: 1px solid var(--border);
          padding: 80px 2rem; text-align: center;
        }
        .cta-h {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(30px, 4vw, 48px); font-weight: 400;
          color: var(--text); line-height: 1.15; margin-bottom: 20px;
        }
        .cta-h em { font-style: italic; color: var(--gold); }
        .cta-sub { font-size: 13px; color: var(--text3); letter-spacing: 0.5px; margin-bottom: 32px; }

        /* BUTTONS */
        .btn-dark {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
          padding: 14px 34px; background: var(--text); color: var(--cream);
          border: none; cursor: pointer; text-decoration: none; transition: color .3s;
        }
        .btn-dark::before {
          content: ''; position: absolute; inset: 0; background: var(--gold);
          transform: translateX(-100%); transition: transform .3s ease;
        }
        .btn-dark:hover::before { transform: translateX(0); }
        .btn-dark span, .btn-dark svg { position: relative; z-index: 1; }
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
          padding: 14px 34px; background: transparent; color: var(--gold);
          border: 1px solid var(--gold2); text-decoration: none; transition: background .25s;
        }
        .btn-ghost:hover { background: rgba(196,162,101,0.08); }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .story-grid { grid-template-columns: 1fr; gap: 32px; }
          .story-img-block { order: -1; }
          .timeline::before { left: 20px; }
          .tl-item { grid-template-columns: 20px 1fr; }
          .tl-left { display: none; }
          .awards-grid { grid-template-columns: 1fr 1fr; }
          .values-grid { grid-template-columns: 1fr 1fr; gap: 24px; }
          .founded-strip { gap: 24px; }
          .f-divider { display: none; }
        }
        @media (max-width: 480px) {
          .awards-grid { grid-template-columns: 1fr; }
          .values-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="about-page">

        {/* ── HERO ── */}
        <div className="about-hero">
          <div className={`page-eyebrow fade-up ${visible ? "in" : ""} d1`}>SKG Production</div>
          <h1 className={`about-title fade-up ${visible ? "in" : ""} d2`}>
            Where Light Meets <em>Legacy</em>
          </h1>
          <div className={`title-line fade-up ${visible ? "in" : ""} d3`} />
          <p className={`about-intro fade-up ${visible ? "in" : ""} d3`}>
            For over a decade, SKG Production has been crafting visual stories that endure — portraits that breathe, weddings that live forever, and fashion that defines a moment.
          </p>
        </div>

        {/* ── FOUNDED STRIP ── */}
        <div className="founded-strip">
          {[["2012","Founded"],["850+","Projects"],["40+","Awards"],["Delhi","Based"],["12","Years"]].map(([n,l],i) => (
            <>
              {i > 0 && <div key={`d${i}`} className="f-divider" />}
              <div key={n} className="f-item">
                <div className="f-num">{n}</div>
                <div className="f-label">{l}</div>
              </div>
            </>
          ))}
        </div>

        {/* ── STORY ── */}
        <section className="story-section">
          <div className="wrap">
            <div className="story-grid">
              <div>
                <div className="section-tag">Our Story</div>
                <h2 className="section-h">Born from a <em>Passion</em><br />for the Perfect Frame</h2>
                <div className="story-body">
                  <p>SKG Production was founded in 2012 in the heart of Delhi by Suresh Kumar Gupta — a self-taught photographer who believed that every face carries a story worth preserving. What began as a small portrait studio in Lajpat Nagar grew into one of Delhi's most sought-after production houses.</p>
                  <div className="story-pull">
                    <p>"Photography is not about the camera. It is about the patience to wait for the soul to show itself."</p>
                  </div>
                  <p>Over the years, SKG expanded its vision beyond portraits — into weddings, high-fashion editorials, and large-scale commercial campaigns. Each branch of the studio was built on the same foundation: uncompromising quality, deep human connection, and a relentless pursuit of the perfect light.</p>
                  <p>Today, SKG Production operates from a purpose-built studio in South Delhi with a full production team, in-house post-processing suite, and a roster of professional models — serving clients across India and internationally.</p>
                </div>
              </div>
              <div style={{ position: "relative" }}>
                <div className="story-img">
                  <img src='https://images.pexels.com/photos/29370690/pexels-photo-29370690.jpeg' alt="" />
                </div>
                <div className="story-img-label">
                  <span className="sil-text">Studio · South Delhi</span>
                  <span className="sil-year">Est. 2012</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section className="timeline-section">
          <div className="wrap">
            <div className="section-tag">Our Journey</div>
            <h2 className="section-h">A Decade of <em>Milestones</em></h2>
            <div className="timeline">
              {timelineData.map((item, i) => (
                <div className="tl-item" key={i}>
                  <div className="tl-left">
                    {item.side === "left" && <>
                      <div className="tl-year">{item.year}</div>
                      <div className="tl-event">{item.event}</div>
                      <div className="tl-desc">{item.desc}</div>
                    </>}
                  </div>
                  <div className="tl-dot" />
                  <div className="tl-right">
                    {item.side === "right" && <>
                      <div className="tl-year">{item.year}</div>
                      <div className="tl-event">{item.event}</div>
                      <div className="tl-desc">{item.desc}</div>
                    </>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AWARDS ── */}
        <section className="awards-section">
          <div className="wrap">
            <div className="section-tag">Recognition</div>
            <h2 className="section-h">Awards & <em>Honours</em></h2>
            <div className="awards-grid">
              {awardsData.map((a, i) => (
                <div className="award-card" key={i}>
                  <div className="award-year">{a.year}</div>
                  <div className="award-icon">{a.icon}</div>
                  <div className="award-name">{a.name}</div>
                  <div className="award-org">{a.org}</div>
                  <div className="award-badge">{a.badge}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="values-section">
          <div className="wrap">
            <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: "rgba(196,162,101,0.7)", marginBottom: 10 }}>What Drives Us</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 500, color: "rgba(250,248,245,0.9)", letterSpacing: 0.5, lineHeight: 1.2 }}>
              Our Core <em style={{ fontStyle: "italic", color: "var(--gold2)" }}>Values</em>
            </h2>
            <div className="values-grid">
              {valuesData.map((v, i) => (
                <div className="value-item" key={i}>
                  <div className="value-num">{v.num}</div>
                  <div className="value-name">{v.name}</div>
                  <div className="value-desc">{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <div className="about-cta">
          <div className="page-eyebrow" style={{ marginBottom: 12 }}>Ready to Work Together?</div>
          <h2 className="cta-h">Let's Create Your <em>Story</em></h2>
          <p className="cta-sub">Book a consultation and see how SKG Production can bring your vision to life.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-dark">
              <span>Book a Session</span>
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link href="/portfolio" className="btn-ghost">View Portfolio →</Link>
          </div>
        </div>

      </div>
    </>
  );
}