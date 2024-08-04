import { MenuItemProps } from '@/components/molecules/MenuItem/MenuItemProps';

export interface SideNavigationProps {
  menuItems: MenuItemProps[];
  logo: {
    url: string;
    alternativeText: string;
  } | null;
}
