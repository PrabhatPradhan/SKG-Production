"use client";
import { useCart } from "../../lib/CartContext";
import Link from "next/link";
import { useState ,useEffect } from "react";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
export default function CartPage() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);
  
  const { cartItems, removeFromCart, clearCart, totalItems,deductPhotos, availablePhotos, } = useCart();
  const [checkedOut, setCheckedOut] = useState(false);
  const [photoCounts, setPhotoCounts] = useState(() => {
    const initial = {};
    cartItems.forEach(item => { initial[item.id] = item.photos || 1; });
    return initial;
  });
  
  const totalSelectedPhotos = cartItems.reduce(
    (sum, item) => sum + (photoCounts[item.id] || 1), 0
  );
  const pricePerPhoto = 200;

  const updatePhotoCount = (id, delta) => {
    setPhotoCounts(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  const getItemTotal = (item) => (photoCounts[item.id] || 1) * pricePerPhoto;

  const cartSubtotal = cartItems.reduce((sum, item) => sum + getItemTotal(item), 0);

  if (checkedOut) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6">🎉</div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">Booking Confirmed!</h1>
          <p className="text-gray-500 text-lg mb-8">
            Thank you for choosing LensLux! Our team will contact you within 24 hours to schedule your session.
          </p>
          <Link
            href="/"
            className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-2xl font-bold text-lg inline-block transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6">🛒</div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-500 text-lg mb-8">
            Explore our photography packages and add your favorite to get started!
          </p>
          <Link
            href="/"
            className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-2xl font-bold text-lg inline-block transition-colors"
          >
            Browse Packages
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-black text-gray-900">Your Cart</h1>
            <p className="text-gray-500 mt-1">{totalItems} package{totalItems > 1 ? "s" : ""} selected</p>
          </div>
          <button
            onClick={clearCart}
            className="text-sm text-gray-400 hover:text-red-500 transition-colors font-medium"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex gap-5"
              >
                {/* Image */}
                <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-semibold text-rose-500 uppercase tracking-wide">{item.category} Shoot</span>
                      <h3 className="font-bold text-gray-900 text-lg leading-tight">{item.name}</h3>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0 p-1"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Duration + Photo Selector */}
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                      ⏱ {item.duration}
                    </span>

                    {/* Photo Selector */}
                    <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-lg">
                      <span className="text-sm text-gray-500">📷</span>
                      <button
                        onClick={() => updatePhotoCount(item.id, -1)}
                        className="w-5 h-5 flex items-center justify-center bg-white rounded border border-gray-200 text-gray-600 hover:bg-gray-50 font-bold text-sm"
                      >
                        −
                      </button>
                      <span className="text-sm font-semibold text-gray-700 min-w-[18px] text-center">
                        {photoCounts[item.id] || 1}
                      </span>
                      <button
                        onClick={() => updatePhotoCount(item.id, +1)}
                        className="w-5 h-5 flex items-center justify-center bg-white rounded border border-gray-200 text-gray-600 hover:bg-gray-50 font-bold text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Dynamic Price */}
                  <div className="mt-3">
                    <span className="text-xs text-gray-400">
                      ₹200 × {photoCounts[item.id] || 1} photos
                    </span>
                    <div className="text-2xl font-black text-gray-900">
                      ₹{getItemTotal(item).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-black text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-gray-600">
                    <div className="truncate mr-2">
                      <p className="truncate">{item.name}</p>
                      <p className="text-xs text-gray-400">{photoCounts[item.id] || 1} photos</p>
                    </div>
                    <span className="font-semibold flex-shrink-0">
                      ₹{getItemTotal(item).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (18%)</span>
                  <span>₹{Math.round(cartSubtotal * 0.18).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-black text-xl text-gray-900 pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span>₹{Math.round(cartSubtotal * 1.18).toLocaleString()}</span>
                </div>
              </div>

              <button
             onClick={() => {
              if (!user) {
                alert("⚠️ Please login first to continue booking");
                window.dispatchEvent(new Event("openLogin")); // popup open trigger
                return;
              }
            
              // ✅ user logged in → continue
              deductPhotos(totalSelectedPhotos);
              clearCart();
              setCheckedOut(true);
            }}
                 
                className="w-full bg-rose-500 hover:bg-rose-600 text-white py-4 rounded-2xl font-bold text-lg transition-all hover:shadow-lg hover:shadow-rose-200 mb-3"
              >
                Confirm Booking 🎉
              </button>

              <Link
                href="/"
                className="block text-center text-sm text-gray-400 hover:text-gray-900 transition-colors font-medium py-2"
              >
                ← Continue Browsing
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}