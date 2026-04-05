"use client";
import { use } from "react";
import { shootCategories } from "../../../../lib/data";
import { useCart } from "../../../../lib/CartContext";
import Link from "next/link";
import { useState } from "react";

export default function PackageDetailPage({ params }) {
  const { slug, packageId } = use(params); // ✅ use() se unwrap karo

  const cat = shootCategories[slug];
  const pkg = cat?.packages.find((p) => p.id === packageId);

  const [activeImage, setActiveImage] = useState(0);
  const [booked, setBooked] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart, cartItems } = useCart();
  const inCart = cartItems.some((i) => i.id === pkg?.id);

  if (!cat || !pkg) return null; // ✅ notFound() hooks ke baad call nahi ho sakta

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
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-rose-500">Home</Link>
          <span>/</span>
          <Link href={`/photos/${slug}`} className="hover:text-rose-500">{cat.title}</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{pkg.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="relative rounded-3xl overflow-hidden mb-4 aspect-square md:aspect-[4/3]">
              <img
                src={pkg.images[activeImage]}
                alt={pkg.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-rose-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  {cat.icon} {cat.title}
                </span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-3">
              {pkg.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`rounded-2xl overflow-hidden aspect-square transition-all ${
                    activeImage === i
                      ? "border-4 border-rose-500 scale-95 shadow-lg"
                      : "border-2 border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-start">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h1 className="text-4xl font-black text-gray-900 mb-2">{pkg.name}</h1>
              <p className="text-gray-500 mb-6 leading-relaxed text-lg">{pkg.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-rose-50 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-black text-rose-600">{pkg.duration}</div>
                  <div className="text-sm text-gray-500 font-medium">Session Length</div>
                </div>
                <div className="bg-rose-50 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-black text-rose-600">{pkg.photos}</div>
                  <div className="text-sm text-gray-500 font-medium">Delivered</div>
                </div>
              </div>

              {/* Includes */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 text-lg mb-4">What's Included</h3>
                <div className="space-y-3">
                  {pkg.includes.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-700">
                      <span className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="border-t border-gray-100 pt-6 mb-6">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-sm text-gray-400 block">Package Price</span>
                    <span className="text-5xl font-black text-gray-900">₹{pkg.price.toLocaleString()}</span>
                    <span className="text-gray-400 text-sm"> + taxes</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-emerald-600 font-semibold">✓ Free Cancellation</div>
                    <div className="text-sm text-emerald-600 font-semibold">✓ 48hr Delivery</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setBooked(true)}
                  className="w-full bg-rose-500 hover:bg-rose-600 text-white py-4 rounded-2xl font-bold text-lg transition-all hover:shadow-lg hover:shadow-rose-200"
                >
                  {booked ? "✓ Booking Confirmed! We'll call you soon." : "📅 Book Now"}
                </button>
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-4 rounded-2xl font-bold text-lg border-2 transition-all ${
                    inCart || added
                      ? "bg-emerald-50 border-emerald-400 text-emerald-600"
                      : "border-rose-300 text-rose-500 hover:bg-rose-50"
                  }`}
                >
                  {added ? "✓ Added to Cart!" : inCart ? "✓ Already in Cart" : "🛒 Add to Cart"}
                </button>
                <Link
                  href="/cart"
                  className="w-full text-center py-3 rounded-2xl font-semibold text-gray-500 hover:text-gray-900 transition-colors text-sm"
                >
                  View Cart →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}