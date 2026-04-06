"use client";
import Link from "next/link";

const shoots = [
  {
    slug: "portfolio",
    title: "Portfolio Shoot",
    description: "Build a powerful personal brand with curated professional shots that speak before you do.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
    tag: "Most Popular",
    from: 4999,
  },
  {
    slug: "makeup",
    title: "Makeup Shoot",
    description: "Capture every flawless detail with precision lighting crafted for beauty portfolios.",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
    tag: "Trending",
    from: 3999,
  },
  {
    slug: "baby",
    title: "Baby Shoot",
    description: "Preserve precious milestones with gentle, safe sessions your family will cherish forever.",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80",
    tag: "Fan Favourite",
    from: 5999,
  },
  {
    slug: "product",
    title: "Product Shoot",
    description: "Make your products sell themselves with clean, compelling commercial photography.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    tag: "For Brands",
    from: 2999,
  },
  {
    slug: "ecommerce",
    title: "Ecommerce Shoot",
    description: "Marketplace-ready bulk photography that drives clicks and boosts conversion rates.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
    tag: "Best Value",
    from: 4999,
  },
  {
    slug: "outdoor",
    title: "Outdoor Shoot",
    description: "Golden hour magic and scenic backdrops that bring natural energy to your story.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    tag: "New",
    from: 3999,
  },
];

export default function ShootCards() {
  return (
    <section className="skg-shoot-section">
      <div className="skg-shoot-header">
       
        <h2 className="skg-shoot-heading">Choose Your Session</h2>
        <p className="skg-shoot-sub">
          Six signature experiences. One studio. Endless possibilities.
        </p>
      </div>

      <div className="skg-shoot-grid">
        {shoots.map((shoot) => (
          <div key={shoot.slug} className="skg-card">
            {/* Image */}
            <div className="skg-card-img-wrap">
              <img src={shoot.image} alt={shoot.title} className="skg-card-img" />
              <div className="skg-card-overlay" />
              <span className="skg-card-tag">{shoot.tag}</span>
              <div className="skg-card-from">From ₹{shoot.from.toLocaleString()}</div>
            </div>

            {/* Body */}
            <div className="skg-card-body">
              <h3 className="skg-card-title">{shoot.title}</h3>
              <p className="skg-card-desc">{shoot.description}</p>
              <Link href={`/photos/${shoot.slug}`} className="skg-card-btn">
                Book Now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
 
      <style>{`
        .skg-shoot-section {
          padding: 80px 24px;
          background: #faf8f5;
          font-family: 'DM Sans', sans-serif;
        }

        .skg-shoot-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .skg-shoot-eyebrow {
          font-size: 10px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #c4a265;
          margin: 0 0 12px;
          font-weight: 500;
        }

        .skg-shoot-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 700;
          color: #1a1612;
          margin: 0 0 14px;
          letter-spacing: -0.5px;
          line-height: 1.1;
        }

        .skg-shoot-sub {
          font-size: 15px;
          color: #7a6e62;
          margin: 0;
          max-width: 420px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .skg-shoot-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          max-width: 1280px;
          margin: 0 auto;
        }

        .skg-card {
          background: #fff;
          border: 1px solid rgba(196,162,101,0.15);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .skg-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(92,74,42,0.12);
        }

        .skg-card-img-wrap {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .skg-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .skg-card:hover .skg-card-img {
          transform: scale(1.06);
        }

        .skg-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(15,12,8,0.55));
        }

        .skg-card-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #c4a265;
          color: #fff;
          font-size: 9px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          padding: 4px 10px;
          font-weight: 600;
        }

        .skg-card-from {
          position: absolute;
          bottom: 12px;
          right: 12px;
          color: rgba(255,255,255,0.9);
          font-size: 11px;
          letter-spacing: 1px;
          font-weight: 500;
        }

        .skg-card-body {
          padding: 20px 20px 22px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        .skg-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 700;
          color: #1a1612;
          margin: 0;
          letter-spacing: 0.2px;
          line-height: 1.2;
        }

        .skg-card-desc {
          font-size: 12.5px;
          color: #7a6e62;
          line-height: 1.65;
          margin: 0;
          flex: 1;
        }

        .skg-card-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-top: 6px;
          padding: 10px 18px;
          background: #1a1612;
          color: #faf8f5;
          font-size: 10px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          text-decoration: none;
          font-weight: 600;
          transition: background 0.2s ease, gap 0.2s ease;
          align-self: flex-start;
        }

        .skg-card-btn:hover {
          background: #c4a265;
          gap: 12px;
        }

        /* 2 columns on tablet */
        @media (max-width: 1100px) {
          .skg-shoot-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* 1 column on mobile */
        @media (max-width: 600px) {
          .skg-shoot-grid {
            grid-template-columns: 1fr;
          }
          .skg-shoot-section {
            padding: 60px 16px;
          }
        }
      `}</style>
    </section>
  );
}