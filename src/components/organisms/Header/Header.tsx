import Link from 'next/link';
import { Button } from '@/components/atoms/Button/Button';
import ThemeToggle from '@/components/atoms/ThemeToggle/ThemeToggle';

interface HeaderProps {
  name: string;
  href: string;
}

export default function Header({ name, href }: HeaderProps) {
  return (
    <header>
      <div className="flex items-center justify-between h-16 before:block">
        <div className="grow flex justify-end space-x-4">
          {/* Light switch */}
          <ThemeToggle />

          {/* Button */}
          <div>
            <Button
              size="sm"
              asChild
            >
              <Link href={href}>{name}</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
