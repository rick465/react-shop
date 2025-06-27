import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { tw } from '../utils/tw';

const navs = [
  { to: '/', label: '首頁' },
  { to: '/products', label: '精選商品' },
  { to: '/events', label: '活動專區' },
  { to: '/vip', label: 'VIP 專區' },
  { to: '/cart', label: '購物車' },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navs.map(nav => (
              <Link
                key={nav.to}
                to={nav.to}
                className={`${location.pathname === nav.to ? tw.nav.linkActive : tw.nav.link} relative group`}
              >
                {nav.label}
                {location.pathname === nav.to && (
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-600"></div>
                )}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-200 group-hover:w-full"></div>
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className={tw.button.ghost}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="ml-2">登入</span>
            </button>
            <button className={tw.button.primary}>
              立即註冊
            </button>
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
              {navs.map(nav => (
                <Link
                  key={nav.to}
                  to={nav.to}
                  className={`${tw.nav.mobile} ${location.pathname === nav.to ? 'bg-primary-50 text-primary-600' : ''}`}
                  onClick={() => setOpen(false)}
                >
                  {nav.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-secondary-100 space-y-2">
                <button className={`${tw.nav.mobile} w-full text-left`}>
                  <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  登入
                </button>
                <button className={`${tw.button.primary} w-full`}>
                  立即註冊
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
