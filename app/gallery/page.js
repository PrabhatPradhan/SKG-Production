"use client";

import { useState, useMemo } from "react";
import { shootCategories } from "../../lib/data";  

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  // 🔥 ALL IMAGES COLLECT
  const allImages = useMemo(() => {
    let imgs = [];

    Object.values(shootCategories).forEach((category) => {
      category.packages.forEach((pkg) => {
        if (pkg.images && pkg.images.length) {
          imgs.push(...pkg.images);
        }
      });
    });

    return imgs;
  }, []);

  // NEXT
  const nextImage = () => {
    setSelectedIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  // PREV
  const prevImage = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="container"  style={{marginTop:"4rem",}}>

      <h2 className="title" style={{fontSize:"1.5rem"}}>All Shoot Gallery</h2>

      {/* GRID */}
      <div className="grid"> 
        {allImages.map((img, index) => (
          <img
            key={index}
            src={img}
            className="img"
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>

      {/* MODAL */}
      {selectedIndex !== null && (
        <div className="modal" onClick={() => setSelectedIndex(null)}>

          {/* CLOSE */}
          <span className="close" onClick={() => setSelectedIndex(null)}>
            ✕
          </span>

          {/* PREV */}
          <button
            className="prev"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            ❮
          </button>

          {/* IMAGE */}
          <img
            src={allImages[selectedIndex]}
            className="modal-img"
            onClick={(e) => e.stopPropagation()}
          />

          {/* NEXT */}
          <button
            className="next"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            ❯
          </button>
        </div>
      )}

      <style jsx>{`
        .container {
          padding: 20px;
         
        }

        .title {
          text-align: center;
          margin-bottom: 20px;
          font-weight: 600;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
        }

        .img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 12px;
          cursor: pointer;
          transition: 0.3s;
        }

        .img:hover {
          transform: scale(1.05);
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
        }

        .modal-img {
          max-width: 85%;
          max-height: 85%;
          border-radius: 12px;
        }

        .close {
          position: absolute;
          top: 20px;
          right: 30px;
          font-size: 45px;
          color: white;
          cursor: pointer;
          background: rgba(0, 0, 0, 0.5);
          padding: 5px 15px;
          border-radius: 50%;
        }

        .prev,
        .next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 40px;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }

        .prev {
          left: 20px;
        }

        .next {
          right: 20px;
        }

        @media (max-width: 768px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .img {
            height: 200px;
          }
        }
      `}</style>
    </div>
  );
}