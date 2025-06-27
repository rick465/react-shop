import React, { useState, useEffect } from 'react';
import { tw, commonStyles } from '../utils/tw';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  badge?: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const pageSize = 12;

  const categories = [
    { id: 'all', name: '全部商品' },
    { id: 'electronics', name: '電子產品' },
    { id: 'fashion', name: '時尚服飾' },
    { id: 'home', name: '居家生活' },
    { id: 'beauty', name: '美妝保養' },
    { id: 'sports', name: '運動健身' },
  ];

  const sortOptions = [
    { id: 'featured', name: '精選推薦' },
    { id: 'price-low', name: '價格由低到高' },
    { id: 'price-high', name: '價格由高到低' },
    { id: 'rating', name: '評價最高' },
    { id: 'newest', name: '最新上架' },
  ];

  useEffect(() => {
    // 模擬 API 調用
    const fetchProducts = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockProducts: Product[] = [
        {
          id: 1,
          name: "iPhone 15 Pro Max",
          price: 45900,
          originalPrice: 49900,
          image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80",
          category: "electronics",
          rating: 4.8,
          reviews: 1250,
          badge: "熱門"
        },
        {
          id: 2,
          name: "MacBook Air M2",
          price: 35900,
          originalPrice: 39900,
          image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
          category: "electronics",
          rating: 4.9,
          reviews: 890,
          badge: "新品"
        },
        {
          id: 3,
          name: "Nike Air Max 270",
          price: 3200,
          originalPrice: 4200,
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
          category: "sports",
          rating: 4.6,
          reviews: 567,
          badge: "限時"
        },
        {
          id: 4,
          name: "Samsung 4K Smart TV",
          price: 28900,
          originalPrice: 32900,
          image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80",
          category: "electronics",
          rating: 4.7,
          reviews: 432,
          badge: "VIP專享"
        },
        {
          id: 5,
          name: "Dyson V15 吸塵器",
          price: 18900,
          originalPrice: 21900,
          image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
          category: "home",
          rating: 4.8,
          reviews: 789,
          badge: "熱銷"
        },
        {
          id: 6,
          name: "Lancôme 精華液",
          price: 2800,
          originalPrice: 3500,
          image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
          category: "beauty",
          rating: 4.5,
          reviews: 234,
          badge: "限時"
        },
        {
          id: 7,
          name: "Uniqlo 羽絨外套",
          price: 1200,
          originalPrice: 1800,
          image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
          category: "fashion",
          rating: 4.4,
          reviews: 156,
          badge: "特價"
        },
        {
          id: 8,
          name: "Apple Watch Series 9",
          price: 12900,
          originalPrice: 14900,
          image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=600&q=80",
          category: "electronics",
          rating: 4.7,
          reviews: 678,
          badge: "新品"
        }
      ];

      setProducts(mockProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    category === 'all' || product.category === category
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / pageSize);
  const paginatedProducts = sortedProducts.slice((page - 1) * pageSize, page * pageSize);

  if (loading) {
    return (
      <div className={commonStyles.pageContainer}>
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={commonStyles.pageContainer}>
      {/* 頁面標題 */}
      <div className="text-center mb-12">
        <h1 className={tw.heading.h2}>精選商品</h1>
        <p className={`${tw.text.bodyLarge} max-w-3xl mx-auto mt-6`}>
          為您精選最優質的商品，享受 VIP 專屬優惠，讓您的購物體驗更加尊榮。
        </p>
      </div>

      {/* 篩選和排序 */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {/* 分類篩選 */}
        <div className="flex-1">
          <label className={tw.form.label}>商品分類</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={tw.form.select}
            aria-label="選擇商品分類"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* 排序選項 */}
        <div className="flex-1">
          <label className={tw.form.label}>排序方式</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={tw.form.select}
            aria-label="選擇排序方式"
          >
            {sortOptions.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 商品網格 */}
      <div className={tw.grid.cards}>
        {paginatedProducts.map((product) => (
          <div key={product.id} className={tw.card.interactive}>
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
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
              <h3 className={`${tw.heading.h6} mb-2`}>{product.name}</h3>
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
              <button className={tw.button.primary}>
                加入購物車
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 分頁 */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className={`px-4 py-2 rounded-lg border font-medium transition-colors duration-200 ${
                page === 1
                  ? 'bg-secondary-100 text-secondary-400 border-secondary-200 cursor-not-allowed'
                  : 'bg-white text-secondary-700 border-secondary-300 hover:bg-secondary-50'
              }`}
            >
              上一頁
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 rounded-lg border font-medium transition-colors duration-200 ${
                  page === i + 1
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-secondary-700 border-secondary-300 hover:bg-secondary-50'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className={`px-4 py-2 rounded-lg border font-medium transition-colors duration-200 ${
                page === totalPages
                  ? 'bg-secondary-100 text-secondary-400 border-secondary-200 cursor-not-allowed'
                  : 'bg-white text-secondary-700 border-secondary-300 hover:bg-secondary-50'
              }`}
            >
              下一頁
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
