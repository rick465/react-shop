import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { tw, commonStyles } from '../utils/tw';
import { useAuth } from '../hooks/useAuth';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  newsletter: boolean;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset
  } = useForm<RegisterFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
      newsletter: false
    },
    mode: 'onChange'
  });

  const password = watch('password');
  const watchedNewsletter = watch('newsletter');

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setRegisterError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (data.email === 'existing@example.com') {
        setRegisterError('此 Email 已被註冊，請使用其他 Email');
        return;
      }

      login(data.email, `${data.firstName} ${data.lastName}`);

      if (data.newsletter) {
        localStorage.setItem('newsletter', 'true');
      }

      navigate('/');
    } catch {
      setRegisterError('註冊失敗，請稍後再試');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemoData = () => {
    reset({
      firstName: '小明',
      lastName: '王',
      email: 'ming.wang@example.com',
      password: '123456',
      confirmPassword: '123456',
      agreeToTerms: true,
      newsletter: true
    });
  };

  return (
    <div className={commonStyles.pageContainer}>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">註冊新帳戶</h2>
            <p className="mt-2 text-sm text-gray-600">
              或{' '}
              <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                登入現有帳戶
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {registerError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{registerError}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className={tw.form.label}>
                  名字 *
                </label>
                <input
                  id="firstName"
                  type="text"
                  {...register('firstName', {
                    required: '名字為必填欄位',
                    minLength: { value: 2, message: '名字至少需要 2 個字元' }
                  })}
                  className={`${tw.form.input} ${errors.firstName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="請輸入名字"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className={tw.form.label}>
                  姓氏 *
                </label>
                <input
                  id="lastName"
                  type="text"
                  {...register('lastName', {
                    required: '姓氏為必填欄位',
                    minLength: { value: 1, message: '姓氏至少需要 1 個字元' }
                  })}
                  className={`${tw.form.input} ${errors.lastName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="請輸入姓氏"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className={tw.form.label}>
                Email 地址 *
              </label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email 為必填欄位',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: '請輸入有效的 Email 格式'
                  }
                })}
                className={`${tw.form.input} ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                placeholder="請輸入您的 Email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className={tw.form.label}>
                密碼 *
              </label>
              <input
                id="password"
                type="password"
                {...register('password', {
                  required: '密碼為必填欄位',
                  minLength: { value: 6, message: '密碼至少需要 6 個字元' }
                })}
                className={`${tw.form.input} ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                placeholder="請輸入密碼"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className={tw.form.label}>
                確認密碼 *
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword', {
                  required: '請確認密碼',
                  validate: (value) => value === password || '密碼確認不符'
                })}
                className={`${tw.form.input} ${errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                placeholder="請再次輸入密碼"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex items-start">
              <input
                id="agreeToTerms"
                type="checkbox"
                {...register('agreeToTerms', {
                  required: '請同意服務條款和隱私政策'
                })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
              />
              <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-900">
                我同意服務條款和隱私政策
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms.message}</p>
            )}

            <div className="flex items-center">
              <input
                id="newsletter"
                type="checkbox"
                {...register('newsletter')}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-900">
                訂閱電子報，接收最新優惠和活動資訊
              </label>
            </div>

            {watchedNewsletter && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-800">
                      🎉 感謝您訂閱電子報！新用戶可獲得 10% 折扣優惠。
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={!isValid || isLoading}
                className={`${tw.button.primary} w-full ${(!isValid || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    註冊中...
                  </div>
                ) : (
                  '註冊帳戶'
                )}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleFillDemoData}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                填入示範資料
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
