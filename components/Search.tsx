'use client';
import { baseUrl } from '@/public/baseUrl';
import React, { useEffect, useState, useRef } from 'react';
import Fuse from 'fuse.js';
import { useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';

const Search = ({ isTopNav, data }: { isTopNav?: boolean; data?: any }) => {
  const [searchText, setSearchText] = useState('');
  const [services, setServices] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 600px)');

  // Store all services for local fuzzy search
  const allServicesRef = useRef<any[]>([]);
  useEffect(() => {
    if (data) {
      setServices(data);
      allServicesRef.current = data;
      localStorage.setItem('services', JSON.stringify(data));
    } else {
      const cachedData = localStorage.getItem('services');
      if (cachedData) {
        const parsed = JSON.parse(cachedData);
        setServices(parsed);
        allServicesRef.current = parsed;
      } else {
        fetchServices();
      }
    }
  }, [data]);

  // AJAX search for suggestions as user types
  // Debounce timer
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (searchText.length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(() => {
      // Fuzzy search locally for all possible fields
      const fuse = new Fuse(allServicesRef.current, {
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
      let localResults = fuse.search(searchText).map(res => res.item);
      // Fallback: if fuzzy search returns nothing, do a substring match
      if (localResults.length === 0) {
        const q = searchText.toLowerCase();
        localResults = allServicesRef.current.filter(
          (s: any) =>
            (s.product_name && s.product_name.toLowerCase().includes(q)) ||
            (s.brand_name && s.brand_name.toLowerCase().includes(q)) ||
            (s.category_name && s.category_name.toLowerCase().includes(q)) ||
            (s.service_name && s.service_name.toLowerCase().includes(q)) ||
            (s.vertical_name && s.vertical_name.toLowerCase().includes(q))
        );
      }
      const localSuggestions = localResults.map((service: any) => ({
        label:
          service.product_name ||
          service.brand_name ||
          service.category_name ||
          service.service_name ||
          service.vertical_name ||
          'Unknown Service',
        id: service.url_product_name || service.brand_slug || service.brand_id,
      }));
      setSuggestions(localSuggestions);
      setShowSuggestions(localSuggestions.length > 0);

      // Also fetch from API for freshest data
      fetch(
        `${baseUrl}/techsewa/masterconfig/publicmasterconfig/getSliderListpop1?search=${encodeURIComponent(searchText)}`
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
          if (data?.brands && Array.isArray(data.brands)) {
            setServices(data.brands);
            allServicesRef.current = data.brands;
            // Fuzzy/substring filter API results for suggestions
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
            let apiResults = fuseApi.search(searchText).map(res => res.item);
            if (apiResults.length === 0) {
              const q = searchText.toLowerCase();
              apiResults = data.brands.filter(
                (s: any) =>
                  (s.product_name &&
                    s.product_name.toLowerCase().includes(q)) ||
                  (s.brand_name && s.brand_name.toLowerCase().includes(q)) ||
                  (s.category_name &&
                    s.category_name.toLowerCase().includes(q)) ||
                  (s.service_name &&
                    s.service_name.toLowerCase().includes(q)) ||
                  (s.vertical_name && s.vertical_name.toLowerCase().includes(q))
              );
            }
            const filteredSuggestions = apiResults.map((service: any) => ({
              label:
                service.product_name ||
                service.brand_name ||
                service.category_name ||
                service.service_name ||
                service.vertical_name ||
                'Unknown Service',
              id:
                service.url_product_name ||
                service.brand_slug ||
                service.brand_id,
            }));
            setSuggestions(filteredSuggestions);
            setShowSuggestions(filteredSuggestions.length > 0);
          } else {
            setSuggestions(localSuggestions);
            setShowSuggestions(localSuggestions.length > 0);
          }
          setLoading(false);
        })
        .catch(() => {
          setSuggestions(localSuggestions);
          setShowSuggestions(localSuggestions.length > 0);
          setLoading(false);
        });
    }, 250); // 250ms debounce
    // Cleanup
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      return undefined;
    };
  }, [searchText]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${baseUrl}/techsewa/masterconfig/publicmasterconfig/getSliderListpop1`,
        {
          signal: AbortSignal.timeout(5000), // 5 second timeout
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        throw new Error(`Invalid JSON response`);
      }

      if (data?.brands && Array.isArray(data.brands)) {
        setServices(data.brands);
        localStorage.setItem('services', JSON.stringify(data.brands)); // Cache data to localStorage
      } else {
        throw new Error('Invalid data structure');
      }
      setLoading(false);
    } catch (error) {
      console.log(
        'Search services unavailable:',
        error instanceof Error ? error.message : 'Unknown error'
      );
      // Use fallback data
      const fallbackServices = [
        { brand_id: '1', brand_name: 'Samsung', brand_slug: 'samsung' },
        { brand_id: '2', brand_name: 'LG', brand_slug: 'lg' },
        { brand_id: '3', brand_name: 'Sony', brand_slug: 'sony' },
      ];
      setServices(fallbackServices);
      setLoading(false);
    }
  };

  // (Keep the above AJAX search effect, remove this local filter effect)

  return (
    <div className="relative w-full max-w-xl mx-auto px-2 sm:px-0">
      <form
        className="flex flex-col sm:flex-row w-full bg-white rounded-lg shadow-md overflow-hidden focus-within:ring-2 focus-within:ring-[#2591b2] border-0 shadow-[0_4px_12px_0_rgba(37,145,178,0.08)]"
        onSubmit={e => {
          e.preventDefault();
          if (searchText.length > 0) {
            router.push(`/search?q=${encodeURIComponent(searchText)}`);
          }
        }}
        autoComplete="off"
      >
        <div className="flex items-center flex-1">
          <svg
            className="w-5 h-5 text-gray-400 ml-4"
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
          <input
            type="text"
            className="flex-1 py-2 sm:py-3 px-2 text-base outline-none bg-transparent border-none shadow-none min-w-0"
            placeholder="Search here..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            onFocus={() => setShowSuggestions(suggestions.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          className="hidden sm:block px-5 py-2 bg-[#2591b2] text-white font-semibold hover:bg-[#1a7a96] transition-colors min-w-[90px]"
        >
          Search
        </button>
      </form>
      {showSuggestions && (
        <ul className="absolute left-0 right-0 mt-1 bg-white border border-[#2591b2]/30 rounded-lg shadow-lg z-20 max-h-56 overflow-y-auto text-sm xs:text-base shadow-[0_8px_24px_0_rgba(37,145,178,0.10)]">
          {loading && (
            <li className="px-4 py-2 text-gray-400 text-left">Searching...</li>
          )}
          {!loading && suggestions.length === 0 && searchText.length > 0 && (
            <li className="px-4 py-2 text-gray-400 text-left">
              No services found.
            </li>
          )}
          {!loading &&
            suggestions.map((s, idx) => (
              <li
                key={s.id}
                className="px-4 py-2 cursor-pointer hover:bg-[#2591b2]/10 text-gray-800 text-left"
                onMouseDown={() => {
                  setSearchText(s.label);
                  setShowSuggestions(false);
                  router.push(`/service/${s.id}`);
                }}
              >
                {s.label}
              </li>
            ))}
        </ul>
      )}

      {/* Popular searches below search bar, above call to actions */}
      <div className="flex flex-wrap items-center gap-2 mt-3 mb-0 justify-center">
        <span className="text-gray-700 font-medium">Popular searches:</span>
        <button
          type="button"
          className="px-3 py-1 rounded-full bg-gray-100 hover:bg-[#2591b2]/10 text-gray-800 text-sm font-medium"
          onClick={() => setSearchText('Electrician')}
        >
          Electrician
        </button>
        <button
          type="button"
          className="px-3 py-1 rounded-full bg-gray-100 hover:bg-[#2591b2]/10 text-gray-800 text-sm font-medium"
          onClick={() => setSearchText('Plumber')}
        >
          Plumber
        </button>
        <button
          type="button"
          className="px-3 py-1 rounded-full bg-gray-100 hover:bg-[#2591b2]/10 text-gray-800 text-sm font-medium"
          onClick={() => setSearchText('AC Installation')}
        >
          AC Installation
        </button>
      </div>
    </div>
  );
};

export default Search;
