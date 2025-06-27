import React from 'react';
import { tw, commonStyles } from '../utils/tw';

const Home: React.FC = () => {
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
