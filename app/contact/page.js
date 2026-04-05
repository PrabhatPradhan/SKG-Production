 
"use client";

import { useState, useEffect } from "react";
import "./contect.css"
const services = [
  "Portrait Photography",
  "Wedding Photography",
  "Fashion & Editorial",
  "Commercial Photography",
  "Event Coverage",
  "Model Portfolio",
  "Other",
];

const budgetChips = ["Under ₹25K", "₹25K – ₹50K", "₹50K – ₹1L", "₹1L – ₹2L", "₹2L+"];

const studioHours = [
  { day: "Monday – Friday", time: "10:00 – 19:00", closed: false },
  { day: "Saturday",        time: "10:00 – 17:00", closed: false },
  { day: "Sunday",          time: "",               closed: true  },
];

const socials = ["📸", "📘", "🐦", "▶", "💼"];

const stripItems = [
  { icon: "📍", label: "Studio Location", val: "South Extension II",  sub: "New Delhi, India" },
  { icon: "⏱",  label: "Response Time",   val: "Within 24 Hours",     sub: "Mon – Sat" },
  { icon: "📸", label: "Serving Since",   val: "2012 · 12 Years",     sub: "850+ Projects Delivered" },
];

export default function ContactPage() {
  const [visible,       setVisible]       = useState(false);
  const [selectedBudget,setSelectedBudget] = useState("");
  const [submitted,     setSubmitted]      = useState(false);
  const [form,          setForm]           = useState({
    firstName: "", lastName: "", email: "", phone: "",
    service: "", date: "", message: "",
  });

  useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
     
      <div className="contact-page">

        {/* ── HERO ── */}
        <div className="contact-hero">
          <div className={`eyebrow fade-up ${visible ? "in d1" : ""}`}>SKG Production</div>
          <h1 className={`hero-title fade-up ${visible ? "in d2" : ""}`}>
            Let's Create Something <em>Extraordinary</em>
          </h1>
          <div className={`gold-bar fade-up ${visible ? "in d3" : ""}`} />
          <p className={`hero-sub fade-up ${visible ? "in d4" : ""}`}>
            We'd love to hear about your project. Reach out and let's begin crafting your visual story together.
          </p>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="wrap">
          <div className="contact-grid">

            {/* LEFT: Studio Info */}
            <div className="contact-info">

              <div className="info-section">
                <div className="info-label">Visit Us</div>
                <div className="info-main">SKG Production Studio</div>
                <div className="info-sub">
                  B-14, Second Floor, South Extension Part II<br />
                  New Delhi — 110 049, India
                </div>
              </div>

              <div className="info-section">
                <div className="info-label">Call Us</div>
                <a href="tel:+911234567890" className="info-link">+91 12345 67890</a>
                <a href="tel:+911234567891" className="info-link" style={{ marginTop: 4 }}>+91 12345 67891</a>
                <div className="info-sub" style={{ marginTop: 6 }}>Mon – Sat, 10 AM – 7 PM</div>
              </div>

              <div className="info-section">
                <div className="info-label">Email Us</div>
                <a href="mailto:hello@skgproduction.com" className="info-link">hello@skgproduction.com</a>
                <a href="mailto:bookings@skgproduction.com" className="info-link" style={{ marginTop: 4 }}>bookings@skgproduction.com</a>
              </div>

              <div className="info-section">
                <div className="info-label">Studio Hours</div>
                {studioHours.map((h, i) => (
                  <div className="hours-row" key={i}>
                    <span className="hours-day">{h.day}</span>
                    {h.closed
                      ? <span className="hours-closed">By appointment only</span>
                      : <span className="hours-time">{h.time}</span>
                    }
                  </div>
                ))}
              </div>

              <div className="info-section">
                <div className="info-label">Follow Us</div>
                <div className="social-row">
                  {socials.map((s, i) => (
                    <button className="social-btn" key={i}>{s}</button>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT: Form */}
            <div className="contact-form">
              {!submitted ? (
                <>
                  <div className="form-head">
                    <div className="form-htitle">Send Us a Message</div>
                    <div className="form-hsub">We typically respond within 24 hours</div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">First Name</label>
                        <input className="form-input" name="firstName" type="text" placeholder="Rahul" value={form.firstName} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Last Name</label>
                        <input className="form-input" name="lastName" type="text" placeholder="Sharma" value={form.lastName} onChange={handleChange} />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input className="form-input" name="email" type="email" placeholder="rahul@example.com" value={form.email} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input className="form-input" name="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Service Required</label>
                      <select className="form-select" name="service" value={form.service} onChange={handleChange}>
                        <option value="" disabled>Select a service...</option>
                        {services.map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Preferred Date</label>
                      <input className="form-input" name="date" type="date" value={form.date} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Approximate Budget</label>
                      <div className="form-budget">
                        {budgetChips.map((b) => (
                          <button
                            type="button"
                            key={b}
                            className={`budget-chip ${selectedBudget === b ? "active" : ""}`}
                            onClick={() => setSelectedBudget(b)}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Tell Us About Your Vision</label>
                      <textarea
                        className="form-textarea"
                        name="message"
                        placeholder="Describe your project, location preferences, style references, or anything else..."
                        value={form.message}
                        onChange={handleChange}
                      />
                    </div>

                    <button type="submit" className="form-submit">
                      <span>Send Enquiry</span>
                      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  </form>
                </>
              ) : (
                <div className="success-msg">
                  <div className="success-icon">✦</div>
                  <div className="success-title">Message Received</div>
                  <div className="success-sub">Thank you for reaching out. Our team will get back to you within 24 hours.</div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ── MAP STRIP ── */}
        <div className="map-strip">
          <div className="map-placeholder">
            <span style={{ fontSize: 22 }}>📍</span>
            South Extension Part II, New Delhi
          </div>
          <div className="map-overlay">
            <span>📍</span>
            SKG Production · B-14, South Extension II · New Delhi 110049
          </div>
        </div>

        {/* ── BOTTOM STRIP ── */}
        <div className="info-strip">
          <div className="info-strip-inner">
            {stripItems.map((s, i) => (
              <div className="strip-item" key={i}>
                <div className="strip-icon">{s.icon}</div>
                <div className="strip-label">{s.label}</div>
                <div className="strip-val">{s.val}</div>
                <div className="strip-sub">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}