import { useState, useEffect } from 'react';

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
    description?: string;
}

interface UseProductsReturn {
    products: Product[];
    loading: boolean;
    error: string | null;
    fetchProducts: () => Promise<void>;
    searchProducts: (query: string) => Promise<void>;
    getProductById: (id: number) => Product | undefined;
}

// 模擬商品資料
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
        badge: "熱門",
        description: "最新的 iPhone 15 Pro Max，搭載 A17 Pro 晶片，擁有強大的效能和出色的相機系統。"
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
        badge: "新品",
        description: "輕薄便攜的 MacBook Air，搭載 M2 晶片，提供出色的效能和長達 18 小時的電池續航。"
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
        badge: "限時",
        description: "舒適透氣的運動鞋，採用 Air Max 氣墊技術，提供卓越的緩震效果。"
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
        badge: "VIP專享",
        description: "65 吋 4K 智慧電視，支援 HDR 技術，提供身臨其境的觀影體驗。"
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
        badge: "熱銷",
        description: "無線吸塵器，搭載雷射科技，能夠偵測微塵，提供深層清潔。"
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
        badge: "限時",
        description: "高效保濕精華液，含有玻尿酸成分，能夠深層滋潤肌膚。"
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
        badge: "特價",
        description: "輕薄保暖的羽絨外套，採用高品質羽絨填充，適合各種天氣穿著。"
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
        badge: "新品",
        description: "智慧手錶，具備健康監測功能，支援心電圖和血氧檢測。"
    }
];

export const useProducts = (): UseProductsReturn => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 取得所有商品（類似 Angular Service 的 getProducts()）
    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            // 模擬 API 延遲
            await new Promise(resolve => setTimeout(resolve, 1000));

            // 使用模擬資料（實際專案中會調用 productApi.getProducts()）
            setProducts(mockProducts);
        } catch (err) {
            setError('取得商品失敗');
            console.error('取得商品失敗:', err);
        } finally {
            setLoading(false);
        }
    };

    // 搜尋商品（類似 Angular Service 的 searchProducts()）
    const searchProducts = async (query: string) => {
        try {
            setLoading(true);
            setError(null);

            // 模擬 API 延遲
            await new Promise(resolve => setTimeout(resolve, 500));

            // 模擬搜尋邏輯
            const filteredProducts = mockProducts.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase())
            );

            setProducts(filteredProducts);
        } catch (err) {
            setError('搜尋商品失敗');
            console.error('搜尋商品失敗:', err);
        } finally {
            setLoading(false);
        }
    };

    // 根據 ID 取得商品（類似 Angular Service 的 getProductById()）
    const getProductById = (id: number): Product | undefined => {
        return products.find(product => product.id === id);
    };

    // 組件掛載時自動取得商品（類似 Angular 的 ngOnInit）
    useEffect(() => {
        fetchProducts();
    }, []);

    return {
        products,
        loading,
        error,
        fetchProducts,
        searchProducts,
        getProductById,
    };
};
