'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NumberUI from './footer/NumberUI';
import useAuthStore from '@/store/useAuthStore';

const Number = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getTotalFooter = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        'https://www.technicalsewa.com/techsewa/publiccontrol/getGetTotalFooter',
        {
          timeout: 10000, // 10 second timeout
          headers: {
            'Cache-Control': 'no-cache',
          },
        }
      );

      if (response.data) {
        setData(response);
      } else {
        throw new Error('No data received from API');
      }
    } catch (error) {
      console.error('Error fetching footer data:', error);
      setError('Failed to load statistics');

      // Set fallback data
      setData({
        data: {
          total_customers: '1000+',
          total_services: '50+',
          total_technicians: '25+',
          total_satisfaction: '98%',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const { isAuthenticated, signin } = useAuthStore();

  useEffect(() => {
    getTotalFooter();
    if (!isAuthenticated) {
      const localdata = localStorage.getItem('data');
      if (localdata !== null) {
        try {
          signin(JSON.parse(localdata));
        } catch (error) {
          console.error('Error parsing local data:', error);
        }
      }
    }
  }, [isAuthenticated, signin]);

  // Show loading state
  if (loading) {
    return (
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show error state with fallback
  if (error && !data) {
    return (
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-600 mb-8">
              Statistics temporarily unavailable
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Happy Customers', value: '1000+' },
                { label: 'Services Offered', value: '50+' },
                { label: 'Expert Technicians', value: '25+' },
                { label: 'Satisfaction Rate', value: '98%' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {item.value}
                  </div>
                  <div className="text-gray-600">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <NumberUI numbers={data?.data} />
    </>
  );
};

export default Number;
