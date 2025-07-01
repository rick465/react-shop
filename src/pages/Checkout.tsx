import React, { useState, useMemo } from 'react';
import { tw, commonStyles } from '../utils/tw';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../contexts/OrderContext';
import { useAuth } from '../hooks/useAuth';

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { createOrder } = useOrders();
  const { user } = useAuth();

  const [form, setForm] = useState<CheckoutForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'credit',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: ''
  });
  const [loading, setLoading] = useState(false);

  // 計算訂單總計
  const { subtotal, shipping, total } = useMemo(() => {
    const subtotal = getTotalPrice();
    const shipping = subtotal > 10000 ? 0 : 300;
    const total = subtotal + shipping;
    return { subtotal, shipping, total };
  }, [cartItems, getTotalPrice]);

  // 檢查購物車是否為空
  if (cartItems.length === 0) {
    return (
      <div className={commonStyles.pageContainer}>
        <div className="text-center py-20">
          <div className="text-6xl mb-6">🛒</div>
          <h1 className={tw.heading.h2}>購物車是空的</h1>
          <p className={`${tw.text.bodyLarge} mt-4 mb-8`}>
            請先選擇商品加入購物車
          </p>
          <button
            className={tw.button.primary}
            onClick={() => navigate('/products')}
          >
            去購物
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: keyof CheckoutForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!user) {
        alert('請先登入再結帳');
        setLoading(false);
        return;
      }
      createOrder({
        userId: user.email,
        items: cartItems.map(item => ({
          id: String(item.id),
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        total,
        shipping,
        subtotal,
        status: 'pending',
        shippingAddress: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          postalCode: form.postalCode,
        },
        paymentMethod: form.paymentMethod,
      });
      clearCart();
      alert('訂單已成功提交！感謝您的購買。');
      navigate('/orders');
    } catch {
      alert('訂單提交失敗，請重試。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={commonStyles.pageContainer}>
      <div className="mb-8">
        <h1 className={tw.heading.h2}>結帳</h1>
        <p className={tw.text.body}>完成您的訂單</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 表單區域 */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 個人資訊 */}
            <div className={tw.card.base}>
              <div className="p-6">
                <h2 className={`${tw.heading.h4} mb-6`}>個人資訊</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={tw.form.label}>姓氏</label>
                    <input type="text" value={form.lastName} onChange={e => handleInputChange('lastName', e.target.value)} className={tw.form.input} required />
                  </div>
                  <div>
                    <label className={tw.form.label}>名字</label>
                    <input type="text" value={form.firstName} onChange={e => handleInputChange('firstName', e.target.value)} className={tw.form.input} required />
                  </div>
                  <div>
                    <label className={tw.form.label}>電子郵件</label>
                    <input type="email" value={form.email} onChange={e => handleInputChange('email', e.target.value)} className={tw.form.input} required />
                  </div>
                  <div>
                    <label className={tw.form.label}>電話號碼</label>
                    <input type="tel" value={form.phone} onChange={e => handleInputChange('phone', e.target.value)} className={tw.form.input} required />
                  </div>
                </div>
              </div>
            </div>
            {/* 配送地址 */}
            <div className={tw.card.base}>
              <div className="p-6">
                <h2 className={`${tw.heading.h4} mb-6`}>配送地址</h2>
                <div className="space-y-4">
                  <div>
                    <label className={tw.form.label}>完整地址</label>
                    <input type="text" value={form.address} onChange={e => handleInputChange('address', e.target.value)} className={tw.form.input} required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={tw.form.label}>城市</label>
                      <input type="text" value={form.city} onChange={e => handleInputChange('city', e.target.value)} className={tw.form.input} required />
                    </div>
                    <div>
                      <label className={tw.form.label}>郵遞區號</label>
                      <input type="text" value={form.postalCode} onChange={e => handleInputChange('postalCode', e.target.value)} className={tw.form.input} required />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 付款方式 */}
            <div className={tw.card.base}>
              <div className="p-6">
                <h2 className={`${tw.heading.h4} mb-6`}>付款方式</h2>
                <div className="space-y-4">
                  <div>
                    <label className={tw.form.label}>付款方式</label>
                    <select value={form.paymentMethod} onChange={e => handleInputChange('paymentMethod', e.target.value)} className={tw.form.select} aria-label="選擇付款方式">
                      <option value="credit">信用卡</option>
                      <option value="debit">金融卡</option>
                      <option value="paypal">PayPal</option>
                    </select>
                  </div>
                  {(form.paymentMethod === 'credit' || form.paymentMethod === 'debit') && (
                    <div className="space-y-4">
                      <div>
                        <label className={tw.form.label}>卡號</label>
                        <input type="text" value={form.cardNumber} onChange={e => handleInputChange('cardNumber', e.target.value)} className={tw.form.input} placeholder="1234 5678 9012 3456" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={tw.form.label}>有效期限</label>
                          <input type="text" value={form.cardExpiry} onChange={e => handleInputChange('cardExpiry', e.target.value)} className={tw.form.input} placeholder="MM/YY" required />
                        </div>
                        <div>
                          <label className={tw.form.label}>CVC</label>
                          <input type="text" value={form.cardCVC} onChange={e => handleInputChange('cardCVC', e.target.value)} className={tw.form.input} placeholder="123" required />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* 提交按鈕 */}
            <div className="flex justify-end">
              <button type="submit" disabled={loading} className={`${tw.button.primary} min-w-32 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {loading ? (<div className="flex items-center"><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>處理中...</div>) : '確認訂單'}
              </button>
            </div>
          </form>
        </div>
        {/* 訂單摘要 */}
        <div className="lg:col-span-1">
          <div className={tw.card.elevated}>
            <div className="p-6">
              <h2 className={`${tw.heading.h4} mb-6`}>訂單摘要</h2>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-secondary-500">數量: {item.quantity}</div>
                    </div>
                    <div className="font-bold">NT$ {(item.price * item.quantity).toLocaleString()}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-3 border-t border-secondary-200 pt-4">
                <div className="flex justify-between">
                  <span className={tw.text.body}>商品小計</span>
                  <span className="font-medium">NT$ {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className={tw.text.body}>運費</span>
                  <span className="font-medium text-success">
                    {shipping === 0 ? '免費' : `NT$ ${shipping.toLocaleString()}`}
                  </span>
                </div>
                <div className="border-t border-secondary-200 pt-3">
                  <div className="flex justify-between">
                    <span className={`${tw.heading.h5}`}>總計</span>
                    <span className={`${tw.heading.h5} text-primary-600`}>NT$ {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-accent-50 to-accent-100 rounded-lg border border-accent-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-accent-600">💎</span>
                  <span className="font-semibold text-accent-800">VIP 專屬優惠</span>
                </div>
                <p className="text-sm text-accent-700">您已享受 VIP 會員優惠，節省 NT$ 4,250！</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
