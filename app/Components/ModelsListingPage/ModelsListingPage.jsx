"use client";

import { useState } from "react";
 
import ModelCard from "../ModelCard/ModelCard";
export default function ModelsListingPage({ models, title, subtitle, filters, basePath }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? models
      : models.filter((m) => m.tag === activeFilter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Josefin+Sans:wght@300;400;600&display=swap');
        .font-playfair { font-family:'Playfair Display',serif; }
        .font-josefin  { font-family:'Josefin Sans',sans-serif; }
        .gold-text {
          background:linear-gradient(135deg,#c9a84c,#f5d98b,#c9a84c);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
        }
        .card-enter { animation:cardIn .55s ease both; }
        @keyframes cardIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .card-img { transition:transform .65s cubic-bezier(.25,.46,.45,.94),filter .4s; }
        .model-card:hover .card-img { transform:scale(1.07); filter:brightness(.65); }
        .card-overlay { opacity:0; transition:opacity .35s; }
        .model-card:hover .card-overlay { opacity:1; }
        .card-info { transform:translateY(10px); transition:transform .35s; }
        .model-card:hover .card-info { transform:translateY(0); }
      `}</style>

      <main
        className="min-h-screen pt-20"
        style={{ background: "linear-gradient(160deg,#080808 0%,#100e06 50%,#080808 100%)" }}
      >
        {/* Hero Header */}
        <section className="text-center px-4 pt-10 pb-8">
          <p className="font-josefin text-[10px] tracking-[6px] text-yellow-600/60 uppercase mb-3">
            SKG Production · Elite Roster
          </p>
          <h1 className="font-playfair font-black text-5xl sm:text-7xl lg:text-8xl gold-text leading-none mb-4">
            {title}
          </h1>
          <div className="mx-auto w-24 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent mb-3" />
          <p className="font-josefin text-xs text-gray-600 tracking-widest uppercase">
            {subtitle || `${models.length} Models Available`}
          </p>
        </section>

        {/* Filter Bar */}
        <div className="flex justify-center gap-2 flex-wrap px-4 pb-8">
          {["all", ...filters].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`font-josefin text-[9px] tracking-[3px] uppercase px-5 py-2 border transition-all duration-250 ${
                activeFilter === f
                  ? "border-yellow-500 text-yellow-400"
                  : "border-yellow-500/15 text-gray-600 hover:border-yellow-500/40 hover:text-yellow-500/70"
              }`}
              style={activeFilter === f ? { background: "rgba(201,168,76,0.07)" } : {}}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-1.5 sm:px-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 sm:gap-2">
            {filtered.map((model, i) => (
              <ModelCard key={model.id} model={model} index={i} basePath={basePath} />
            ))}
          </div>
        </div>

        <div className="h-20" />
      </main>
    </>
  );
}
