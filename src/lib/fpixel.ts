// export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
export const FB_PIXEL_ID = '140605229139252';

// add fbq type as any to window object

export const pageview = () => {
  (window as any).fbq('track', 'PageView');
};

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name: string, options = {}) => {
  (window as any)?.fbq('track', name, options);
};
