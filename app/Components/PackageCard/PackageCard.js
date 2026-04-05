"use client";
import Link from "next/link";
import { useCart } from "../../../lib/CartContext";
import { useState } from "react";

export default function PackageCard({ pkg, category }) {
  const { addToCart, cartItems } = useCart();
  const [added, setAdded] = useState(false);
  const inCart = cartItems.some((i) => i.id === pkg.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      duration: pkg.duration,
      photos: pkg.photos,
      category,
      image: pkg.images[0],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
      {/* Image */}
      <Link href={`/photos/${category}/${pkg.id}`}>
        <div className="relative overflow-hidden h-56">
          <img
            src={pkg.images[0]}
            alt={pkg.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-3 left-4">
            <span className="bg-white/90 backdrop-blur-sm text-rose-600 text-xs font-bold px-3 py-1 rounded-full">
              {pkg.duration}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {pkg.photos}
            </span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <Link href={`/photos/${category}/${pkg.id}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-rose-600 transition-colors">
            {pkg.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mb-4 leading-relaxed">{pkg.description}</p>

        {/* Includes */}
        <div className="mb-5 space-y-1">
          {pkg.includes.slice(0, 3).map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-emerald-500 font-bold">✓</span>
              {item}
            </div>
          ))}
          {pkg.includes.length > 3 && (
            <div className="text-sm text-rose-500 font-medium">+{pkg.includes.length - 3} more inclusions</div>
          )}
        </div>

        {/* Price & Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-sm text-gray-400">Starting at</span>
            <div className="text-2xl font-black text-gray-900">₹{pkg.price.toLocaleString()}</div>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              href={`/photos/${category}/${pkg.id}`}
              className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-xl font-semibold text-sm transition-colors text-center"
            >
              Book Now
            </Link>
            <button
              onClick={handleAddToCart}
              className={`px-4 py-2 rounded-xl font-semibold text-sm border-2 transition-all text-center ${
                inCart || added
                  ? "bg-emerald-50 border-emerald-400 text-emerald-600"
                  : "border-rose-300 text-rose-500 hover:bg-rose-50"
              }`}
            >
              {added ? "✓ Added!" : inCart ? "✓ In Cart" : "+ Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
