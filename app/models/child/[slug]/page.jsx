"use client";

import { notFound } from "next/navigation";
import ModelDetailView from "../../../Components/ModelDetailView/ModelDetailView";
import { childModels } from "../../../../data/childModels";

export default function ChildModelDetailPage({ params }) {
  const model = childModels.find((m) => m.slug === params.slug);
  if (!model) notFound();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Josefin+Sans:wght@300;400;600&display=swap');
        .font-playfair { font-family:'Playfair Display',serif; }
        .font-josefin  { font-family:'Josefin Sans',sans-serif; }
        .gold-text { background:linear-gradient(135deg,#c9a84c,#f5d98b,#c9a84c);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .page-enter { animation:pageIn .5s ease both; }
        @keyframes pageIn { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .gallery-img { transition:transform .5s ease,filter .4s; }
        .gallery-item:hover .gallery-img { transform:scale(1.06);filter:brightness(.7); }
        .gallery-hover-icon { opacity:0;transition:opacity .3s;position:absolute;inset:0;display:flex;align-items:center;justify-content:center; }
        .gallery-item:hover .gallery-hover-icon { opacity:1; }
        .stat-bar { animation:statIn .6s ease both; }
        @keyframes statIn { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }
        .book-btn-glow:hover { box-shadow:0 0 25px rgba(201,168,76,.35); }
      `}</style>
      <ModelDetailView
        model={model}
        backPath="/models/child"
        backLabel="Child Models"
      />
    </>
  );
}
