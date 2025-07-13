'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ImageWithFallback } from '@/components/ui';

interface Banner {
  id: string;
  image_type_code: string;
  image_type: string;
  image_url: string;
  alt: string;
  category: string;
}

interface ApiResponse {
  brands: Banner[];
}

const PopupBanner: React.FC = () => {
  const [popupBanner, setPopupBanner] = useState<Banner | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.removeItem('hasSeenPopup');
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    const hasSeenPopup =
      typeof sessionStorage !== 'undefined'
        ? sessionStorage.getItem('hasSeenPopup')
        : null;

    if (!hasSeenPopup) {
      const fetchPopupBanner = async () => {
        try {
          setLoading(true);
          // Try the correct API endpoint first
          const response = await axios.get<ApiResponse>(
            'https://crm.technicalsewa.com/techsewa/masterconfig/publicmasterconfig/getConfigList',
            {
              timeout: 5000,
              headers: {
                'Cache-Control': 'no-cache',
              },
            }
          );

          if (response?.data?.brands) {
            const banners = response.data.brands;
            const popup = banners.find(
              banner => banner.image_type === 'POP UP'
            );

            if (popup) {
              setPopupBanner(popup);
              setIsVisible(true);
            }
          }
        } catch (error: any) {
          console.warn(
            'Popup banner fetch failed:',
            error?.message || 'Unknown error'
          );

          // Try fallback endpoint if first one fails
          try {
            const fallbackResponse = await axios.get<ApiResponse>(
              'https://www.technicalsewa.com/techsewa/masterconfig/publicmasterconfig/getconfiglist',
              {
                timeout: 5000,
                headers: {
                  'Cache-Control': 'no-cache',
                },
              }
            );

            if (fallbackResponse?.data?.brands) {
              const banners = fallbackResponse.data.brands;
              const popup = banners.find(
                banner => banner.image_type === 'POP UP'
              );

              if (popup) {
                setPopupBanner(popup);
                setIsVisible(true);
              }
            }
          } catch (fallbackError: any) {
            console.warn(
              'Fallback popup banner fetch also failed:',
              fallbackError?.message || 'Unknown error'
            );
            // Don't show popup if both endpoints fail
          }
        } finally {
          setLoading(false);
        }
      };

      fetchPopupBanner();
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      }
    };
  }, []);

  const closePopup = (): void => {
    setIsVisible(false);
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('hasSeenPopup', 'true');
    }
  };

  // Don't render anything if loading or no popup
  if (loading || !popupBanner || !isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-auto my-auto flex justify-center items-center flex-col pt-6 p-4">
        <button
          onClick={closePopup}
          className="absolute top-2 right-3 text-gray-700 hover:text-gray-900 text-3xl font-bold leading-none z-10"
        >
          &times;
        </button>
        <div className="w-full flex justify-center items-center mb-4">
          <picture className="w-full flex justify-center">
            <source srcSet={popupBanner.image_url} type="image/webp" />
            <ImageWithFallback
              src={popupBanner.image_url}
              alt={popupBanner.alt || 'Popup banner'}
              className="w-full max-w-sm h-[250px] sm:h-[300px] lg:h-[400px] object-contain rounded-md"
              width={400}
              height={400}
            />
          </picture>
        </div>

        {popupBanner.category && (
          <p className="text-center text-gray-700 font-medium">
            {popupBanner.category}
          </p>
        )}
      </div>
    </div>
  );
};

export default PopupBanner;
