import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { CartContext } from './CartContext';
import type { CartItem } from './CartContext';

// 模擬商品資料
const mockProducts = [
  { id: 1, name: "iPhone 15 Pro Max", price: 45900, image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80" },
  { id: 2, name: "MacBook Air M2", price: 35900, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" },
  { id: 3, name: "Nike Air Max 270", price: 3200, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80" },
  { id: 4, name: "Samsung 4K Smart TV", price: 28900, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80" },
  { id: 5, name: "Dyson V15 吸塵器", price: 18900, image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80" },
  { id: 6, name: "Lancôme 精華液", price: 2800, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80" },
  { id: 7, name: "Uniqlo 羽絨外套", price: 1200, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80" },
  { id: 8, name: "Apple Watch Series 9", price: 12900, image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=600&q=80" },
];

// Provider 組件
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 儲存購物車到 localStorage
  const saveCart = (items: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(items));
  };

  // 從 localStorage 載入購物車
  const loadCart = () => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (err) {
      console.error('載入購物車失敗:', err);
    }
  };

  // 加入購物車
  const addToCart = async (productId: number, quantity: number = 1) => {
    try {
      setLoading(true);
      setError(null);

      // 模擬 API 延遲
      await new Promise(resolve => setTimeout(resolve, 300));

      // 取得商品資訊
      const product = mockProducts.find(p => p.id === productId);
      if (!product) {
        throw new Error('商品不存在');
      }

      // 檢查購物車中是否已有此商品
      const existingItem = cartItems.find(item => item.productId === productId);

      let newCartItems: CartItem[];
      if (existingItem) {
        // 更新數量
        newCartItems = cartItems.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // 新增商品
        const newItem: CartItem = {
          id: Date.now(),
          productId,
          name: product.name,
          price: product.price,
          quantity,
          image: product.image,
        };
        newCartItems = [...cartItems, newItem];
      }

      setCartItems(newCartItems);
      saveCart(newCartItems);
    } catch (err) {
      setError('加入購物車失敗');
      console.error('加入購物車失敗:', err);
    } finally {
      setLoading(false);
    }
  };

  // 更新數量
  const updateQuantity = async (itemId: number, quantity: number) => {
    try {
      setError(null);

      const newCartItems = cartItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );

      setCartItems(newCartItems);
      saveCart(newCartItems);
    } catch (err) {
      setError('更新數量失敗');
      console.error('更新數量失敗:', err);
    }
  };

  // 移除商品
  const removeFromCart = async (itemId: number) => {
    try {
      setError(null);

      const newCartItems = cartItems.filter(item => item.id !== itemId);
      setCartItems(newCartItems);
      saveCart(newCartItems);
    } catch (err) {
      setError('移除商品失敗');
      console.error('移除商品失敗:', err);
    }
  };

  // 計算總價
  const getTotalPrice = (): number => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // 取得商品總數
  const getItemCount = (): number => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // 清空購物車
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  // 組件掛載時載入購物車資料
  useEffect(() => {
    loadCart();
  }, []);

  const value = {
    cartItems,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    getItemCount,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
