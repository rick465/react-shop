import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { tw } from '../utils/tw';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { useNotification } from '../hooks/useNotification';
import SearchBar from './SearchBar';

const navs = [
  { to: '/', label: '首頁' },
  { to: '/products', label: '精選商品' },
  { to: '/cart', label: '購物車' },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { getItemCount } = useCart();
  const { unreadCount } = useNotification();
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationMenuRef = useRef<HTMLDivElement>(null);

  // 點擊外部關閉選單
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (notificationMenuRef.current && !notificationMenuRef.current.contains(event.target as Node)) {
        setNotificationMenuOpen(false);
      }
    };

    if (userMenuOpen || notificationMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen, notificationMenuOpen]);

  return (
    <nav className="bg-white shadow-soft border-b border-secondary-100 sticky top-0 z-50">
      <div className={tw.container.main}>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-secondary-900">CUBE</div>
              <div className="text-xs text-secondary-500">精選貴賓專區</div>
            </div>
          </Link>

          {/* Desktop Navigation + SearchBar */}
          <div className="hidden md:flex items-center space-x-8 flex-1 ml-8">
            {navs.map(nav => (
              <Link
                key={nav.to}
                to={nav.to}
                className={`${location.pathname === nav.to ? tw.nav.linkActive : tw.nav.link} relative group`}
              >
                {nav.label}
                {/* 購物車數量徽章 */}
                {nav.to === '/cart' && getItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {getItemCount() > 99 ? '99+' : getItemCount()}
                  </span>
                )}
                {location.pathname === nav.to && (
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-600"></div>
                )}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-200 group-hover:w-full"></div>
              </Link>
            ))}
            {/* 搜尋欄 */}
            <div className="flex-1 max-w-xs ml-8">
              <SearchBar />
            </div>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* 通知按鈕 */}
            <div className="relative" ref={notificationMenuRef}>
              <button
                onClick={() => setNotificationMenuOpen(!notificationMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200 relative"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 00-6 6v3.75a6 6 0 006 6h3a6 6 0 006-6V9.75a6 6 0 00-6-6h-3z" />
                </svg>
                {/* 未讀通知徽章 */}
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </button>

              {/* 通知下拉選單 */}
              {notificationMenuOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto">
                  <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">通知</h3>
                    <span className="text-xs text-gray-500">{unreadCount} 未讀</span>
                  </div>

                  <div className="py-2">
                    <div className="px-4 py-2 text-sm text-gray-500 text-center">
                      通知功能開發中...
                    </div>
                  </div>
                </div>
              )}
            </div>

            {user ? (
              <div className="relative" ref={userMenuRef}>
                {/* 用戶頭像按鈕 */}
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-gray-700 hidden lg:block">
                    {user.name || user.email}
                  </span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* 下拉選單 */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="text-sm font-medium text-gray-900">{user.name || '用戶'}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>

                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      個人資料
                    </Link>

                    <Link
                      to="/orders"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      訂單查詢
                    </Link>

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      登出
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className={tw.button.ghost}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span className="ml-2">登入</span>
                </Link>
                <Link to="/register" className={tw.button.primary}>
                  立即註冊
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-secondary-600 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200"
            onClick={() => setOpen(!open)}
            aria-label="切換選單"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {open && (
          <div className="md:hidden border-t border-secondary-100 bg-white">
            <div className="px-4 py-4 space-y-2">
              {/* 搜尋欄（手機版） */}
              <div className="mb-4">
                <SearchBar />
              </div>
              {navs.map(nav => (
                <Link
                  key={nav.to}
                  to={nav.to}
                  className={`${tw.nav.mobile} ${location.pathname === nav.to ? 'bg-primary-50 text-primary-600' : ''} relative`}
                  onClick={() => setOpen(false)}
                >
                  {nav.label}
                  {/* 購物車數量徽章（手機版） */}
                  {nav.to === '/cart' && getItemCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {getItemCount() > 99 ? '99+' : getItemCount()}
                    </span>
                  )}
                </Link>
              ))}
              <div className="pt-4 border-t border-secondary-100 space-y-2">
                {/* 通知按鈕（手機版） */}
                <div className="px-4 py-2 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 00-6 6v3.75a6 6 0 006 6h3a6 6 0 006-6V9.75a6 6 0 00-6-6h-3z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">通知</span>
                    </div>
                    {unreadCount > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                        {unreadCount > 99 ? '99+' : unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    通知功能開發中...
                  </div>
                </div>

                {user ? (
                  <>
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name || '用戶'}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </div>

                    <Link
                      to="/profile"
                      className={`${tw.nav.mobile} w-full text-left`}
                      onClick={() => setOpen(false)}
                    >
                      <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      個人資料
                    </Link>

                    <Link
                      to="/orders"
                      className={`${tw.nav.mobile} w-full text-left`}
                      onClick={() => setOpen(false)}
                    >
                      <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      訂單查詢
                    </Link>

                    <button
                      onClick={() => { logout(); setOpen(false); }}
                      className={`${tw.nav.mobile} w-full text-left text-red-600 hover:bg-red-50`}
                    >
                      <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      登出
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className={`${tw.nav.mobile} w-full text-left`} onClick={() => setOpen(false)}>
                      <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      登入
                    </Link>
                    <Link to="/register" className={`${tw.button.primary} w-full`} onClick={() => setOpen(false)}>
                      立即註冊
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
