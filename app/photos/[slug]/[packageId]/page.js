"use client";
import { use } from "react";
import { shootCategories } from "../../../../lib/data";
import { useCart } from "../../../../lib/CartContext";
import Link from "next/link";
import { useState } from "react";

export default function PackageDetailPage({ params }) {
  const { slug, packageId } = use(params);

  const cat = shootCategories[slug];
  const pkg = cat?.packages.find((p) => p.id === packageId);

  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { addToCart, cartItems } = useCart();
  const inCart = cartItems.some((i) => i.id === pkg?.id);

  if (!cat || !pkg) return null;

  const handleAddToCart = () => {
    addToCart({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      duration: pkg.duration,
      photos: pkg.photos,
      category: slug,
      image: pkg.images[0],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-[3rem]">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-rose-500">Home</Link>
          <span>/</span>
          <Link href={`/photos/${slug}`} className="hover:text-rose-500">
            {cat.title}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{pkg.name}</span>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT: IMAGE GRID */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-4">
              {pkg.images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setActiveImage(i);
                    setIsOpen(true);
                  }}
                  className="w-[14rem] h-[14rem] rounded-xl overflow-hidden cursor-pointer group"
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: DETAILS */}
          <div className="lg:col-span-1 flex flex-col justify-start">
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">

              <h1 className="text-xl font-black text-gray-900 mb-2">
                {pkg.name}
              </h1>

              <p className="text-gray-500 mb-5 text-sm">
                {pkg.description}
              </p>

              {/* INFO */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-rose-50 rounded-xl p-3 text-center">
                  <div className="text-lg font-black text-rose-600">
                    {pkg.duration}
                  </div>
                  <div className="text-xs text-gray-500">Session</div>
                </div>

                <div className="bg-rose-50 rounded-xl p-3 text-center">
                  <div className="text-lg font-black text-rose-600">
                    {pkg.photos}
                  </div>
                  <div className="text-xs text-gray-500">Photos</div>
                </div>
              </div>

              {/* PRICE */}
              <div className="border-t pt-4 mb-5">
                <span className="text-xs text-gray-400 block">
                  Package Price
                </span>

                <span className="text-2xl font-black text-gray-900">
                  ₹{pkg.price.toLocaleString()}
                </span>

                <div className="text-xs text-emerald-600 mt-2">
                  ✓ Free Cancellation
                </div>
                <div className="text-xs text-emerald-600">
                  ✓ 48hr Delivery
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3 rounded-xl font-bold text-sm border transition ${
                    inCart || added
                      ? "bg-emerald-50 border-emerald-400 text-emerald-600"
                      : "border-rose-300 text-rose-500 hover:bg-rose-50"
                  }`}
                >
                  {added
                    ? "✓ Added!"
                    : inCart
                    ? "✓ In Cart"
                    : "🛒 Add to Cart"}
                </button>

                <Link
                  href="/cart"
                  className="text-center text-sm text-gray-500 hover:text-black"
                >
                  View Cart →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">

          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 text-white text-3xl"
          >
            ✖
          </button>

          <button
            onClick={() =>
              setActiveImage((prev) =>
                prev === 0 ? pkg.images.length - 1 : prev - 1
              )
            }
            className="absolute left-5 text-white text-4xl"
          >
            ‹
          </button>

          <img
            src={pkg.images[activeImage]}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />

          <button
            onClick={() =>
              setActiveImage((prev) =>
                prev === pkg.images.length - 1 ? 0 : prev + 1
              )
            }
            className="absolute right-5 text-white text-4xl"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}