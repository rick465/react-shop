import React, { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { tw, commonStyles } from '../utils/tw';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import RelatedProducts from '../components/RelatedProducts';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // 從 URL 參數獲取商品 ID
  const navigate = useNavigate(); // 用於程式化導航
  const { addToCart, loading } = useCart();
  const { products, loading: productsLoading, error: productsError } = useProducts();

  // 使用 useMemo 來獲取商品資訊，避免重複查找
  const product = useMemo(() => {
    const productId = parseInt(id || '0');
    return products.find(p => p.id === productId);
  }, [id, products]);

  // 載入中狀態
  if (productsLoading) {
    return (
      <div className={commonStyles.pageContainer}>
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  // 錯誤狀態
  if (productsError) {
    return (
      <div className={commonStyles.pageContainer}>
        <div className="text-center p-8">
          <p className="text-red-600">錯誤：{productsError}</p>
        </div>
      </div>
    );
  }

  // 如果商品不存在，顯示 404 頁面
  if (!product) {
    return (
      <div className={commonStyles.pageContainer}>
        <div className="text-center py-20">
          <div className="text-6xl mb-6">😕</div>
          <h1 className={tw.heading.h2}>商品不存在</h1>
          <p className={`${tw.text.bodyLarge} mt-4 mb-8`}>
            抱歉，找不到您要的商品
          </p>
          <div className="space-x-4">
            <button
              onClick={() => navigate(-1)}
              className={tw.button.secondary}
            >
              返回上一頁
            </button>
            <Link to="/products" className={tw.button.primary}>
              瀏覽所有商品
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, 1);
      // 可以選擇是否導航到購物車頁面
      // navigate('/cart');
    } catch (error) {
      console.error('加入購物車失敗:', error);
    }
  };

  return (
    <div className={commonStyles.pageContainer}>
      {/* 麵包屑導航 */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <Link to="/" className="hover:text-primary-600">首頁</Link>
          </li>
          <li>/</li>
          <li>
            <Link to="/products" className="hover:text-primary-600">商品</Link>
          </li>
          <li>/</li>
          <li className="text-gray-900">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* 商品圖片 */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 商品資訊 */}
        <div className="space-y-6">
          <div>
            <h1 className={tw.heading.h2}>{product.name}</h1>
            <p className={`${tw.text.bodyLarge} mt-2 text-gray-600`}>
              {product.description}
            </p>
          </div>

          {/* 評價和評分 */}
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-lg font-medium text-gray-900">{product.rating}</span>
            <span className="text-gray-500">({product.reviews} 則評價)</span>
          </div>

          {/* 價格 */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-primary-600">
              NT$ {product.price.toLocaleString()}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  NT$ {product.originalPrice.toLocaleString()}
                </span>
                <span className="px-2 py-1 text-sm font-medium bg-red-100 text-red-600 rounded">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              </>
            )}
          </div>

          {/* 商品標籤 */}
          {product.badge && (
            <div>
              <span className="px-3 py-1 text-sm font-medium bg-primary-100 text-primary-600 rounded-full">
                {product.badge}
              </span>
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={handleAddToCart}
              disabled={loading}
              className={`${tw.button.primary} w-full`}
            >
              {loading ? '加入中...' : '加入購物車'}
            </button>

            <div className="flex space-x-4">
              <button
                onClick={() => navigate(-1)}
                className={tw.button.outline}
              >
                返回上一頁
              </button>
              <Link to="/products" className={tw.button.ghost}>
                瀏覽更多商品
              </Link>
            </div>
          </div>

          {/* 商品詳細資訊 */}
          <div className="border-t pt-6">
            <h3 className={tw.heading.h4}>商品詳情</h3>
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p>• 商品編號：{product.id}</p>
              <p>• 商品類別：{product.category}</p>
              <p>• 商品評分：{product.rating}/5 ({product.reviews} 則評價)</p>
              <p>• 保固期限：1 年</p>
              <p>• 退換貨政策：7 天內可退換</p>
              <p>• 運送方式：宅配到府 / 超商取貨</p>
            </div>
          </div>
        </div>
      </div>

      {/* 相關商品推薦 */}
      <div className="mt-16">
        <RelatedProducts
          currentProduct={product}
          products={products}
          maxItems={4}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
