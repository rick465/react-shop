import React from 'react';
import { tw, commonStyles } from '../utils/tw';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';

const Home: React.FC = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { products, loading: productsLoading, error: productsError } = useProducts();

  const features = [
    {
      icon: "🎯",
      title: "精選活動",
      description: "獨家優惠活動，限時搶購，錯過不再！"
    },
    {
      icon: "💎",
      title: "VIP 專屬",
      description: "貴賓會員專享權益，尊榮體驗"
    },
    {
      icon: "🚀",
      title: "快速結帳",
      description: "一鍵購買，安全支付，快速到貨"
    },
    {
      icon: "🎁",
      title: "積分回饋",
      description: "消費即享積分，兌換豐富好禮"
    }
  ];

  const events = [
    {
      id: 1,
      title: "春季特賣會",
      subtitle: "全館商品 8 折起",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80",
      badge: "熱門",
      price: "限時優惠"
    },
    {
      id: 2,
      title: "VIP 專屬活動",
      subtitle: "貴賓會員獨享",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",
      badge: "專屬",
      price: "會員專享"
    },
    {
      id: 3,
      title: "新品上市",
      subtitle: "最新商品搶先看",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=600&q=80",
      badge: "新品",
      price: "立即搶購"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* 英雄區塊 */}
      <section className={commonStyles.heroSection}>
        <div className={tw.container.main}>
          <div className={tw.grid.hero}>
            <div className="space-y-6">
              <div className="space-y-4">
                <span className={tw.badge.primary}>🎉 限時活動</span>
                <h1 className={tw.heading.h1}>
                  精選貴賓
                  <span className="block text-accent-300">專屬活動</span>
                </h1>
                <p className="text-xl text-primary-100 leading-relaxed max-w-2xl">
                  享受 VIP 專屬權益，獨家優惠活動等你來搶！限時特價、積分回饋、專屬服務，讓您的購物體驗更加尊榮。
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className={tw.button.primary}>
                  立即探索
                </button>
                <button className={tw.button.outline}>
                  了解更多
                </button>
              </div>
              <div className="flex items-center gap-8 text-primary-100">
                <div className="text-center">
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-sm">活躍會員</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">1000+</div>
                  <div className="text-sm">精選商品</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">99%</div>
                  <div className="text-sm">滿意度</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80"
                  alt="VIP 專屬活動"
                  className="rounded-2xl shadow-large w-full"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-accent-400 rounded-full opacity-20 animate-bounce-gentle"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary-400 rounded-full opacity-20 animate-bounce-gentle" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
          {/* 新增首頁搜尋欄 */}
          <form
            className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center"
            onSubmit={e => {
              e.preventDefault();
              if (search.trim()) {
                navigate(`/products?search=${encodeURIComponent(search.trim())}`);
              }
            }}
          >
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="搜尋商品、品牌、關鍵字..."
              className="w-full max-w-md px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-400 text-lg shadow-sm"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold text-lg hover:bg-primary-700 transition-colors shadow"
            >
              搜尋
            </button>
          </form>
        </div>
      </section>

      {/* 特色功能區塊 */}
      <section className={commonStyles.featureSection}>
        <div className={tw.container.main}>
          <div className="text-center mb-16">
            <h2 className={tw.heading.h2}>為什麼選擇我們</h2>
            <p className={`${tw.text.bodyLarge} max-w-3xl mx-auto mt-6`}>
              我們致力於為貴賓會員提供最優質的服務體驗，從精選商品到專屬權益，讓您的每一次購物都充滿驚喜。
            </p>
          </div>
          <div className={tw.grid.features}>
            {features.map((feature, index) => (
              <div key={index} className={`${tw.card.hover} p-8 text-center`}>
                <div className="text-6xl mb-6">{feature.icon}</div>
                <h3 className={`${tw.heading.h5} mb-4`}>{feature.title}</h3>
                <p className={tw.text.body}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 精選活動區塊 */}
      <section className={commonStyles.contentSection}>
        <div className={tw.container.main}>
          <div className="text-center mb-16">
            <h2 className={tw.heading.h2}>精選活動</h2>
            <p className={`${tw.text.bodyLarge} max-w-3xl mx-auto mt-6`}>
              限時優惠活動，錯過不再！立即搶購您心儀的商品，享受 VIP 專屬權益。
            </p>
          </div>
          <div className={tw.grid.cards}>
            {events.map((event) => (
              <div key={event.id} className={tw.card.interactive}>
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={tw.badge.primary}>{event.badge}</span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={tw.badge.accent}>{event.price}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className={`${tw.heading.h5} mb-2`}>{event.title}</h3>
                  <p className={`${tw.text.body} mb-4`}>{event.subtitle}</p>
                  <button className={tw.button.small}>
                    立即參與
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 精選商品區塊 */}
      <section className={commonStyles.contentSection}>
        <div className={tw.container.main}>
          <div className="text-center mb-16">
            <h2 className={tw.heading.h2}>精選商品</h2>
            <p className={`${tw.text.bodyLarge} max-w-3xl mx-auto mt-6`}>
              熱門精選商品，立即搶購！
            </p>
          </div>
          {productsLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : productsError ? (
            <div className="text-center text-red-600 py-8">{productsError}</div>
          ) : (
            <div className={tw.grid.cards}>
              {[...products].sort((a, b) => b.rating - a.rating).slice(0, 4).map(product => (
                <div key={product.id} className={tw.card.interactive}>
                  <div className="relative">
                    <Link to={`/products/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-200"
                      />
                    </Link>
                    {product.badge && (
                      <div className="absolute top-4 left-4">
                        <span className={tw.badge.primary}>{product.badge}</span>
                      </div>
                    )}
                    {product.originalPrice && product.originalPrice > product.price && (
                      <div className="absolute top-4 right-4">
                        <span className={tw.badge.accent}>
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <Link to={`/products/${product.id}`} className="block">
                      <h3 className={`${tw.heading.h6} mb-2 hover:text-primary-600 transition-colors`}>
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-secondary-500 ml-2">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-primary-600">NT$ {product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-secondary-400 line-through">
                            NT$ {product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/products/${product.id}`}
                        className={`${tw.button.outline} flex-1 text-center`}
                      >
                        查看詳情
                      </Link>
                      <Link
                        to={`/products/${product.id}`}
                        className={`${tw.button.primary} flex-1 text-center`}
                      >
                        加入購物車
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA 區塊 */}
      <section className={`${tw.background.accent} ${tw.spacing.section}`}>
        <div className={tw.container.narrow}>
          <div className="text-center">
            <h2 className={`${tw.heading.h3} mb-6`}>準備好享受 VIP 專屬權益了嗎？</h2>
            <p className={`${tw.text.bodyLarge} mb-8 max-w-2xl mx-auto`}>
              立即註冊成為貴賓會員，享受專屬優惠、積分回饋、優先服務等尊榮權益。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className={tw.button.primary}>
                立即註冊
              </button>
              <button className={tw.button.secondary}>
                查看權益
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
