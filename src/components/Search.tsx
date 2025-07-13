'use client';
import React, { useEffect, useState, useRef } from 'react';
import Fuse from 'fuse.js';
import { useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useServicesPop } from '@/lib/api';

const Search = ({ isTopNav, data }: { isTopNav?: boolean; data?: any }) => {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 600px)');

  // ✅ Use React Query for services data
  const { data: servicesData, isLoading: servicesLoading } = useServicesPop();
  const services = servicesData?.brands || [];

  // Store all services for local fuzzy search
  const allServicesRef = useRef<any[]>([]);

  useEffect(() => {
    if (data) {
      allServicesRef.current = data;
      localStorage.setItem('services', JSON.stringify(data));
    } else if (services.length > 0) {
      allServicesRef.current = services;
      localStorage.setItem('services', JSON.stringify(services));
    } else {
      const cachedData = localStorage.getItem('services');
      if (cachedData) {
        const parsed = JSON.parse(cachedData);
        allServicesRef.current = parsed;
      }
    }
  }, [data, services]);

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
      setLoading(false);
    }, 250); // 250ms debounce
    // Cleanup
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      return undefined;
    };
  }, [searchText]);

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
            onFocus={() => {
              if (suggestions.length > 0) setShowSuggestions(true);
            }}
            onBlur={() => {
              // Delay hiding suggestions to allow clicking
              setTimeout(() => setShowSuggestions(false), 200);
            }}
          />
        </div>
        <button
          type="submit"
          className="bg-[#2591b2] hover:bg-[#1f7a94] text-white px-4 py-2 sm:py-3 text-sm font-medium transition-colors duration-200 flex items-center justify-center"
        >
          <svg
            className="w-4 h-4 mr-2"
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
          Search
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Searching...</div>
          ) : suggestions.length > 0 ? (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li key={index}>
                  <button
                    type="button"
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                    onClick={() => {
                      setSearchText(suggestion.label);
                      setShowSuggestions(false);
                      router.push(
                        `/search?q=${encodeURIComponent(suggestion.label)}`
                      );
                    }}
                  >
                    {suggestion.label}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
