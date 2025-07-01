import React, { useMemo } from 'react';
import { tw, commonStyles } from '../utils/tw';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { useNavigate } from 'react-router-dom';
import CartRecommendations from '../components/CartRecommendations';

const Cart: React.FC = () => {
  const navigate = useNavigate();

  // 使用購物車 Hook（類似 Angular 注入 CartService）
  const {
    cartItems,
    loading,
    error,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    clearCart
  } = useCart();

  // 使用商品 Hook
  const { products } = useProducts();

  // ✅ 使用 useMemo 優化計算 - 只有 cartItems 改變時才重新計算
  const { subtotal, shipping, total } = useMemo(() => {
    const subtotal = getTotalPrice();
    const shipping = subtotal > 10000 ? 0 : 300;
    const total = subtotal + shipping;

    return { subtotal, shipping, total };
  }, [cartItems]); // 依賴 cartItems，只有購物車內容改變時才重新計算

  // 導航到商品頁面
  const goPurchase = () => {
    navigate('/products');
  };

  // 前往結帳頁面
  const goToCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className={commonStyles.pageContainer}>
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={commonStyles.pageContainer}>
        <div className="text-center p-8">
          <p className="text-red-600">錯誤：{error}</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className={commonStyles.pageContainer}>
        <div className="text-center py-20">
          <div className="text-6xl mb-6">🛒</div>
          <h1 className={tw.heading.h2}>購物車是空的</h1>
          <p className={`${tw.text.bodyLarge} mt-4 mb-8`}>
            快去選購您喜歡的商品吧！
          </p>
          <button className={tw.button.primary} onClick={goPurchase}>
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
                  </div>

                  {/* 商品資訊 */}
                  <div className="flex-1 ml-6">
                    <h3 className={`${tw.heading.h6} mb-2`}>{item.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-primary-600">
                        NT$ {item.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* 數量控制 */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-secondary-300 flex items-center justify-center hover:bg-secondary-50 transition-colors duration-200"
                      aria-label="減少數量"
                      disabled={item.quantity <= 1}
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
                    onClick={() => removeFromCart(item.id)}
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

                <div className="flex justify-between">
                  <span className={tw.text.body}>運費</span>
                  <span className="font-medium">
                    {shipping === 0 ? '免費' : `NT$ ${shipping.toLocaleString()}`}
                  </span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className={`${tw.heading.h5}`}>總計</span>
                    <span className={`${tw.heading.h5} text-primary-600`}>
                      NT$ {total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  className={tw.button.primary}
                  onClick={goToCheckout}
                >
                  前往結帳
                </button>
                <button
                  onClick={clearCart}
                  className={tw.button.outline}
                >
                  清空購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 商品推薦 */}
      <div className="mt-16">
        <CartRecommendations products={products} maxItems={4} />
      </div>
    </div>
  );
};

export default Cart;
