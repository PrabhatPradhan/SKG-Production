"use client";
import { useCart } from "../../lib/CartContext";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart, totalPrice, totalItems } = useCart();
  const [checkedOut, setCheckedOut] = useState(false);

  if (checkedOut) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 ">
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
      <div className="min-h-screen flex items-center justify-center px-4  ">
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

                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">⏱ {item.duration}</span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">📷 {item.photos}</span>
                  </div>

                  <div className="mt-3">
                    <span className="text-2xl font-black text-gray-900">₹{item.price.toLocaleString()}</span>
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
                    <span className="truncate mr-2">{item.name}</span>
                    <span className="font-semibold flex-shrink-0">₹{item.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (18%)</span>
                  <span>₹{Math.round(totalPrice * 0.18).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-black text-xl text-gray-900 pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span>₹{Math.round(totalPrice * 1.18).toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => { clearCart(); setCheckedOut(true); }}
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

              {/* Trust Badges */}
              {/* <div className="mt-6 pt-6 border-t border-gray-100 space-y-2">
                {["🔒 Secure Payment", "✓ Free Cancellation 48hrs", "📞 Dedicated Support"].map((badge) => (
                  <div key={badge} className="text-xs text-gray-400 flex items-center gap-2">{badge}</div>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
