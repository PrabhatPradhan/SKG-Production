"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "./Navbar.css";
import Image from "next/image";
import { useCart } from "../../../lib/CartContext"; // ✅ apna sahi path check karna
import { FiLogOut } from "react-icons/fi";
import { auth } from "../../../lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Photos",
    href: "#",
    dropdown: [
      { label: "Portfolio Shoot", href: "/photos/portfolio", icon: "🖼" },
      { label: "Makeup Shoot", href: "/photos/makeup", icon: "💄" },
      { label: "Baby Shoot", href: "/photos/baby", icon: "👶" },
      { label: "Product Shoot", href: "/photos/product", icon: "📦" },
      { label: "Ecommerce Shoot", href: "/photos/ecommerce", icon: "🛒" },
      { label: "Outdoor Shoot", href: "/photos/outdoor", icon: "🌿" },
    ],
  },
  {
    label: "Models",
    href: "#",
    dropdown: [
      { label: "Man", href: "/models/man", icon: "👨" },
      { label: "Woman", href: "/models/woman", icon: "👩" },
      { label: "Child", href: "/models/child", icon: "👧" },
    ],
  },
  {
    label: "Influencer", href: "/influencer", 
  },
  { label: "Cart", href: "/cart", cartBadge: true }, // ✅ cartBadge flag added
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [user, setUser] = useState(null);
const [loginData, setLoginData] = useState({ email: "", password: "" });
const [signupData, setSignupData] = useState({
  name: "",
  email: "",
  password: "",
});
useEffect(() => {
  const unsub = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return () => unsub();
}, []);
const handleLogin = async (e) => {
  e.preventDefault();
  try {
    await signInWithEmailAndPassword(
      auth,
      loginData.email,
      loginData.password
    );

    setMessage("✅ Login Successful!");
    setTimeout(() => {
      setOpen(false);
      setMessage("");
    }, 1500);
  } catch (error) {
    setMessage(error.message);
  }
};
const handleSignup = async (e) => {
  e.preventDefault();
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      signupData.email,
      signupData.password
    );

    await updateProfile(res.user, {
      displayName: signupData.name,
    });

    setMessage("✅ Signup Successful!");
    setTimeout(() => {
      setOpen(false);
      setMessage("");
    }, 1500);
  } catch (error) {
    setMessage(error.message);
  }
};
const handleLogout = async () => {
  await signOut(auth);
};
useEffect(() => {
  const openLoginModal = () => setOpen(true);
  window.addEventListener("openLogin", openLoginModal);

  return () => window.removeEventListener("openLogin", openLoginModal);
}, []);
const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("login");

  const { availablePhotos } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef(null);

  const { cartItems } = useCart(); // ✅ cart items lo
  const cartCount = cartItems.length; // ✅ count

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target))
        setActiveDropdown(null);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <>
      <nav
        ref={ref}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: scrolled
            ? "rgba(250,248,245,0.99)"
            : "rgba(250,248,245,0.96)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
          boxShadow: scrolled ? "0 2px 24px rgba(92,74,42,0.08)" : "none",
          transition: "all 0.3s ease",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Top gold line */}
        <div className="nav-top-line" />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: 64,
            }}
          >
            {/* ── LOGO ── */}
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                textDecoration: "none",
              }}
            >
              <Image
                src="/black-logo.png"
                alt="Logo"
                width={120}
                height={40}
                priority
              />
            </Link>

            {/* ── DESKTOP LINKS ── */}
            <div
              style={{ display: "flex", alignItems: "center", gap: 0 }}
              className="skg-desktop-nav"
            >
              {navLinks.map((link) => (
                <div key={link.label} style={{ position: "relative" }}>
                  {link.dropdown ? (
                    <>
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === link.label ? null : link.label
                          )
                        }
                        className="nav-underline"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 11,
                          letterSpacing: 2,
                          textTransform: "uppercase",
                          color:
                            activeDropdown === link.label
                              ? "var(--gold)"
                              : "var(--text2)",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "8px 14px",
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          transition: "color 0.2s",
                        }}
                      >
                        {link.label}
                        <svg
                          width={10}
                          height={10}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          style={{
                            transition: "transform 0.2s",
                            transform:
                              activeDropdown === link.label
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                          }}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>

                      {activeDropdown === link.label && (
                        <div
                          className="dropdown-enter"
                          style={{
                            position: "absolute",
                            top: "calc(100% + 8px)",
                            left: "50%",
                            transform: "translateX(-50%)",
                            minWidth: 160,
                            background: "rgba(250,248,245,0.99)",
                            border: "1px solid var(--border)",
                            boxShadow: "0 8px 32px rgba(92,74,42,0.1)",
                            zIndex: 200,
                          }}
                        >
                          <div
                            style={{
                              height: 1,
                              background:
                                "linear-gradient(90deg,transparent,var(--gold2),transparent)",
                              opacity: 0.5,
                            }}
                          />
                          {link.dropdown.map((item, i) => (
                            <Link
                              key={i}
                              href={item.href}
                              onClick={() => setActiveDropdown(null)}
                              className="dropdown-item"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "10px 18px",
                                fontSize: 10,
                                letterSpacing: 2,
                                textTransform: "uppercase",
                                color: "var(--text2)",
                                textDecoration: "none",
                                borderBottom:
                                  i < link.dropdown.length - 1
                                    ? "1px solid rgba(214,206,191,0.4)"
                                    : "none",
                                transition: "all 0.15s",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: 14,
                                  width: 18,
                                  textAlign: "center",
                                }}
                              >
                                {item.icon}
                              </span>
                              {item.label}
                            </Link>
                          ))}
                          <div
                            style={{
                              height: 1,
                              background:
                                "linear-gradient(90deg,transparent,var(--gold2),transparent)",
                              opacity: 0.5,
                            }}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    // ✅ NON-DROPDOWN LINK WITH CART BADGE
                    <Link
                      href={link.href}
                      className="nav-underline"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 11,
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        color: "var(--text2)",
                        textDecoration: "none",
                        padding: "8px 14px",
                        display: "block",
                        transition: "color 0.2s",
                        position: "relative", // ✅ badge ke liye zaroori
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--gold)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--text2)")
                      }
                    >
                      {link.label}

                      {/* ✅ CART BADGE - sirf Cart link pe aur count > 0 ho tab */}
                      {link.cartBadge && cartCount > 0 && (
                        <span
                          style={{
                            position: "absolute",
                            top: 2,
                            right: 4,
                            background: "#f43f5e",
                            color: "#fff",
                            fontSize: 9,
                            fontWeight: 700,
                            borderRadius: "50%",
                            width: 16,
                            height: 16,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            lineHeight: 1,
                            pointerEvents: "none",
                          }}
                        >
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  )}
                </div>
              ))}

              {/* Divider */}
              <div
                style={{
                  width: 1,
                  height: 20,
                  background: "var(--border)",
                  margin: "0 8px",
                }}
              />

              {/* CTA */}
              <Link
                href="/contact"
                className="cta-btn"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  letterSpacing: 2.5,
                  textTransform: "uppercase",
                  padding: "9px 22px",
                  background: "var(--text)",
                  color: "var(--cream)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span>{availablePhotos.toLocaleString()}</span>
              </Link>
            </div>
            <div>
            {!user ? (
  <button
    onClick={() => setOpen(true)}
    className="px-6 py-2.5 rounded-full border border-yellow-500 
    text-yellow-500 font-medium tracking-wide
    hover:bg-yellow-500 hover:text-black 
    hover:shadow-md hover:scale-[1.03]
    transition-all duration-300"
  >
    Login
  </button>
) : (
  <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full shadow-sm">

    {/* USER AVATAR */}
    <div className="w-8 h-8 rounded-full bg-yellow-500 text-black flex items-center justify-center text-sm font-bold">
      {(user.displayName || user.email)?.charAt(0).toUpperCase()}
    </div>

    {/* USER NAME */}
    <span className="text-sm font-semibold text-gray-700 max-w-[120px] truncate">
      {user.displayName || user.email}
    </span>

    {/* LOGOUT */}
    <button
      onClick={handleLogout}
      className="p-1.5 rounded-full hover:bg-red-100 text-red-500 transition"
      title="Logout"
    >
      <FiLogOut size={18} />
    </button>

  </div>
)}
</div>

    
     {/* MODAL */}
{open && (
  <div
  style={{marginTop:"15rem"}}
    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
    onClick={(e) => {
      if (e.target === e.currentTarget) setOpen(false);
    }}
  >
    <div className="bg-white text-black w-[90%] max-w-md rounded-2xl p-6 relative shadow-2xl border border-gray-200">

      {/* GOLD TOP LINE */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-t-2xl"></div>

      {/* CLOSE */}
      <button
        className="absolute top-3 right-4 text-lg text-gray-400 hover:text-yellow-500 transition"
        onClick={() => setOpen(false)}
      >
        ✕
      </button>

      {/* TITLE */}
      <h2 className="text-xl font-semibold mb-4 text-center">
        Welcome <span className="text-yellow-500">Back</span>
      </h2>

      {/* TABS */}
      <div className="flex mb-5 border-b border-gray-200">
        <button
          onClick={() => setTab("login")}
          className={`flex-1 py-2 font-medium transition ${
            tab === "login"
              ? "text-yellow-600 border-b-2 border-yellow-500"
              : "text-gray-500 hover:text-yellow-500"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setTab("signup")}
          className={`flex-1 py-2 font-medium transition ${
            tab === "signup"
              ? "text-yellow-600 border-b-2 border-yellow-500"
              : "text-gray-500 hover:text-yellow-500"
          }`}
        >
          Signup
        </button>
      </div>
      {message && (
  <p className="text-center text-sm text-green-500 mt-2">
    {message}
  </p>
)}
      {/* LOGIN */}
      {tab === "login" && (
      <form onSubmit={handleLogin} className="flex flex-col gap-4">

      <input
        type="email"
        placeholder="Email"
        value={loginData.email}
        onChange={(e) =>
          setLoginData({ ...loginData, email: e.target.value })
        }
        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 
        focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 
        transition duration-300 text-sm placeholder-gray-400"
      />
    
      <input
        type="password"
        placeholder="Password"
        value={loginData.password}
        onChange={(e) =>
          setLoginData({ ...loginData, password: e.target.value })
        }
        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 
        focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 
        transition duration-300 text-sm placeholder-gray-400"
      />
    
      <button
        type="submit"
        className="mt-2 w-full py-3 rounded-xl font-semibold 
        bg-gradient-to-r from-yellow-400 to-yellow-500 
        text-black hover:scale-[1.02] hover:shadow-lg 
        transition duration-300"
      >
        Login
      </button>
    
    </form>
      )}

      {/* SIGNUP */}
      {tab === "signup" && (
     <form onSubmit={handleSignup} className="flex flex-col gap-4">

     <input
       type="text"
       placeholder="Full Name"
       value={signupData.name}
       onChange={(e) =>
         setSignupData({ ...signupData, name: e.target.value })
       }
       className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 
       focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 
       transition duration-300 text-sm placeholder-gray-400"
     />
   
     <input
       type="email"
       placeholder="Email Address"
       value={signupData.email}
       onChange={(e) =>
         setSignupData({ ...signupData, email: e.target.value })
       }
       className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 
       focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 
       transition duration-300 text-sm placeholder-gray-400"
     />
   
     <input
       type="password"
       placeholder="Password"
       value={signupData.password}
       onChange={(e) =>
         setSignupData({ ...signupData, password: e.target.value })
       }
       className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 
       focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 
       transition duration-300 text-sm placeholder-gray-400"
     />
   
     <button
       type="submit"
       className="mt-2 w-full py-3 rounded-xl font-semibold 
       bg-gradient-to-r from-yellow-400 to-yellow-500 
       text-black hover:scale-[1.02] hover:shadow-lg 
       transition duration-300"
     >
       Create Account
     </button>
   
   </form>
      )}
    </div>
  </div>
)}
            {/* ── HAMBURGER ── */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: "none",
                flexDirection: "column",
                gap: 5,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 8,
              }}
              className="skg-hamburger"
            >
              <span
                style={{
                  display: "block",
                  height: 1,
                  width: 24,
                  background: "var(--text)",
                  transition: "all 0.3s",
                  transform: menuOpen
                    ? "rotate(45deg) translate(4px,4px)"
                    : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  height: 1,
                  width: 16,
                  background: "var(--text)",
                  transition: "all 0.3s",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  height: 1,
                  width: 24,
                  background: "var(--text)",
                  transition: "all 0.3s",
                  transform: menuOpen
                    ? "rotate(-45deg) translate(4px,-4px)"
                    : "none",
                }}
              />
            </button>
          </div>
        </div>

        {/* Bottom line */}
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(90deg,transparent,rgba(196,162,101,0.3),transparent)",
          }}
        />

        {/* ── MOBILE MENU ── */}
        {menuOpen && (
          <div
            className="mobile-menu-anim"
            style={{
              background: "rgba(250,248,245,0.99)",
              backdropFilter: "blur(12px)",
              borderTop: "1px solid var(--border)",
              padding: "8px 0 16px",
            }}
          >
            <div
              style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}
            >
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.dropdown ? (
                    <>
                      <div
                        style={{
                          padding: "12px 0",
                          fontSize: 11,
                          letterSpacing: 2,
                          textTransform: "uppercase",
                          color: "var(--text2)",
                          borderBottom: "1px solid rgba(214,206,191,0.3)",
                        }}
                      >
                        {link.label}
                      </div>
                      {link.dropdown.map((item, i) => (
                        <Link
                          key={i}
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className="mobile-link-item"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "10px 16px",
                            fontSize: 10,
                            letterSpacing: 2,
                            textTransform: "uppercase",
                            color: "var(--text3)",
                            textDecoration: "none",
                            borderBottom: "1px solid rgba(214,206,191,0.2)",
                            transition: "all 0.15s",
                          }}
                        >
                          <span style={{ fontSize: 14 }}>{item.icon}</span>
                          {item.label}
                        </Link>
                      ))}
                    </>
                  ) : (
                    // ✅ MOBILE CART BADGE
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="mobile-link-item"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 0",
                        fontSize: 11,
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        color: "var(--text2)",
                        textDecoration: "none",
                        borderBottom: "1px solid rgba(214,206,191,0.3)",
                        transition: "all 0.15s",
                      }}
                    >
                      {link.label}

                      {/* ✅ MOBILE BADGE */}
                      {link.cartBadge && cartCount > 0 && (
                        <span
                          style={{
                            background: "#f43f5e",
                            color: "#fff",
                            fontSize: 9,
                            fontWeight: 700,
                            borderRadius: "50%",
                            width: 18,
                            height: 18,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  )}
                </div>
              ))}

              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  marginTop: 16,
                  textAlign: "center",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 10,
                  letterSpacing: 2.5,
                  textTransform: "uppercase",
                  padding: "13px",
                  background: "var(--text)",
                  color: "var(--cream)",
                  textDecoration: "none",
                }}
              >
                Book a Session
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
