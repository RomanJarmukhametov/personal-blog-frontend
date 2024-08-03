'use client';

import MenuItem from '@/components/molecules/MenuItem/MenuIem';
import Logo from '@/components/atoms/Logo/Logo';
import { MenuItemProps } from '@/components/molecules/MenuItem/MenuItemProps';

export default function SideNavigation() {
  const menuItems: MenuItemProps[] = [
    {
      id: 1,
      href: '/',
      icon: 'home',
      text: 'Home',
    },
    {
      id: 2,
      href: '/about',
      icon: 'about',
      text: 'About',
    },
    {
      id: 3,
      href: '/projects',
      icon: 'projects',
      text: 'Projects',
    },
    {
      id: 4,
      href: '/resume',
      icon: 'resume',
      text: 'Resume',
    },
    {
      id: 5,
      href: '/subscribe',
      icon: 'subscribe',
      text: 'Subscribe',
    },
  ];

  return (
    <div className="sticky top-0 w-16 md:w-24 shrink-0 h-screen overflow-y-auto no-scrollbar border-r border-slate-200 dark:border-slate-800">
      <div className="h-full flex flex-col justify-between after:flex-1 after:mt-auto">
        <div className="flex-1">
          <Logo />
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