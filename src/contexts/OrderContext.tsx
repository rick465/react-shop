import { createContext, useContext, useState, type ReactNode, useEffect } from 'react';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  shipping: number;
  subtotal: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

interface OrderContextType {
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Order;
  getOrdersByUserId: (userId: string) => Order[];
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

interface OrderProviderProps {
  children: ReactNode;
}

// localStorage 的 key
const ORDERS_STORAGE_KEY = 'react-shop-orders';

// 從 localStorage 讀取訂單資料
const loadOrdersFromStorage = (): Order[] => {
  try {
    const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (stored) {
      const orders = JSON.parse(stored);
      // 將字串日期轉回 Date 物件
      return orders.map((order: Order & { createdAt: string; updatedAt: string }) => ({
        ...order,
        createdAt: new Date(order.createdAt),
        updatedAt: new Date(order.updatedAt),
      }));
    }
  } catch (error) {
    console.error('Failed to load orders from localStorage:', error);
  }
  return [];
};

// 儲存訂單資料到 localStorage
const saveOrdersToStorage = (orders: Order[]): void => {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error('Failed to save orders to localStorage:', error);
  }
};

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // 初始化時從 localStorage 載入資料
  useEffect(() => {
    const storedOrders = loadOrdersFromStorage();
    setOrders(storedOrders);
    setIsInitialized(true);
  }, []);

  // 當訂單資料改變時，儲存到 localStorage
  useEffect(() => {
    if (isInitialized) {
      saveOrdersToStorage(orders);
    }
  }, [orders, isInitialized]);

  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setOrders(prev => [...prev, newOrder]);
    return newOrder;
  };

  const getOrdersByUserId = (userId: string): Order[] => {
    return orders.filter(order => order.userId === userId);
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']): void => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date() }
          : order
      )
    );
  };

  const value: OrderContextType = {
    orders,
    createOrder,
    getOrdersByUserId,
    getOrderById,
    updateOrderStatus,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};
