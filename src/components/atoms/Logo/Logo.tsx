'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import HeroImage from '@/assets/images/me.jpg';

export default function Logo() {
  const pathname = usePathname();
  return (
    <>
      {pathname !== '/' && (
        <div className="flex justify-center my-4">
          <Link href="/">
            <Image
              className="rounded-full"
              src={HeroImage}
              width={32}
              height={32}
              priority
              alt="Me"
            />
          </Link>
        </div>
      )}
    </>
  );
}
