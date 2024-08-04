import Image from 'next/image';
import { getStrapiMedia } from '@/lib/utils';
import { StrapiImageProps } from './StrapiImageProps';

export function StrapiImage({ src, alt, height, width, className }: Readonly<StrapiImageProps>) {
  if (!src) return null;
  const imageUrl = getStrapiMedia(src);
  const imageFallback = `https://placehold.co/${width}x${height}`;

  return (
    <Image
      src={imageUrl ?? imageFallback}
      alt={alt}
      height={height}
      width={width}
      className={className}
    />
  );
}
