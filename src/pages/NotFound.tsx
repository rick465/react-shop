import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { tw, commonStyles } from '../utils/tw';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={commonStyles.pageContainer}>
      <div className="text-center py-20">
        <div className="text-8xl mb-6">😵</div>
        <h1 className={tw.heading.h1}>404</h1>
        <h2 className={tw.heading.h2}>頁面不存在</h2>
        <p className={`${tw.text.bodyLarge} mt-4 mb-8 max-w-md mx-auto`}>
          抱歉，您要尋找的頁面不存在或已被移除。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className={tw.button.secondary}
          >
            返回上一頁
          </button>
          <Link to="/" className={tw.button.primary}>
            回到首頁
          </Link>
        </div>

        <div className="mt-12">
          <h3 className={tw.heading.h4}>您可能感興趣的頁面：</h3>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link to="/products" className={tw.button.ghost}>
              瀏覽商品
            </Link>
            <Link to="/cart" className={tw.button.ghost}>
              購物車
            </Link>
            <Link to="/context" className={tw.button.ghost}>
              Context 示範
            </Link>
            <Link to="/ref" className={tw.button.ghost}>
              useRef 示範
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
