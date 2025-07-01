import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { tw, commonStyles } from '../utils/tw';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import ProductFilters from '../components/ProductFilters';

const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 999999 });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const pageSize = 12;

  // 從 URL 參數獲取搜尋關鍵字
  const searchQuery = searchParams.get('search') || '';

  const {
    products,
    loading: productsLoading,
    error: productsError
  } = useProducts();

  const {
    addToCart,
    loading: cartLoading,
    error: cartError
  } = useCart();

  const sortOptions = [
    { id: 'featured', name: '精選推薦' },
    { id: 'price-low', name: '價格由低到高' },
    { id: 'price-high', name: '價格由高到低' },
    { id: 'rating', name: '評價最高' },
    { id: 'newest', name: '最新上架' },
  ];

  // 篩選商品（包含搜尋、分類和價格）
  const filteredProducts = products.filter(product => {
    // 分類篩選
    const categoryMatch = category === 'all' || product.category === category;

    // 搜尋篩選
    const searchMatch = !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase());

    // 價格篩選
    const priceMatch = product.price >= priceRange.min && product.price <= priceRange.max;

    return categoryMatch && searchMatch && priceMatch;
  });

  // 排序商品
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

  // 分頁
  const totalPages = Math.ceil(sortedProducts.length / pageSize);
  const paginatedProducts = sortedProducts.slice((page - 1) * pageSize, page * pageSize);

  // 處理加入購物車
  const handleAddToCart = async (productId: number) => {
    try {
      await addToCart(productId, 1);
      // 商品已加入購物車
    } catch (error) {
      console.error('加入購物車失敗:', error);
    }
  };

  if (productsLoading) {
    return (
      <div className={commonStyles.pageContainer}>
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (productsError) {
    return (
      <div className={commonStyles.pageContainer}>
        <div className="text-center p-8">
          <p className="text-red-600">錯誤：{productsError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={commonStyles.productContainer}>
      {/* 錯誤提示 */}
      {cartError && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          購物車錯誤：{cartError}
        </div>
      )}

      {/* 標題、商品數量、排序、顯示範圍同一列 */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-6">
          <h1 className="text-3xl font-bold text-gray-900">商品列表</h1>
          <span className="text-gray-600 text-base md:text-lg md:mb-1">
            找到 {filteredProducts.length} 個商品{searchQuery && ` (搜尋: "${searchQuery}")`}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">排序方式:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`${tw.form.select} text-sm`}
              aria-label="選擇排序方式"
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
          </div>
          <div className="text-sm text-gray-500 text-right min-w-max">
            顯示 {((page - 1) * pageSize) + 1} - {Math.min(page * pageSize, filteredProducts.length)} / {filteredProducts.length}
          </div>
        </div>
      </div>

      {/* 響應式佈局 */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 左側篩選面板 */}
        <div className="lg:w-80 flex-shrink-0">
          <ProductFilters
            category={category}
            onCategoryChange={setCategory}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            isOpen={filtersOpen}
            onToggle={() => setFiltersOpen(!filtersOpen)}
          />
        </div>

        {/* 右側商品區域 */}
        <div className="flex-1">
          {/* 商品網格 */}
          {paginatedProducts.length > 0 ? (
            <div className={tw.grid.cards}>
              {paginatedProducts.map((product) => (
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
                      <button
                        className={`${tw.button.primary} flex-1`}
                        onClick={() => handleAddToCart(product.id)}
                        disabled={cartLoading}
                      >
                        {cartLoading ? '處理中...' : '加入購物車'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">沒有找到符合條件的商品</h3>
              <p className="text-gray-500 mb-4">請嘗試調整篩選條件或搜尋關鍵字</p>
              <button
                onClick={() => {
                  setCategory('all');
                  setPriceRange({ min: 0, max: 999999 });
                }}
                className={tw.button.outline}
              >
                清除篩選條件
              </button>
            </div>
          )}

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
      </div>
    </div>
  );
};

export default Products;
