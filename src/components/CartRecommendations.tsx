import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

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

interface CartRecommendationsProps {
  products: Product[];
  maxItems?: number;
}

const CartRecommendations: React.FC<CartRecommendationsProps> = ({
  products,
  maxItems = 4
}) => {
  const { cartItems, addToCart, loading: cartLoading } = useCart();

    // 基於購物車商品推薦相關商品
  const getRecommendations = () => {
    if (cartItems.length === 0) {
      // 如果購物車為空，推薦熱門商品
      return products
        .sort((a, b) => b.rating - a.rating)
        .slice(0, maxItems);
    }

    // 獲取購物車中商品的完整資訊
    const cartProductIds = cartItems.map(item => item.productId);
    const cartProducts = products.filter(product => cartProductIds.includes(product.id));

    // 獲取購物車中商品的類別
    const cartCategories = cartProducts.map(product => product.category);

    // 獲取購物車中商品的價格範圍
    const cartPrices = cartProducts.map(product => product.price);
    const avgPrice = cartPrices.reduce((sum, price) => sum + price, 0) / cartPrices.length;
    const priceRange = avgPrice * 0.5; // 50% 價格範圍

    // 篩選推薦商品
    const recommendations = products.filter(product => {
      // 排除已在購物車的商品
      const notInCart = !cartProductIds.includes(product.id);

      // 同類別或相似價格
      const sameCategory = cartCategories.includes(product.category);
      const similarPrice = Math.abs(product.price - avgPrice) <= priceRange;

      return notInCart && (sameCategory || similarPrice);
    });

    // 按相關性排序
    const sortedRecommendations = recommendations.sort((a, b) => {
      const aCategoryMatch = cartCategories.includes(a.category) ? 2 : 0;
      const bCategoryMatch = cartCategories.includes(b.category) ? 2 : 0;
      const aPriceMatch = Math.abs(a.price - avgPrice) <= priceRange ? 1 : 0;
      const bPriceMatch = Math.abs(b.price - avgPrice) <= priceRange ? 1 : 0;

      return (bCategoryMatch + bPriceMatch) - (aCategoryMatch + aPriceMatch);
    });

    return sortedRecommendations.slice(0, maxItems);
  };

  const recommendations = getRecommendations();

  if (recommendations.length === 0) {
    return null;
  }

  const handleAddToCart = async (productId: number) => {
    try {
      await addToCart(productId, 1);
      // 推薦商品已加入購物車
    } catch (error) {
      console.error('加入購物車失敗:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        {cartItems.length > 0 ? '為您推薦' : '熱門商品'}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recommendations.map((product) => (
          <div key={product.id} className="group">
            <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-3">
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </Link>
              {product.badge && (
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-1 text-xs font-medium bg-primary-600 text-white rounded">
                    {product.badge}
                  </span>
                </div>
              )}
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 text-xs font-medium bg-red-600 text-white rounded">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Link to={`/products/${product.id}`} className="block">
                <h4 className="text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors line-clamp-2">
                  {product.name}
                </h4>
              </Link>

              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs text-gray-500">({product.reviews})</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-primary-600">
                    NT$ {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      NT$ {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleAddToCart(product.id)}
                  disabled={cartLoading}
                  className="p-1 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded transition-colors"
                  title="加入購物車"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          to="/products"
          className="text-primary-600 hover:text-primary-700 font-medium hover:underline"
        >
          查看更多商品 →
        </Link>
      </div>
    </div>
  );
};

export default CartRecommendations;
