'use client';

import MenuItem from '@/components/molecules/MenuItem/MenuIem';
import Logo from '@/components/atoms/Logo/Logo';
import { SideNavigationProps } from './SideNavigationProps';

export default function SideNavigation({ menuItems, logo }: SideNavigationProps) {
  return (
    <div className="sticky top-0 w-16 md:w-24 shrink-0 h-screen overflow-y-auto no-scrollbar border-r border-slate-200 dark:border-slate-800">
      <div className="h-full flex flex-col justify-between after:flex-1 after:mt-auto">
        <div className="flex-1">
          {logo && (
            <Logo
              src={logo.url}
              alt={logo.alternativeText}
            />
          )}
        </div>
        <div className="flex-1 grow flex items-center">
          <nav className="w-full">
            <ul className="space-y-4">
              {menuItems.map((item) => (
                <MenuItem
                  key={item.id}
                  {...item}
                />
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
