"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("photoCart");
    if (saved) setCartItems(JSON.parse(saved));
  }, []);

  const saveCart = (items) => {
    setCartItems(items);
    localStorage.setItem("photoCart", JSON.stringify(items));
  };

  const addToCart = (item) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      const updated = exists ? prev : [...prev, { ...item, quantity: 1 }];
      localStorage.setItem("photoCart", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (id) => {
    const updated = cartItems.filter((i) => i.id !== id);
    saveCart(updated);
  };

  const clearCart = () => saveCart([]);

  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
