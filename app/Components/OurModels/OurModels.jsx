"use client";

import Link from "next/link";

const models = [
  {
    title: "Men Models",
    desc: "Strong presence, refined expressions, and versatile looks for fashion, commercial, and editorial shoots.",
    path: "/models/man",
    img: "https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg"
  },
  {
    title: "Women Models",
    desc: "Elegance, confidence, and high-fashion aesthetics tailored for brands, campaigns, and editorials.",
    path: "/models/woman",
    img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
  },
  {
    title: "Child Models",
    desc: "Natural charm and joyful expressions perfect for lifestyle, kidswear, and commercial storytelling.",
    path: "/models/child",
    img: "https://images.pexels.com/photos/3662630/pexels-photo-3662630.jpeg"
  }
];

export default function OurModelsSection() {
  return (
    <section className="models-section py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <p className="text-xs tracking-[4px] text-[#c4a265] uppercase mb-3">
          Our Models
        </p>

        <h2 className="text-4xl md:text-5xl font-serif mb-4 text-[#1c1917]">
          Discover Our <span className="text-[#8b6f3e] italic">Talent</span>
        </h2>

        <div className="w-12 h-[1px] bg-gradient-to-r from-[#c4a265] to-transparent mx-auto mb-12"></div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {models.map((m, i) => (
            <Link key={m.title} href={m.path}>
              <div className="group relative overflow-hidden bg-[#faf8f5] border border-[#e8e2d9] cursor-pointer transition-all duration-500 hover:shadow-xl">

                {/* Image */}
                <div className="h-[380px] overflow-hidden">
                  <img
                    src={m.img}
                    alt={m.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
                  <span className="text-white text-sm tracking-widest border border-white px-4 py-2">
                    VIEW PORTFOLIO
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 text-left">
                  <h3 className="text-xl font-serif mb-2 text-[#1c1917] group-hover:text-[#8b6f3e] transition">
                    {m.title}
                  </h3>

                  <p className="text-sm text-[#6b6257] leading-relaxed">
                    {m.desc}
                  </p>
                </div>

              </div>
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}