"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ModelDetailView({ model, backPath, backLabel, accentColor = "rose" }) {
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const handleKey = useCallback(
    (e) => {
      if (lightboxIdx === null) return;
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowRight") setLightboxIdx((i) => (i + 1) % model.photos.length);
      if (e.key === "ArrowLeft") setLightboxIdx((i) => (i - 1 + model.photos.length) % model.photos.length);
    },
    [lightboxIdx, model.photos.length]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    document.body.style.overflow = lightboxIdx !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIdx]);

  const [firstName, ...rest] = model.name.split(" ");

  return (
    <main
      className="min-h-screen pt-20 page-enter"
      
    >
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2">
        <div className="flex items-center gap-2 font-josefin text-[9px] tracking-[3px] uppercase text-gray-600">
          <Link href="/" className="hover:text-yellow-500/70 transition-colors">Home</Link>
          <span>/</span>
          <Link href={backPath} className="hover:text-yellow-500/70 transition-colors">{backLabel}</Link>
          <span>/</span>
          <span className="text-yellow-600/60">{model.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-start">

          {/* Main Photo */}
          <div className="relative w-full aspect-[3/4] overflow-hidden bg-neutral-900 max-h-[80vh]">
            <Image
              src={model.photos[0]}
              alt={model.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 hidden md:block"
              style={{ background: "linear-gradient(to right,transparent 60%,#080808)" }} />
            <div className="absolute top-4 left-4 w-16 h-16 border-t border-l border-yellow-500/30" />
            <div className="absolute bottom-4 right-4 w-16 h-16 border-b border-r border-yellow-500/30" />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center py-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 bg-gradient-to-r from-yellow-500/40 to-transparent" />
              <span className="font-josefin text-[9px] tracking-[4px] uppercase text-yellow-600/50">
                {backLabel} · SKG Production
              </span>
            </div>

            <h1 className="font-playfair font-black leading-none mb-2"
              style={{ fontSize: "clamp(2.4rem,6vw,4rem)" }}>
              <span className="gold-text">{firstName}</span>{" "}
              <span className="text-white">{rest.join(" ")}</span>
            </h1>

            <p className="font-josefin text-[10px] tracking-[4px] uppercase text-gray-500 mb-6">
              {model.specialty} · {model.location}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-7">
              {[
                { label: model.gender ? "Gender" : "Height", value: model.gender || model.height },
                { label: "Age", value: model.age },
                { label: "Experience", value: model.experience },
              ].map((stat, i) => (
                <div key={stat.label} className="stat-bar border-l-2 pl-3"
                  style={{ borderColor: "rgba(201,168,76,0.2)", animationDelay: `${i * 0.1}s` }}>
                  <div className="font-playfair text-2xl sm:text-3xl text-yellow-300">{stat.value}</div>
                  <div className="font-josefin text-[8px] tracking-[3px] uppercase text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="p-4 mb-5 border"
              style={{ background: "rgba(201,168,76,0.04)", borderColor: "rgba(201,168,76,0.15)" }}>
              <p className="font-josefin text-[8px] tracking-[4px] uppercase text-yellow-700/60 mb-1">Starting Price</p>
              <p className="font-playfair text-3xl sm:text-4xl text-yellow-300 mb-1">{model.price}</p>
              <p className="font-josefin text-[8px] tracking-[2px] uppercase text-gray-700">
                Per Session · Negotiable for Bulk Projects
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <button
                className="book-btn-glow w-full py-4 font-josefin text-[10px] tracking-[4px] uppercase font-semibold text-black transition-all duration-300"
                style={{ background: "linear-gradient(135deg,#a07830,#c9a84c,#f5d98b)" }}>
                Book This Model
              </button>
              <button
                className="w-full py-3.5 font-josefin text-[10px] tracking-[4px] uppercase text-yellow-400 border transition-all duration-300 hover:bg-yellow-500/5"
                style={{ borderColor: "rgba(201,168,76,0.25)" }}>
                Send Enquiry
              </button>
            </div>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap mt-5">
              {model.specialty.split("·").map((t) => (
                <span key={t}
                  className="font-josefin text-[8px] tracking-[2px] uppercase px-3 py-1 border text-yellow-600/50"
                  style={{ borderColor: "rgba(201,168,76,0.15)" }}>
                  {t.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-josefin text-[9px] tracking-[5px] uppercase text-yellow-600/50">Portfolio Gallery</span>
          <div className="flex-1 h-px bg-gradient-to-r from-yellow-500/20 to-transparent" />
          <span className="font-josefin text-[9px] tracking-[3px] uppercase text-gray-700">
            {model.photos.length} Photos
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5 sm:gap-2">
          {model.photos.map((photo, i) => (
            <div key={i}
              className="gallery-item relative overflow-hidden cursor-pointer bg-neutral-900"
              style={{ aspectRatio: i % 5 === 0 ? "1/1" : "3/4" }}
              onClick={() => setLightboxIdx(i)}>
              <Image src={photo} alt={`${model.name} photo ${i + 1}`} fill
                className="gallery-img object-cover"
                sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw, 20vw" />
              <div className="gallery-hover-icon">
                <div className="w-10 h-10 rounded-full border border-yellow-500/60 flex items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.6)" }}>
                  <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
              <span className="absolute bottom-2 right-2 font-josefin text-[8px] tracking-[2px] text-white/30">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Back */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <Link href={backPath}
          className="inline-flex items-center gap-2 font-josefin text-[9px] tracking-[3px] uppercase text-gray-600 hover:text-yellow-500 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to {backLabel}
        </Link>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.96)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setLightboxIdx(null); }}>
          <button
            className="absolute top-4 right-5 font-josefin text-yellow-400 text-lg w-9 h-9 border border-yellow-500/30 flex items-center justify-center hover:bg-yellow-500/10 transition-colors z-10"
            onClick={() => setLightboxIdx(null)}>✕</button>
          <div className="absolute top-5 left-1/2 -translate-x-1/2 font-josefin text-[9px] tracking-[4px] uppercase text-yellow-600/50">
            {lightboxIdx + 1} / {model.photos.length}
          </div>
          <button
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 border border-yellow-500/25 text-yellow-400 text-xl flex items-center justify-center hover:bg-yellow-500/10 transition-colors"
            onClick={() => setLightboxIdx((i) => (i - 1 + model.photos.length) % model.photos.length)}>‹</button>
          <div className="relative max-w-2xl w-full" style={{ maxHeight: "88vh" }}>
            <Image src={model.photos[lightboxIdx]} alt={`${model.name} photo ${lightboxIdx + 1}`}
              width={900} height={1200} className="object-contain w-full h-full"
              style={{ maxHeight: "88vh" }} priority />
          </div>
          <button
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 border border-yellow-500/25 text-yellow-400 text-xl flex items-center justify-center hover:bg-yellow-500/10 transition-colors"
            onClick={() => setLightboxIdx((i) => (i + 1) % model.photos.length)}>›</button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 max-w-xs sm:max-w-md overflow-x-auto px-2">
            {model.photos.map((p, i) => (
              <div key={i} onClick={() => setLightboxIdx(i)}
                className={`relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 overflow-hidden cursor-pointer transition-all ${
                  i === lightboxIdx ? "border border-yellow-400" : "border border-transparent opacity-40 hover:opacity-70"}`}>
                <Image src={p} alt="" fill className="object-cover" sizes="48px" />
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
