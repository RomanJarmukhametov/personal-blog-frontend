import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getIcon } from '@/components/atoms/MenuItemIcon/MenuItemIcon';
import { MenuItemProps } from './MenuItemProps';

export default function MenuItem({ href, icon, text }: MenuItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li className="py-2">
      <Link
        href={href}
        className={`w-full h-6 flex items-center justify-center relative after:absolute after:w-0.5 after:right-0 after:top-0 after:bottom-0 ${
          isActive
            ? 'text-sky-500 after:bg-sky-500'
            : 'text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400'
        }`}
      >
        <span className="sr-only">{text}</span>
        {getIcon({ name: icon })}
      </Link>
    </li>
  );
}
