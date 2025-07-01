// 共用 Tailwind 樣式工具
export const tw = {
  // 容器樣式
  container: {
    main: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    narrow: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
    product: "max-w-16xl mx-auto px-4 sm:px-6 lg:px-8",
    wide: "max-w-full mx-auto px-4 sm:px-6 lg:px-8",
  },

  // 按鈕樣式
  button: {
    primary: "bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-soft hover:shadow-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
    secondary: "bg-secondary-100 hover:bg-secondary-200 text-secondary-800 font-semibold py-3 px-6 rounded-lg transition-all duration-200 border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2",
    outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
    ghost: "text-primary-600 hover:bg-primary-50 font-semibold py-3 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
    small: "bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 shadow-soft hover:shadow-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
  },

  // 卡片樣式
  card: {
    base: "bg-white rounded-xl shadow-soft border border-secondary-100 overflow-hidden",
    hover: "bg-white rounded-xl shadow-soft border border-secondary-100 overflow-hidden hover:shadow-medium transition-all duration-300 hover:-translate-y-1",
    elevated: "bg-white rounded-xl shadow-medium border border-secondary-100 overflow-hidden",
    interactive: "bg-white rounded-xl shadow-soft border border-secondary-100 overflow-hidden cursor-pointer hover:shadow-medium transition-all duration-300 hover:-translate-y-1 active:scale-95",
  },

  // 標題樣式
  heading: {
    h1: "text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 leading-tight",
    h2: "text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-900 leading-tight",
    h3: "text-2xl md:text-3xl lg:text-4xl font-semibold text-secondary-900 leading-tight",
    h4: "text-xl md:text-2xl lg:text-3xl font-semibold text-secondary-800 leading-tight",
    h5: "text-lg md:text-xl lg:text-2xl font-medium text-secondary-800 leading-tight",
    h6: "text-base md:text-lg lg:text-xl font-medium text-secondary-700 leading-tight",
  },

  // 文字樣式
  text: {
    body: "text-base text-secondary-700 leading-relaxed",
    bodyLarge: "text-lg text-secondary-700 leading-relaxed",
    bodySmall: "text-sm text-secondary-600 leading-relaxed",
    caption: "text-xs text-secondary-500 leading-relaxed",
    link: "text-primary-600 hover:text-primary-700 underline decoration-primary-300 hover:decoration-primary-500 transition-all duration-200",
  },

  // 背景樣式
  background: {
    primary: "bg-gradient-to-br from-primary-50 to-primary-100",
    secondary: "bg-gradient-to-br from-secondary-50 to-secondary-100",
    accent: "bg-gradient-to-br from-accent-50 to-accent-100",
    hero: "bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800",
    pattern: "bg-hero-pattern",
  },

  // 間距樣式
  spacing: {
    section: "py-12 md:py-16 lg:py-20",
    sectionSmall: "py-8 md:py-12 lg:py-16",
    sectionLarge: "py-16 md:py-20 lg:py-24",
    container: "px-4 sm:px-6 lg:px-8",
  },

  // 網格樣式
  grid: {
    cards: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    features: "grid gap-8 md:grid-cols-2 lg:grid-cols-3",
    hero: "grid gap-8 lg:grid-cols-2 items-center",
  },

  // 表單樣式
  form: {
    input: "w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white",
    textarea: "w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white resize-vertical",
    select: "w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white",
    label: "block text-sm font-medium text-secondary-700 mb-2",
    error: "text-error text-sm mt-1",
  },

  // 導航樣式
  nav: {
    link: "text-secondary-600 hover:text-primary-600 font-medium transition-colors duration-200",
    linkActive: "text-primary-600 font-semibold",
    mobile: "block w-full text-left px-4 py-2 text-secondary-700 hover:bg-secondary-50 hover:text-primary-600 transition-colors duration-200",
  },

  // 徽章樣式
  badge: {
    primary: "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800",
    secondary: "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800",
    accent: "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent-100 text-accent-800",
    success: "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800",
    warning: "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800",
    error: "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800",
  },

  // 動畫樣式
  animation: {
    fadeIn: "animate-fade-in",
    slideUp: "animate-slide-up",
    bounceGentle: "animate-bounce-gentle",
  },

  // 響應式工具
  responsive: {
    hidden: "hidden sm:block",
    visible: "block sm:hidden",
    text: {
      xs: "text-xs sm:text-sm",
      sm: "text-sm sm:text-base",
      base: "text-base sm:text-lg",
      lg: "text-lg sm:text-xl",
      xl: "text-xl sm:text-2xl",
    },
  },
};

// 常用樣式組合
export const commonStyles = {
  // 頁面容器
  pageContainer: `${tw.container.main} ${tw.spacing.section}`,

  // 商品頁面容器
  productContainer: `${tw.container.product} ${tw.spacing.section}`,

  heroSection: `${tw.background.hero} ${tw.spacing.sectionLarge} text-white`,

  // 特色區塊
  featureSection: `${tw.background.primary} ${tw.spacing.section}`,

  // 內容區塊
  contentSection: `${tw.spacing.section} bg-white`,

  // 頁腳
  footer: "bg-secondary-900 text-white py-12",

  // 導航欄
  navbar: "bg-white shadow-soft border-b border-secondary-100 sticky top-0 z-50",

  // 側邊欄
  sidebar: "bg-white shadow-medium border-r border-secondary-100 h-full",
};

export default tw;
