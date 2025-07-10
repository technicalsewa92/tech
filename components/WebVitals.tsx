'use client';

import { useEffect } from 'react';
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';
import { logger } from '@/lib/logger';
import { trackEvent } from '@/lib/analytics';

// Web Vitals thresholds
const THRESHOLDS = {
  CLS: 0.1,
  INP: 200, // Updated from FID to INP
  FCP: 1800,
  LCP: 2500,
  TTFB: 800,
};

// Function to send vitals to analytics
function sendToAnalytics(metric: any) {
  const { name, value, rating } = metric;

  // Track in Google Analytics
  trackEvent('web_vitals', 'performance', name, Math.round(value));

  // Log performance metrics
  logger.info(`Web Vital - ${name}: ${value} (${rating})`);

  // Send to performance monitoring service (optional)
  if (process.env.NODE_ENV === 'production') {
    // You can integrate with services like Sentry, DataDog, etc.
    // sendToPerformanceMonitoring(metric);
  }
}

// Grade the metric based on thresholds
function gradeMetric(
  name: string,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
  if (!threshold) return 'good';

  if (value <= threshold) return 'good';
  if (value <= threshold * 2) return 'needs-improvement';
  return 'poor';
}

// Enhanced metric reporting
function reportMetric(metric: any) {
  const { name, value, delta, entries } = metric;
  const rating = gradeMetric(name, value);

  const enhancedMetric = {
    ...metric,
    rating,
    timestamp: Date.now(),
    url: window.location.href,
    userAgent: navigator.userAgent,
  };

  sendToAnalytics(enhancedMetric);

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.group(`🔍 Web Vital: ${name}`);
    console.log(`Value: ${value.toFixed(2)}ms`);
    console.log(`Rating: ${rating}`);
    console.log(`Delta: ${delta.toFixed(2)}ms`);
    console.log(`URL: ${window.location.href}`);
    console.groupEnd();
  }
}

const WebVitals = () => {
  useEffect(() => {
    // Track Core Web Vitals
    onCLS(reportMetric);
    onINP(reportMetric); // Updated from FID to INP
    onFCP(reportMetric);
    onLCP(reportMetric);
    onTTFB(reportMetric);

    // Track custom performance metrics
    const observer = new PerformanceObserver(list => {
      list.getEntries().forEach(entry => {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;

          // Track additional metrics
          const domContentLoaded =
            navEntry.domContentLoadedEventEnd -
            navEntry.domContentLoadedEventStart;
          const loadComplete = navEntry.loadEventEnd - navEntry.loadEventStart;

          trackEvent(
            'performance',
            'navigation',
            'dom_content_loaded',
            Math.round(domContentLoaded)
          );
          trackEvent(
            'performance',
            'navigation',
            'load_complete',
            Math.round(loadComplete)
          );
        }
      });
    });

    observer.observe({ entryTypes: ['navigation'] });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
};

export default WebVitals;
