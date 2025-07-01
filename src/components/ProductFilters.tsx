import React, { useState } from 'react';
import { tw } from '../utils/tw';

interface ProductFiltersProps {
  category: string;
  onCategoryChange: (category: string) => void;
  priceRange: { min: number; max: number };
  onPriceRangeChange: (range: { min: number; max: number }) => void;
  isOpen?: boolean;
  onToggle?: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  category,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  isOpen = true,
  onToggle
}) => {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  const categories = [
    { id: 'all', name: '全部商品', count: 8 },
    { id: 'electronics', name: '電子產品', count: 4 },
    { id: 'fashion', name: '時尚服飾', count: 2 },
    { id: 'home', name: '居家生活', count: 1 },
    { id: 'beauty', name: '美妝保養', count: 1 },
  ];

  const priceRanges = [
    { label: '全部價格', min: 0, max: 999999 },
    { label: 'NT$ 0 - 1,000', min: 0, max: 1000 },
    { label: 'NT$ 1,000 - 5,000', min: 1000, max: 5000 },
    { label: 'NT$ 5,000 - 20,000', min: 5000, max: 20000 },
    { label: 'NT$ 20,000 以上', min: 20000, max: 999999 },
  ];

  const handlePriceRangeChange = (range: { min: number; max: number }) => {
    setLocalPriceRange(range);
    onPriceRangeChange(range);
  };

  const handleClearFilters = () => {
    onCategoryChange('all');
    const defaultRange = { min: 0, max: 999999 };
    setLocalPriceRange(defaultRange);
    onPriceRangeChange(defaultRange);
  };

  const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="border-b border-gray-200 pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* 手機版標題和切換按鈕 */}
      <div className="lg:hidden border-b border-gray-200 p-4">
        <button
          onClick={onToggle}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-lg font-semibold text-gray-900">篩選條件</span>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* 篩選內容 */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block p-4 lg:p-6`}>
        {/* 清除篩選按鈕 */}
        <div className="mb-6">
          <button
            onClick={handleClearFilters}
            className="text-sm text-primary-600 hover:text-primary-700 underline"
          >
            清除所有篩選
          </button>
        </div>

        {/* 分類篩選 */}
        <FilterSection title="商品分類">
          <div className="space-y-3">
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={cat.id}
                    checked={category === cat.id}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                  />
                  <span className="ml-3 text-gray-700">{cat.name}</span>
                </div>
                <span className="text-sm text-gray-500">({cat.count})</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* 價格篩選 */}
        <FilterSection title="價格區間">
          <div className="space-y-3">
            {priceRanges.map((range, index) => (
              <label key={index} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="priceRange"
                  checked={localPriceRange.min === range.min && localPriceRange.max === range.max}
                  onChange={() => handlePriceRangeChange(range)}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="ml-3 text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* 自定義價格區間 */}
        <FilterSection title="自定義價格">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  最低價格
                </label>
                <input
                  type="number"
                  value={localPriceRange.min || ''}
                  onChange={(e) => handlePriceRangeChange({
                    ...localPriceRange,
                    min: parseInt(e.target.value) || 0
                  })}
                  className={`${tw.form.input} text-sm`}
                  placeholder="0"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  最高價格
                </label>
                <input
                  type="number"
                  value={localPriceRange.max === 999999 ? '' : localPriceRange.max}
                  onChange={(e) => handlePriceRangeChange({
                    ...localPriceRange,
                    max: parseInt(e.target.value) || 999999
                  })}
                  className={`${tw.form.input} text-sm`}
                  placeholder="不限"
                  min="0"
                />
              </div>
            </div>
            <button
              onClick={() => handlePriceRangeChange(localPriceRange)}
              className={`${tw.button.small} w-full`}
            >
              套用價格範圍
            </button>
          </div>
        </FilterSection>
      </div>
    </div>
  );
};

export default ProductFilters;
