import React, { useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { NotificationContext, type Notification } from './NotificationContext';

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // 計算未讀數量
  const unreadCount = useMemo(() => {
    return notifications.filter(notification => !notification.read).length;
  }, [notifications]);

  // 儲存通知到 localStorage
  const saveNotifications = (newNotifications: Notification[]) => {
    localStorage.setItem('notifications', JSON.stringify(newNotifications));
  };

  // 從 localStorage 載入通知
  const loadNotifications = () => {
    try {
      const savedNotifications = localStorage.getItem('notifications');
      if (savedNotifications) {
        const parsed = JSON.parse(savedNotifications);
        // 將 timestamp 字串轉換回 Date 物件
        const notificationsWithDates = parsed.map((notification: Notification & { timestamp: string }) => ({
          ...notification,
          timestamp: new Date(notification.timestamp)
        }));
        setNotifications(notificationsWithDates);
      }
    } catch (err) {
      console.error('載入通知失敗:', err);
    }
  };

  // 新增通知
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };

    const newNotifications = [newNotification, ...notifications];
    setNotifications(newNotifications);
    saveNotifications(newNotifications);
  };

  // 標記為已讀
  const markAsRead = (id: string) => {
    const newNotifications = notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(newNotifications);
    saveNotifications(newNotifications);
  };

  // 標記全部為已讀
  const markAllAsRead = () => {
    const newNotifications = notifications.map(notification => ({ ...notification, read: true }));
    setNotifications(newNotifications);
    saveNotifications(newNotifications);
  };

  // 移除通知
  const removeNotification = (id: string) => {
    const newNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(newNotifications);
    saveNotifications(newNotifications);
  };

  // 清空所有通知
  const clearAllNotifications = () => {
    setNotifications([]);
    localStorage.removeItem('notifications');
  };

  // 組件掛載時載入通知
  useEffect(() => {
    loadNotifications();
  }, []);

  // 模擬一些初始通知（可選）
  useEffect(() => {
    if (notifications.length === 0) {
      // 添加一些示範通知
      addNotification({
        title: '歡迎來到 CUBE',
        message: '感謝您註冊我們的電商平台！',
        type: 'success'
      });

      addNotification({
        title: '限時優惠',
        message: '新用戶首次購物享 9 折優惠！',
        type: 'info'
      });
    }
  }, []);

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
