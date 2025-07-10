'use client';
import React, { useEffect, useState } from 'react';
import Skeleton from '@/components/ui/Skeleton';
import SkeletonServiceCard from '@/components/ui/SkeletonServiceCard';
// Utility to highlight query matches in a string
function highlightMatch(text: string, query: string) {
  if (!query) return text;
  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
    'ig'
  );
  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <span
        key={i}
        className="bg-[#2591b2]/30 text-[#2591b2] font-bold rounded px-0.5"
      >
        {part}
      </span>
    ) : (
      part
    )
  );
}
import { useSearchParams, useRouter } from 'next/navigation';
import Fuse from 'fuse.js';
import { baseUrl } from '@/public/baseUrl';

interface Service {
  brand_id?: string;
  brand_name?: string;
  brand_slug?: string;
  product_name?: string;
  url_product_name?: string;
  // Add these for category/vertical/other search
  category_name?: string;
  service_name?: string;
  vertical_name?: string;
}

const SearchResults: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    setLoading(true);
    let localServices: Service[] = [];
    try {
      const cached = localStorage.getItem('services');
      if (cached) localServices = JSON.parse(cached);
    } catch {}

    // Fuzzy search locally (with more keys and lower threshold)
    let localResults: Service[] = [];
    if (localServices.length > 0) {
      const fuse = new Fuse(localServices, {
        keys: [
          'product_name',
          'brand_name',
          'brand_slug',
          'url_product_name',
          'category_name',
          'service_name',
          'vertical_name',
        ],
        threshold: 0.5,
        ignoreLocation: true,
        minMatchCharLength: 2,
      });
      localResults = fuse.search(query).map(res => res.item);
      // Fallback: if fuzzy search returns nothing, do a substring match
      if (localResults.length === 0) {
        const q = query.toLowerCase();
        localResults = localServices.filter(
          s =>
            (s.product_name && s.product_name.toLowerCase().includes(q)) ||
            (s.brand_name && s.brand_name.toLowerCase().includes(q)) ||
            (s.category_name && s.category_name.toLowerCase().includes(q)) ||
            (s.service_name && s.service_name.toLowerCase().includes(q)) ||
            (s.vertical_name && s.vertical_name.toLowerCase().includes(q))
        );
      }
    }

    // Always also fetch from API for freshest data
    fetch(
      `${baseUrl}/techsewa/masterconfig/publicmasterconfig/getSliderListpop1?search=${encodeURIComponent(query)}`
    )
      .then(async res => {
        if (!res.ok) throw new Error('Network response was not ok');
        const text = await res.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          data = null;
        }
        let apiResults: Service[] = [];
        if (data?.brands && Array.isArray(data.brands)) {
          // Fuzzy filter API results as well
          const fuseApi = new Fuse(data.brands, {
            keys: [
              'product_name',
              'brand_name',
              'brand_slug',
              'url_product_name',
              'category_name',
              'service_name',
              'vertical_name',
            ],
            threshold: 0.5,
            ignoreLocation: true,
            minMatchCharLength: 2,
          });
          apiResults = fuseApi.search(query).map(res => res.item);
          // Fallback: if fuzzy search returns nothing, do a substring match
          if (apiResults.length === 0) {
            const q = query.toLowerCase();
            apiResults = data.brands.filter(
              (s: Service) =>
                (s.product_name && s.product_name.toLowerCase().includes(q)) ||
                (s.brand_name && s.brand_name.toLowerCase().includes(q)) ||
                (s.category_name &&
                  s.category_name.toLowerCase().includes(q)) ||
                (s.service_name && s.service_name.toLowerCase().includes(q)) ||
                (s.vertical_name && s.vertical_name.toLowerCase().includes(q))
            );
          }
        }
        // Merge and deduplicate local and API results
        const allResults = [...localResults, ...apiResults].filter(
          (item, idx, arr) =>
            arr.findIndex(
              s =>
                (s.url_product_name || s.brand_slug || s.brand_id) ===
                (item.url_product_name || item.brand_slug || item.brand_id)
            ) === idx
        );
        setResults(allResults);
        setLoading(false);
      })
      .catch(() => {
        setResults(localResults);
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2591b2] mb-2">
            Search Results
          </h1>
          <div className="text-lg text-gray-600">
            Showing results for{' '}
            <span className="font-semibold text-[#2591b2]">"{query}"</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <svg
            className="w-8 h-8 text-[#2591b2]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      {loading && (
        <ul className="grid gap-6 mt-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(6)].map((_, i) => (
            <li key={i}>
              <SkeletonServiceCard />
            </li>
          ))}
        </ul>
      )}
      {!loading && results.length === 0 && (
        <div className="text-gray-500 text-lg border border-dashed border-[#2591b2]/40 rounded-lg p-8 text-center">
          No results found for{' '}
          <span className="font-semibold text-[#2591b2]">"{query}"</span>.
        </div>
      )}
      <ul className="grid gap-6 mt-6">
        {results.map((service, idx) => {
          const key =
            service.url_product_name ||
            service.brand_slug ||
            service.brand_id ||
            idx;
          return (
            <li
              key={key}
              tabIndex={0}
              className="relative group bg-white rounded-2xl shadow-md border border-[#2591b2]/20 p-6 flex flex-col sm:flex-row sm:items-center gap-3 hover:shadow-xl focus-within:shadow-xl transition cursor-pointer outline-none"
              onClick={() =>
                router.push(
                  `/service/${service.url_product_name || service.brand_slug || service.brand_id}`
                )
              }
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  router.push(
                    `/service/${service.url_product_name || service.brand_slug || service.brand_id}`
                  );
                }
              }}
            >
              {/* Accent bar for brand color */}
              <div className="absolute left-0 top-0 h-full w-1.5 bg-[#2591b2] rounded-l-2xl opacity-70 group-hover:opacity-100 transition" />
              <div className="flex-1 z-10">
                <div className="text-xl font-bold text-[#2591b2] flex items-center gap-2">
                  {highlightMatch(
                    service.product_name ||
                      service.brand_name ||
                      service.category_name ||
                      service.service_name ||
                      service.vertical_name ||
                      'Unknown Service',
                    query
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-600">
                  {service.brand_name && (
                    <span className="bg-[#2591b2]/10 px-2 py-0.5 rounded">
                      Brand: {highlightMatch(service.brand_name, query)}
                    </span>
                  )}
                  {service.category_name && (
                    <span className="bg-[#2591b2]/10 px-2 py-0.5 rounded">
                      Category: {highlightMatch(service.category_name, query)}
                    </span>
                  )}
                  {service.service_name && (
                    <span className="bg-[#2591b2]/10 px-2 py-0.5 rounded">
                      Service: {highlightMatch(service.service_name, query)}
                    </span>
                  )}
                  {service.vertical_name && (
                    <span className="bg-[#2591b2]/10 px-2 py-0.5 rounded">
                      Vertical: {highlightMatch(service.vertical_name, query)}
                    </span>
                  )}
                </div>
              </div>
              <button
                className="ml-auto px-5 py-2 bg-[#2591b2] text-white rounded-lg font-semibold shadow-sm hover:bg-[#1a7a96] focus:bg-[#1a7a96] transition z-10 border-2 border-[#2591b2]/0 group-hover:border-[#2591b2]/60 focus:border-[#2591b2]"
                tabIndex={-1}
              >
                View
              </button>
            </li>
          );
        })}
      </ul>
      {/* Help/Contact Callout */}
      <div className="mt-10 flex flex-col items-center justify-center bg-[#2591b2]/10 border border-[#2591b2]/30 rounded-2xl p-6 sm:p-8 text-center shadow-sm">
        <div className="flex items-center justify-center mb-3">
          <svg
            className="w-8 h-8 text-[#2591b2] mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#2591b2"
              strokeWidth="2"
              fill="#2591b2"
              fillOpacity="0.12"
            />
            <path
              d="M12 8v4m0 4h.01"
              stroke="#2591b2"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-2xl font-bold text-[#2591b2]">Need Help?</span>
        </div>
        <div className="text-lg font-medium text-gray-800 mb-2">
          Can't find your desired service?
        </div>
        <div className="text-gray-600 mb-4 max-w-xl mx-auto">
          Let us know 24/7 and we'll help you find the perfect solution for your
          repair needs. Our team is always ready to assist you with any
          technical issue—big or small.
        </div>
        <a
          href="/contact"
          className="inline-block px-6 py-2 rounded-lg bg-[#2591b2] text-white font-semibold shadow hover:bg-[#1a7a96] transition focus:outline-none focus:ring-2 focus:ring-[#2591b2] focus:ring-offset-2"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default SearchResults;
