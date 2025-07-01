import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { tw } from '../utils/tw';
import { useAuth } from '../hooks/useAuth';

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      city: user?.city || '',
      postalCode: user?.postalCode || '',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      // 模擬 API 調用
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 更新用戶資料
      if (updateProfile) {
        updateProfile(data);
      }

      setIsEditing(false);
    } catch (error) {
      console.error('更新個人資料失敗:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className={tw.container.main}>
        <div className="max-w-2xl mx-auto">
          {/* 頁面標題 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">個人資料</h1>
            <p className="text-gray-600 mt-2">管理您的帳戶資訊和個人資料</p>
          </div>

          {/* 個人資料卡片 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">基本資訊</h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className={tw.button.secondary}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    編輯資料
                  </button>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 姓名 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    姓名 *
                  </label>
                                     <input
                     type="text"
                     {...register('name', { required: '請輸入姓名' })}
                     disabled={!isEditing}
                     className={`${tw.form.input} ${!isEditing ? 'bg-gray-50' : ''}`}
                   />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* 電子郵件 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    電子郵件 *
                  </label>
                                     <input
                     type="email"
                     {...register('email', {
                       required: '請輸入電子郵件',
                       pattern: {
                         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                         message: '請輸入有效的電子郵件地址'
                       }
                     })}
                     disabled={!isEditing}
                     className={`${tw.form.input} ${!isEditing ? 'bg-gray-50' : ''}`}
                   />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* 電話 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    電話號碼
                  </label>
                                     <input
                     type="tel"
                     {...register('phone')}
                     disabled={!isEditing}
                     className={`${tw.form.input} ${!isEditing ? 'bg-gray-50' : ''}`}
                   />
                 </div>

                 {/* 地址 */}
                 <div className="md:col-span-2">
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     地址
                   </label>
                   <input
                     type="text"
                     {...register('address')}
                     disabled={!isEditing}
                     className={`${tw.form.input} ${!isEditing ? 'bg-gray-50' : ''}`}
                   />
                 </div>

                 {/* 城市 */}
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     城市
                   </label>
                   <input
                     type="text"
                     {...register('city')}
                     disabled={!isEditing}
                     className={`${tw.form.input} ${!isEditing ? 'bg-gray-50' : ''}`}
                   />
                 </div>

                 {/* 郵遞區號 */}
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     郵遞區號
                   </label>
                   <input
                     type="text"
                     {...register('postalCode')}
                     disabled={!isEditing}
                     className={`${tw.form.input} ${!isEditing ? 'bg-gray-50' : ''}`}
                   />
                </div>
              </div>

              {/* 按鈕區域 */}
              {isEditing && (
                <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className={tw.button.ghost}
                    disabled={isLoading}
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className={tw.button.primary}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        儲存中...
                      </>
                    ) : (
                      '儲存變更'
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* 帳戶安全卡片 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">帳戶安全</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">密碼</h3>
                    <p className="text-sm text-gray-500">上次更新：2024年1月</p>
                  </div>
                  <button className={tw.button.secondary}>
                    變更密碼
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">兩步驟驗證</h3>
                    <p className="text-sm text-gray-500">增強帳戶安全性</p>
                  </div>
                  <button className={tw.button.secondary}>
                    設定
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
