import React, { useState } from 'react';
import { tw, commonStyles } from '../utils/tw';

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  badge?: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      price: 45900,
      originalPrice: 49900,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80",
      quantity: 1,
      badge: "熱門"
    },
    {
      id: 2,
      name: "MacBook Air M2",
      price: 35900,
      originalPrice: 39900,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
      quantity: 1,
      badge: "新品"
    },
    {
      id: 3,
      name: "Nike Air Max 270",
      price: 3200,
      originalPrice: 4200,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
      quantity: 2,
      badge: "限時"
    }
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalDiscount = cartItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + ((item.originalPrice - item.price) * item.quantity);
    }
    return sum;
  }, 0);
  const shipping = subtotal > 10000 ? 0 : 300;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className={commonStyles.pageContainer}>
        <div className="text-center py-20">
          <div className="text-6xl mb-6">🛒</div>
          <h1 className={tw.heading.h2}>購物車是空的</h1>
          <p className={`${tw.text.bodyLarge} mt-4 mb-8`}>
            快去選購您喜歡的商品吧！
          </p>
          <button className={tw.button.primary}>
            開始購物
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={commonStyles.pageContainer}>
      {/* 頁面標題 */}
      <div className="mb-8">
        <h1 className={tw.heading.h2}>購物車</h1>
        <p className={tw.text.body}>您有 {cartItems.length} 項商品在購物車中</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 購物車商品列表 */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className={tw.card.base}>
                <div className="flex items-center p-6">
                  {/* 商品圖片 */}
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {item.badge && (
                      <span className={`${tw.badge.primary} absolute -top-2 -right-2 text-xs`}>
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* 商品資訊 */}
                  <div className="flex-1 ml-6">
                    <h3 className={`${tw.heading.h6} mb-2`}>{item.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-primary-600">
                        NT$ {item.price.toLocaleString()}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-secondary-400 line-through">
                          NT$ {item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 數量控制 */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-secondary-300 flex items-center justify-center hover:bg-secondary-50 transition-colors duration-200"
                      aria-label="減少數量"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-12 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-secondary-300 flex items-center justify-center hover:bg-secondary-50 transition-colors duration-200"
                      aria-label="增加數量"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>

                  {/* 小計 */}
                  <div className="text-right ml-6">
                    <div className="font-bold text-lg">
                      NT$ {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>

                  {/* 刪除按鈕 */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-4 p-2 text-secondary-400 hover:text-error hover:bg-red-50 rounded-lg transition-colors duration-200"
                    aria-label="移除商品"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 訂單摘要 */}
        <div className="lg:col-span-1">
          <div className={tw.card.elevated}>
            <div className="p-6">
              <h2 className={`${tw.heading.h4} mb-6`}>訂單摘要</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className={tw.text.body}>商品小計</span>
                  <span className="font-medium">NT$ {subtotal.toLocaleString()}</span>
                </div>

                {totalDiscount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>折扣優惠</span>
                    <span>-NT$ {totalDiscount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className={tw.text.body}>運費</span>
                  <span className="font-medium">
                    {shipping === 0 ? '免費' : `NT$ ${shipping.toLocaleString()}`}
                  </span>
                </div>

                {shipping > 0 && (
                  <div className="text-sm text-secondary-500">
                    滿 NT$ 10,000 免運費
                  </div>
                )}

                <div className="border-t border-secondary-200 pt-4">
                  <div className="flex justify-between">
                    <span className={`${tw.heading.h5}`}>總計</span>
                    <span className={`${tw.heading.h5} text-primary-600`}>
                      NT$ {total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button className={`${tw.button.primary} w-full`}>
                  前往結帳
                </button>
                <button className={`${tw.button.secondary} w-full`}>
                  繼續購物
                </button>
              </div>

              {/* VIP 專屬優惠 */}
              <div className="mt-6 p-4 bg-gradient-to-r from-accent-50 to-accent-100 rounded-lg border border-accent-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-accent-600">💎</span>
                  <span className="font-semibold text-accent-800">VIP 專屬優惠</span>
                </div>
                <p className="text-sm text-accent-700">
                  成為 VIP 會員，享受額外 5% 折扣及免費運費！
                </p>
                <button className={`${tw.button.outline} w-full mt-3 text-accent-600 border-accent-300 hover:bg-accent-50`}>
                  立即升級 VIP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
