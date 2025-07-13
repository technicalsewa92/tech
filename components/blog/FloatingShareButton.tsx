'use client';

import React, { useState, useEffect } from 'react';
import { X, Mail } from 'lucide-react';
import {
  FiShare2,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiLink,
} from 'react-icons/fi';

interface FloatingShareButtonProps {
  url: string;
  title: string;
  position?: 'left' | 'right';
}

const FloatingShareButton: React.FC<FloatingShareButtonProps> = ({
  url,
  title,
  position = 'right',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use the current URL if not provided
  const shareUrl =
    url || (typeof window !== 'undefined' ? window.location.href : '');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  useEffect(() => {
    const handleScroll = () => {
      // Show the button after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(
      () => {
        alert('Link copied to clipboard!');
        setIsOpen(false);
      },
      err => {
        console.error('Could not copy text: ', err);
      }
    );
  };

  const shareLinks = [
    {
      name: 'Facebook',
      icon: <FiFacebook />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-[#3b5998] hover:bg-[#2d4373]',
    },
    {
      name: 'Twitter',
      icon: <FiTwitter />,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'bg-[#1da1f2] hover:bg-[#0c85d0]',
    },
    {
      name: 'LinkedIn',
      icon: <FiLinkedin />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'bg-[#0077b5] hover:bg-[#005582]',
    },
    {
      name: 'Email',
      icon: <Mail />,
      url: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      color: 'bg-[#ea4335] hover:bg-[#d62516]',
    },
    {
      name: 'Copy Link',
      icon: <FiLink />,
      action: copyToClipboard,
      color: 'bg-gray-600 hover:bg-gray-700',
    },
  ];

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-20 ${position === 'right' ? 'right-4' : 'left-4'} z-40 flex flex-col items-center`}
    >
      {isOpen && (
        <div className="flex flex-col-reverse gap-2 mb-2">
          {shareLinks.map(link => (
            <button
              key={link.name}
              onClick={link.action || (() => window.open(link.url, '_blank'))}
              className={`${link.color} text-white p-2 rounded-full transition-all duration-200 flex items-center justify-center w-10 h-10 shadow-md hover:shadow-lg transform hover:scale-110`}
              aria-label={link.name}
              title={link.name}
            >
              {link.icon}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-[#2591b2] hover:bg-[#1a7a96]'} text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110`}
        aria-label={isOpen ? 'Close share menu' : 'Share this article'}
        title={isOpen ? 'Close share menu' : 'Share this article'}
      >
        {isOpen ? <X size={20} /> : <FiShare2 size={20} />}
      </button>
    </div>
  );
};

export default FloatingShareButton;
