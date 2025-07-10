'use client';

import React, { useEffect, useState } from 'react';
import ImageWithFallback from './ui/ImageWithFallback';
import {
  getGoogleBusinessReviews,
  getGoogleReviewStats,
  GoogleReview,
  ReviewStats,
} from '../lib/googleReviews';
import { getAssetUrl } from '@/lib/cdn';

interface ReviewsDisplayProps {
  limit?: number;
  showStats?: boolean;
  className?: string;
  title?: string;
  layout?: 'grid' | 'carousel' | 'list';
}

const ReviewsDisplay: React.FC<ReviewsDisplayProps> = ({
  limit = 6,
  showStats = true,
  className = '',
  title = 'Customer Reviews',
  layout = 'grid',
}) => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const [reviewsData, statsData] = await Promise.all([
          getGoogleBusinessReviews(limit),
          showStats ? getGoogleReviewStats() : Promise.resolve(null),
        ]);

        setReviews(reviewsData);
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [limit, showStats]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const renderReviewStats = () => {
    if (!stats || !showStats) return null;

    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl font-bold text-gray-900">
                {stats.averageRating}
              </span>
              <div className="flex">
                {renderStars(Math.round(stats.averageRating))}
              </div>
            </div>
            <p className="text-gray-600">{stats.totalReviews} Google reviews</p>
          </div>
          <div className="flex items-center gap-2">
            <ImageWithFallback
              src={getAssetUrl('/assets/google.png')}
              alt="Google"
              className="w-6 h-6"
              width={24}
              height={24}
            />
            <span className="text-sm text-gray-600">Google Business</span>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map(star => {
            const count =
              stats.ratingDistribution[
                star as keyof typeof stats.ratingDistribution
              ];
            const percentage =
              stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;

            return (
              <div key={star} className="flex items-center gap-2 text-sm">
                <span className="w-3">{star}</span>
                <svg
                  className="w-3 h-3 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="w-8 text-xs text-gray-600">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderReviewCard = (review: GoogleReview) => (
    <div
      key={review.id}
      className="bg-white rounded-2xl shadow-lg border border-primary/10 p-8 flex flex-col justify-between min-h-[180px]"
    >
      <div className="flex items-start gap-5 mb-3">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 gap-1">
            <h3 className="font-semibold text-gray-900 text-lg">
              {review.author}
            </h3>
            <span className="text-xs text-gray-500">{review.date}</span>
          </div>
          <div className="flex items-center gap-1 mb-2">
            {renderStars(review.rating)}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <ImageWithFallback
            src={getAssetUrl('/assets/google.png')}
            alt="Google"
            className="w-6 h-6"
            width={24}
            height={24}
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <p className="text-gray-700 leading-relaxed text-base mb-2">
          {review.text}
        </p>
        <div className="flex items-center gap-2 text-xs text-primary font-semibold mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-4 h-4 text-primary"
          >
            <path d="M21.35 11.1c-.2-.2-.51-.2-.71 0l-8.65 8.65-8.65-8.65c-.2-.2-.51-.2-.71 0s-.2.51 0 .71l9 9c.2.2.51.2.71 0l9-9c.2-.2.2-.51 0-.71z" />
          </svg>
          Verified Google Review
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-0.5 w-8 bg-primary rounded-full"></div>
            <span className="text-primary font-medium text-sm uppercase tracking-wide">
              Testimonials
            </span>
            <div className="h-0.5 w-8 bg-primary rounded-full"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary text-center mb-8">
            {title}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: limit }, (_, i) => (
            <div
              key={i}
              className="bg-gray-200 rounded-lg h-48 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  const getLayoutClasses = () => {
    switch (layout) {
      case 'carousel':
        return 'flex overflow-x-auto gap-6 pb-4';
      case 'list':
        return 'space-y-6';
      case 'grid':
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    }
  };

  return (
    <div className={`${className}`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>

      {renderReviewStats()}

      <div className={getLayoutClasses()}>{reviews.map(renderReviewCard)}</div>

      {/* View More Button */}
      <div className="text-center mt-10">
        <a
          href="https://www.google.com/maps/place/Technical+Sewa+%26+Solution/@27.6700683,85.3198645,17z/data=!3m1!4b1!4m6!3m5!1s0x39eb191011dd10b1:0x92f063afe7e0a48f!8m2!3d27.6700683!4d85.3198645!16s%2Fg%2F11wth8wt06"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow"
        >
          <ImageWithFallback
            src={getAssetUrl('/assets/google.png')}
            alt="Google"
            className="w-5 h-5"
            width={20}
            height={20}
          />
          View all reviews on Google
        </a>
      </div>
    </div>
  );
};

export default ReviewsDisplay;
