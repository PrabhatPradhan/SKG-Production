"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [availablePhotos, setAvailablePhotos] = useState(50000);

  // ✅ Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("photoCart");
    if (saved) setCartItems(JSON.parse(saved));
  }, []);

  // ✅ Save helper
  const saveCart = (items) => {
    setCartItems(items);
    localStorage.setItem("photoCart", JSON.stringify(items));
  };

  // ✅ Add to cart (merge photos)
  const addToCart = (item) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);

      let updated;

      if (exists) {
        updated = prev.map((i) =>
          i.id === item.id
            ? {
                ...i,
                photos: i.photos + item.photos,
                price: (i.photos + item.photos) * 200,
              }
            : i
        );
      } else {
        updated = [...prev, item];
      }

      localStorage.setItem("photoCart", JSON.stringify(updated));
      return updated;
    });
  };

  // ✅ Remove item
  const removeFromCart = (id) => {
    const updated = cartItems.filter((i) => i.id !== id);
    saveCart(updated);
  };

  // ✅ Clear cart
  const clearCart = () => saveCart([]);

  // ✅ 🔥 UPDATE (+ / - button fix)
  const updateCartItem = (id, newPhotos) => {
    const updated = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            photos: newPhotos,
            price: newPhotos * 200,
          }
        : item
    );

    saveCart(updated);
  };

  // ✅ Deduct photos
  const deductPhotos = (count) => {
    setAvailablePhotos((prev) => Math.max(0, prev - count));
  };

  // ✅ Totals (IMPORTANT FIX)
  const totalItems = cartItems.reduce(
    (acc, item) => acc + (item.photos || 0),
    0
  );

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateCartItem, // ✅ added
        totalItems,
        totalPrice,
        availablePhotos,
        deductPhotos,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);