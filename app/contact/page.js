 
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

// Frontend me handleSubmit function
const handleSubmit = async (e) => {
  e.preventDefault();

  const message = `
New Enquiry 🚀

Name: ${form.firstName} ${form.lastName}
Email: ${form.email}
Phone: ${form.phone}
Service: ${form.service}
Date: ${form.date}
Budget: ${selectedBudget}

Message:
${form.message}
  `;

  try {
    const res = await fetch("/api/send-whatsapp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Message sent ✅");
      // Optional: form reset
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        date: "",
        message: "",
      });
      setSelectedBudget("");
    } else {
      alert("Error sending message ❌");
      console.error(data.error);
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong ❌");
  }
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
         

            {/* RIGHT: Form */}
          <div className="w-full max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-8">
  {!submitted ? (
    <>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Send Us a Message</h2>
        <p className="text-gray-500 text-sm">We typically respond within 24 hours</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Row 1 */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600">First Name</label>
            <input
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none"
              name="firstName"
              type="text"
              placeholder="Rahul"
              value={form.firstName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Last Name</label>
            <input
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none"
              name="lastName"
              type="text"
              placeholder="Sharma"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Email Address</label>
            <input
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none"
              name="email"
              type="email"
              placeholder="rahul@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Phone Number</label>
            <input
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none"
              name="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Service */}
        <div>
          <label className="text-sm font-medium text-gray-600">Service Required</label>
          <select
            className="w-full mt-1 px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-rose-400 outline-none"
            name="service"
            value={form.service}
            onChange={handleChange}
          >
            <option value="" disabled>Select a service...</option>
            {services.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="text-sm font-medium text-gray-600">Preferred Date</label>
          <input
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        {/* Budget Chips */}
        <div>
          <label className="text-sm font-medium text-gray-600">Approximate Budget</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {budgetChips.map((b) => (
              <button
                type="button"
                key={b}
                onClick={() => setSelectedBudget(b)}
                className={`px-4 py-1.5 rounded-full text-sm border transition 
                ${
                  selectedBudget === b
                    ? "bg-rose-500 text-white border-rose-500"
                    : "bg-gray-100 text-gray-600 hover:bg-rose-50"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="text-sm font-medium text-gray-600">Tell Us About Your Vision</label>
          <textarea
            className="w-full mt-1 px-4 py-2 border rounded-lg h-28 resize-none focus:ring-2 focus:ring-rose-400 outline-none"
            name="message"
            placeholder="Describe your project, location preferences, style references..."
            value={form.message}
            onChange={handleChange}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-lg font-medium transition"
        >
          Send Enquiry
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </form>
    </>
  ) : (
    <div className="text-center py-10">
      <div className="text-4xl text-rose-500 mb-3">✦</div>
      <h3 className="text-xl font-semibold text-gray-800">Message Received</h3>
      <p className="text-gray-500 text-sm mt-1">
        Thank you for reaching out. Our team will get back to you within 24 hours.
      </p>
    </div>
  )}
</div>

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