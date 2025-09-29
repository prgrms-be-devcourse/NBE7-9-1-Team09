'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
};

type CartItem = {
  product: Product;
  qty: number;
};

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  removeFromCart: (productId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    console.log('CartContext: cart state changed:', cart);
  }, [cart]);

  const addToCart = (product: Product, quantity: number) => {
    console.log('CartContext: addToCart called with:', product, quantity);
    setCart((prevCart) => {
      console.log('CartContext: current cart before add:', prevCart);
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        const newCart = prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, qty: item.qty + quantity }
            : item
        );
        console.log('CartContext: updated existing item, new cart:', newCart);
        return newCart;
      }
      const newCart = [...prevCart, { product, qty: quantity }];
      console.log('CartContext: added new item, new cart:', newCart);
      return newCart;
    });
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, qty: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
