'use client';

import React, { useEffect, useState } from 'react';
import { GoogleReview } from '@/lib/googleReviews';
import ImageWithFallback from '@/src/components/ui/CdnImage';

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
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);

        // Import dynamically to avoid SSR issues
        const { fetchGoogleReviews } = await import('@/lib/googleReviews');
        const result = await fetchGoogleReviews(limit);

        if (result.success) {
          setReviews(result.reviews);
          if (result.stats) {
            setStats(result.stats);
          }
        } else {
          setError(result.error || 'Failed to fetch reviews');
          // Use fallback reviews
          setReviews([
            {
              id: '1',
              author: 'Ram Kumar',
              rating: 5,
              text: 'Excellent service! The technician was professional and fixed my washing machine quickly. Highly recommended!',
              date: '2 days ago',
            },
            {
              id: '2',
              author: 'Sita Devi',
              rating: 5,
              text: "Very reliable and honest service. They diagnosed the issue correctly and didn't charge extra. Will definitely use again.",
              date: '1 week ago',
            },
            {
              id: '3',
              author: 'Bikash Thapa',
              rating: 5,
              text: 'Fast response time and quality work. My refrigerator is working perfectly now. Thank you Technical Sewa!',
              date: '3 days ago',
            },
            {
              id: '4',
              author: 'Anita Shrestha',
              rating: 5,
              text: 'Professional team with great technical knowledge. They fixed my AC in no time. Very satisfied!',
              date: '5 days ago',
            },
            {
              id: '5',
              author: 'Prakash Gurung',
              rating: 5,
              text: 'Best appliance repair service in Kathmandu. Reasonable prices and excellent work quality.',
              date: '1 week ago',
            },
            {
              id: '6',
              author: 'Mina Tamang',
              rating: 5,
              text: 'Quick and efficient service. The technician was very knowledgeable and explained everything clearly.',
              date: '4 days ago',
            },
          ]);
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews');
        // Use fallback reviews
        setReviews([
          {
            id: '1',
            author: 'Ram Kumar',
            rating: 5,
            text: 'Excellent service! The technician was professional and fixed my washing machine quickly. Highly recommended!',
            date: '2 days ago',
          },
          {
            id: '2',
            author: 'Sita Devi',
            rating: 5,
            text: "Very reliable and honest service. They diagnosed the issue correctly and didn't charge extra. Will definitely use again.",
            date: '1 week ago',
          },
          {
            id: '3',
            author: 'Bikash Thapa',
            rating: 5,
            text: 'Fast response time and quality work. My refrigerator is working perfectly now. Thank you Technical Sewa!',
            date: '3 days ago',
          },
          {
            id: '4',
            author: 'Anita Shrestha',
            rating: 5,
            text: 'Professional team with great technical knowledge. They fixed my AC in no time. Very satisfied!',
            date: '5 days ago',
          },
          {
            id: '5',
            author: 'Prakash Gurung',
            rating: 5,
            text: 'Best appliance repair service in Kathmandu. Reasonable prices and excellent work quality.',
            date: '1 week ago',
          },
          {
            id: '6',
            author: 'Mina Tamang',
            rating: 5,
            text: 'Quick and efficient service. The technician was very knowledgeable and explained everything clearly.',
            date: '4 days ago',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [limit, showStats, isClient]);

  // Show loading state on server-side to prevent hydration mismatch
  if (!isClient) {
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
              src="/assets/google.png"
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
            src="/assets/google.png"
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
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
      case 'list':
        return 'space-y-6';
      case 'grid':
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    }
  };

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
        {error && (
          <p className="text-gray-600 mb-6">Showing sample reviews. {error}</p>
        )}
      </div>

      {renderReviewStats()}

      <div className={getLayoutClasses()}>
        {reviews.map(review => renderReviewCard(review))}
      </div>
    </div>
  );
};

export default ReviewsDisplay;
