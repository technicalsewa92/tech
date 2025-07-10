import React from 'react';
import Link from 'next/link';
import { fetchServerClient } from '@/lib/api';
import { logger } from '@/lib/logger';
import ImageWithFallback from './ui/ImageWithFallback';

interface Service {
  brand_id: string;
  brand_name: string;
  brand_slug: string;
  image_url?: string;
  description?: string;
}

interface RecommendedServicesServerProps {
  title?: string;
  limit?: number;
  showImages?: boolean;
  className?: string;
  excludeCurrentService?: string;
}

const RecommendedServicesServer: React.FC<
  RecommendedServicesServerProps
> = async ({
  title = 'Our Popular Services',
  limit = 8,
  showImages = true,
  className = '',
  excludeCurrentService,
}) => {
  let services: Service[] = [];

  try {
    const response = await fetchServerClient(
      '/techsewa/masterconfig/publicmasterconfig/getServiceList'
    );

    if (response?.brands && Array.isArray(response.brands)) {
      let filteredServices = response.brands;

      // Exclude current service if specified
      if (excludeCurrentService) {
        filteredServices = response.brands.filter(
          (service: Service) => service.brand_slug !== excludeCurrentService
        );
      }

      // Shuffle and limit services (server-side shuffle for consistent results)
      const shuffled = filteredServices.sort(() => 0.5 - Math.random());
      services = shuffled.slice(0, limit);
    }
  } catch (error) {
    logger.debug('Failed to fetch recommended services:', error);
    // Fallback to empty array - component will not render
    services = [];
  }

  // Don't render if no services
  if (services.length === 0) {
    return null;
  }

  return (
    <section className={`py-8 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {title}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {services.map(service => (
            <Link
              key={service.brand_id}
              href={`/service/${service.brand_slug}`}
              className="group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 hover:border-blue-300"
            >
              {showImages && service.image_url && (
                <div className="w-full h-12 mb-3 flex items-center justify-center bg-gray-50 rounded">
                  <ImageWithFallback
                    src={service.image_url}
                    alt={service.brand_name}
                    className="max-h-10 max-w-full object-contain"
                    width={40}
                    height={40}
                  />
                </div>
              )}

              <h3 className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                {service.brand_name}
              </h3>

              {service.description && (
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {service.description}
                </p>
              )}
            </Link>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link
            href="/service"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            View All Services
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecommendedServicesServer;
