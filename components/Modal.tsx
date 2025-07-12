'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { RxCross2 } from 'react-icons/rx';
import Link from 'next/link';
import { normalizeImageUrl } from '@/utils/imageUtils';

const Modal = ({ brandName, imgAlt, filterData, imageUrl, onClose }: any) => {
  const myDialog: any = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose?.();
      myDialog?.current?.close();
    }, 200);
  }, [onClose]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    if (myDialog.current) {
      myDialog.current.showModal();
    }

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyDown]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      <dialog
        ref={myDialog}
        className={`relative bg-white rounded-lg shadow-2xl max-w-4xl w-full mx-auto my-auto transform transition-all duration-200 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex gap-3 items-center">
            <div className="relative w-8 h-8">
              <Image
                src={imageUrl}
                alt={imgAlt}
                fill
                className="object-contain rounded"
                sizes="32px"
                loading="lazy"
              />
            </div>
            <h2 className="text-xl font-bold text-gray-800">{brandName}</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
            aria-label="Close modal"
          >
            <RxCross2 size={24} />
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
            {filterData?.map((val: any, index: number) => (
              <Link
                key={`${val.product_name}-${index}`}
                href={`/service/${val.url_product_name}`}
                className="group flex flex-col justify-center items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 hover:scale-105 w-full max-w-[140px]"
                onClick={handleClose}
              >
                <div className="relative w-20 h-16 mb-2 overflow-hidden rounded">
                  {val.image_url && (
                    <Image
                      src={normalizeImageUrl(val.image_url)}
                      alt={val.alt2 || val.product_name}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-200"
                      sizes="80px"
                      loading="lazy"
                    />
                  )}
                </div>
                {val.brand_id !== '76' && (
                  <p className="text-xs text-center font-medium text-gray-700 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {val.product_name}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
