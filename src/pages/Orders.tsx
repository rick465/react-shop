import React from 'react';
import { Link } from 'react-router-dom';
import { tw, commonStyles } from '../utils/tw';
import { useOrders } from '../contexts/OrderContext';
import { useAuth } from '../hooks/useAuth';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    case 'shipped':
      return 'bg-purple-100 text-purple-800';
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending':
      return '待處理';
    case 'processing':
      return '處理中';
    case 'shipped':
      return '已出貨';
    case 'delivered':
      return '已送達';
    case 'cancelled':
      return '已取消';
    default:
      return '未知狀態';
  }
};

const Orders: React.FC = () => {
  const { user } = useAuth();
  const { getOrdersByUserId } = useOrders();

  // 取得當前用戶的訂單
  const userOrders = user ? getOrdersByUserId(user.email) : [];

  // 如果用戶未登入，顯示登入提示
  if (!user) {
    return (
      <div className={commonStyles.pageContainer}>
        <div className="text-center py-20">
          <div className="text-6xl mb-6">🔐</div>
          <h1 className={tw.heading.h2}>請先登入</h1>
          <p className={`${tw.text.bodyLarge} mt-4 mb-8`}>
            登入後即可查看您的訂單記錄
          </p>
          <Link to="/login" className={tw.button.primary}>
            立即登入
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={commonStyles.pageContainer}>
      {/* 頁面標題 */}
      <div className="mb-8">
        <h1 className={tw.heading.h2}>訂單查詢</h1>
        <p className={tw.text.body}>查看您的訂單歷史和狀態</p>
      </div>

      {/* 訂單列表 */}
      <div className="space-y-6">
        {userOrders.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">尚無訂單</h3>
            <p className="mt-1 text-sm text-gray-500">開始購物來建立您的第一個訂單</p>
            <div className="mt-6">
              <Link to="/products" className={tw.button.primary}>
                瀏覽商品
              </Link>
            </div>
          </div>
        ) : (
          userOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* 訂單標題 */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      訂單 #{order.id}
                    </h3>
                    <p className="text-sm text-gray-500">
                      下單日期：{order.createdAt.toLocaleDateString('zh-TW')}
                    </p>
                    <p className="text-sm text-gray-500">
                      收件人：{order.shippingAddress.firstName} {order.shippingAddress.lastName}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      NT$ {order.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* 訂單商品 */}
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500">
                          數量：{item.quantity} × NT$ {item.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          NT$ {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 訂單摘要 */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">商品小計</span>
                      <span>NT$ {order.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">運費</span>
                      <span>{order.shipping === 0 ? '免費' : `NT$ ${order.shipping.toLocaleString()}`}</span>
                    </div>
                    <div className="flex justify-between font-medium pt-2 border-t">
                      <span>總計</span>
                      <span className="text-primary-600">NT$ {order.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* 配送資訊 */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">配送資訊</h4>
                  <div className="text-sm text-gray-600">
                    <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                    <p>{order.shippingAddress.address}</p>
                    <p>{order.shippingAddress.city} {order.shippingAddress.postalCode}</p>
                    <p>電話：{order.shippingAddress.phone}</p>
                    <p>Email：{order.shippingAddress.email}</p>
                  </div>
                </div>

                {/* 訂單操作 */}
                <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                  <div className="flex space-x-4">
                    <button className={tw.button.secondary}>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      查看詳情
                    </button>
                    {order.status === 'delivered' && (
                      <button className={tw.button.outline}>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        評價商品
                      </button>
                    )}
                  </div>

                  {order.status === 'shipped' && (
                    <button className={tw.button.primary}>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      確認收貨
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 分頁（如果有很多訂單） */}
      {userOrders.length > 0 && (
        <div className="mt-8 flex items-center justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              上一頁
            </button>
            <button className="px-3 py-2 text-sm font-medium text-white bg-primary-600 border border-primary-600 rounded-md">
              1
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              下一頁
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Orders;
