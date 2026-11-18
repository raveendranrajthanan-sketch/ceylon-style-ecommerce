
import { useState, useEffect } from "react";

function useCart() {
  // Load cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("ceylonCart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("ceylonCart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add product to cart
  const addToCart = (product) => {
    setCartItems((previousCart) => {
      const existing = previousCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        if (existing.quantity >= product.stock) {
          return previousCart;
        }

        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      if (product.stock <= 0) {
        return previousCart;
      }

      return [...previousCart, { ...product, quantity: 1 }];
    });
  };

  // Update product quantity
  const updateQuantity = (id, change) => {
    setCartItems((previousCart) =>
      previousCart.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;

          if (newQuantity < 1 || newQuantity > item.stock) {
            return item;
          }

          return { ...item, quantity: newQuantity };
        }

        return item;
      })
    );
  };

  // Remove product
  const removeFromCart = (id) => {
    setCartItems((previousCart) =>
      previousCart.filter((item) => item.id !== id)
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total cart count
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
  };
}

export default useCart;
