'use client';

import Image from 'next/image';
import { useState } from 'react';
// Use a local static asset for the placeholder to avoid extra HTTPS calls
const placeholder = '/image/placeholder.png'; // Ensure this file exists in /public/image/

// Optionally, use a base64-encoded SVG for a zero-request placeholder (uncomment below and comment above to use)
// const placeholder =
//   'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjE3NiIgdmlld0JveD0iMCAwIDI0MCAxNzYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjI0MCIgaGVpZ2h0PSIxNzYiIGZpbGw9IiNlZWUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9ImNlbnRyYWwiIGZvbnQtc2l6ZT0iMjBweCIgZmlsbD0iI2NjYyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW1hZ2U8L3RleHQ+PC9zdmc+';

interface ImageWithFallbackProps {
  src: string | undefined | null;
  alt: string;
  [key: string]: any;
}

const ImageWithFallback = ({ src, alt, ...props }: ImageWithFallbackProps) => {
  const [error, setError] = useState<boolean>(false);

  const handleError = () => {
    setError(true);
  };

  return (
    <Image
      src={error || !src ? placeholder : src}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
};

export default ImageWithFallback;
