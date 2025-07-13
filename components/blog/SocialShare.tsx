'use client';

import React from 'react';
import { Mail } from 'lucide-react';
import {
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiLink,
  FiShare2,
} from 'react-icons/fi';

interface SocialShareProps {
  url: string;
  title: string;
  className?: string;
  vertical?: boolean;
}

const SocialShare: React.FC<SocialShareProps> = ({
  url,
  title,
  className = '',
  vertical = false,
}) => {
  // Use the current URL if not provided
  const shareUrl =
    url || (typeof window !== 'undefined' ? window.location.href : '');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(
      () => {
        alert('Link copied to clipboard!');
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
  ];

  return (
    <div className={className}>
      <div className="flex items-center mb-3">
        <FiShare2 className="mr-2 text-gray-600" />
        <span className="text-gray-700 font-medium">Share this article</span>
      </div>

      <div
        className={`flex ${vertical ? 'flex-col space-y-2' : 'flex-row space-x-2'}`}
      >
        {shareLinks.map(link => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${link.color} text-white p-2 rounded-full transition-colors duration-200 flex items-center justify-center w-10 h-10`}
            aria-label={`Share on ${link.name}`}
          >
            {link.icon}
          </a>
        ))}

        <button
          onClick={copyToClipboard}
          className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-full transition-colors duration-200 flex items-center justify-center w-10 h-10"
          aria-label="Copy link"
        >
          <FiLink />
        </button>
      </div>
    </div>
  );
};

export default SocialShare;
