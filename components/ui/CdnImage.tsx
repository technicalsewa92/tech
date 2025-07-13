import Image, { ImageProps } from 'next/image';

interface CdnImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  useCdn?: boolean; // Kept for backward compatibility but ignored
}

/**
 * CdnImage component - CDN functionality disabled
 * Now just returns a regular Next.js Image component
 */
export default function CdnImage({
  src,
  useCdn = true, // Ignored since CDN is disabled
  ...props
}: CdnImageProps) {
  // Always use local path since CDN is disabled
  return <Image src={src} {...props} />;
}
