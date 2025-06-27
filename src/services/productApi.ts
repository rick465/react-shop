export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};

const mockProducts: Product[] = [
  { id: 1, name: '蘋果', price: 30, category: '水果' },
  { id: 2, name: '香蕉', price: 20, category: '水果' },
  { id: 3, name: '牛奶', price: 50, category: '飲品' },
  { id: 4, name: '橘子', price: 25, category: '水果' },
  { id: 5, name: '咖啡', price: 80, category: '飲品' },
  { id: 6, name: '葡萄', price: 40, category: '水果' },
  { id: 7, name: '茶', price: 60, category: '飲品' },
  { id: 8, name: '西瓜', price: 100, category: '水果' },
  { id: 9, name: '可樂', price: 35, category: '飲品' },
  { id: 10, name: '鳳梨', price: 55, category: '水果' },
];

export function fetchProducts(category?: string, page = 1, pageSize = 5): Promise<{ products: Product[]; total: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = mockProducts;
      if (category) {
        filtered = filtered.filter(p => p.category === category);
      }
      const total = filtered.length;
      const products = filtered.slice((page - 1) * pageSize, page * pageSize);
      resolve({ products, total });
    }, 500);
  });
}
