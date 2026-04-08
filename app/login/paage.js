"use client";
import { useState } from "react";
import { auth, googleProvider } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleEmailAuth} className="space-y-4">
          <input type="email" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none" />
          <input type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none" />
          <button type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600 text-white py-2.5 rounded-lg font-medium transition">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <hr className="flex-1 border-gray-200" />
          <span className="text-sm text-gray-400">or</span>
          <hr className="flex-1 border-gray-200" />
        </div>

        <button onClick={handleGoogle}
          className="w-full border border-gray-300 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2">
          <img src="https://www.google.com/favicon.ico" width={16} height={16} alt="G" />
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-500 mt-5">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => setIsLogin(!isLogin)}
            className="text-rose-500 font-medium ml-1">
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}



npm install razorpay



RAZORPAY_KEY_ID=rzp_test_AAPKI_KEY_ID
RAZORPAY_KEY_SECRET=AAPKI_KEY_SECRET
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_AAPKI_KEY_ID


import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    const { amount } = await req.json();

    const order = await razorpay.orders.create({
      amount: amount * 100, // paise mein (₹1 = 100 paise)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return NextResponse.json({ orderId: order.id, amount: order.amount });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


const handlePayment = async () => {
    try {
      // Step 1: Order create karo backend se
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalSelectedPhotos * 100 }), // ← apni price logic yahan
      });
      const { orderId, amount } = await res.json();
  
      // Step 2: Razorpay checkout open karo
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount,
        currency: "INR",
        name: "SKG Production",
        description: "Photo Booking Payment",
        order_id: orderId,
        handler: function (response) {
          // Payment success
          deductPhotos(totalSelectedPhotos);
          clearCart();
          setCheckedOut(true);
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#f43f5e", // rose-500
        },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        alert("Payment failed: " + response.error.description);
      });
      rzp.open();
    } catch (err) {
      alert("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  <Script
  src="https://checkout.razorpay.com/v1/checkout.js"
  strategy="beforeInteractive"
/>

<button
  onClick={handlePayment}
  className="w-full bg-rose-500 hover:bg-rose-600 text-white py-4 rounded-2xl font-bold text-lg transition-all hover:shadow-lg hover:shadow-rose-200 mb-3"
>
  Confirm Booking 🎉
</button>
import Script from "next/script";

// Agar ₹100 per photo hai toh:
body: JSON.stringify({ amount: totalSelectedPhotos * 100 })

// Agar fixed amount hai jaise ₹999:
body: JSON.stringify({ amount: 999 })