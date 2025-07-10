import Image, { ImageProps } from 'next/image';
import { getAssetUrl } from '@/lib/cdn';

interface CdnImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  useCdn?: boolean;
}

/**
 * CdnImage component that automatically uses jsDelivr CDN for images in production
 * Falls back to local images in development
 */
export default function CdnImage({
  src,
  useCdn = true,
  ...props
}: CdnImageProps) {
  // Determine the source URL (CDN or local)
  const imageUrl = useCdn ? getAssetUrl(src) : src;

  return <Image src={imageUrl} {...props} />;
}
