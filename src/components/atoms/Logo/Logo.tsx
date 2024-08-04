'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { StrapiImage } from '@/components/atoms/StrapiImage/StrapiImage';
import { LogoProps } from './LogoProps';

export default function Logo({ src, alt }: LogoProps) {
  const pathname = usePathname();
  return (
    <>
      {pathname !== '/' && (
        <div className="flex justify-center my-4">
          <Link href="/">
            <StrapiImage
              src={src}
              alt={alt}
              width={32}
              height={32}
              className="object-cover rounded-full border-2 border-gray-300 hover:border-sky-500 transition-transform transform hover:scale-105 duration-300 shadow-lg"
            />
          </Link>
        </div>
      )}
    </>
  );
}
