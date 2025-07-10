"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

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
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const fetchPopupBanner = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          "https://www.technicalsewa.com/techsewa/masterconfig/publicmasterconfig/getconfiglist"
        ); // Use your actual API URL
        const banners = response.data.brands;

        const popup = banners.find((banner) => banner.image_type === "POP UP");

        if (popup) {
          setPopupBanner(popup);
        }
      } catch (error) {
        console.error("Error fetching popup banner:", error);
      }
    };

    fetchPopupBanner();
  }, []);

  const closePopup = (): void => {
    setIsVisible(false);
  };

  if (!popupBanner || !isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-2xl"
        >
          &times;
        </button>
        <Image
          src={popupBanner.image_url}
          alt={popupBanner.alt}
          width={500}
          height={500}
          className="w-full h-auto object-contain"
        />
        <p className="mt-2 text-center text-gray-700">{popupBanner.category}</p>
      </div>
    </div>
  );
};

export default PopupBanner;
