import React, { useState } from 'react';
import { tw, commonStyles } from '../utils/tw';

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

  const handleInputChange = (field: keyof CheckoutForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    alert('訂單已成功提交！');
  };

  const subtotal = 85000;
  const shipping = 0;
  const total = subtotal + shipping;

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
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=100&q=80" alt="iPhone 15 Pro Max" className="w-12 h-12 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-medium">iPhone 15 Pro Max</div>
                    <div className="text-sm text-secondary-500">數量: 1</div>
                  </div>
                  <div className="font-bold">NT$ 45,900</div>
                </div>
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=100&q=80" alt="MacBook Air M2" className="w-12 h-12 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-medium">MacBook Air M2</div>
                    <div className="text-sm text-secondary-500">數量: 1</div>
                  </div>
                  <div className="font-bold">NT$ 35,900</div>
                </div>
              </div>
              <div className="space-y-3 border-t border-secondary-200 pt-4">
                <div className="flex justify-between">
                  <span className={tw.text.body}>商品小計</span>
                  <span className="font-medium">NT$ {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className={tw.text.body}>運費</span>
                  <span className="font-medium text-success">免費</span>
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
