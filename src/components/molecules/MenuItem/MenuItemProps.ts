import { MenuItemIconProps } from '@/components/atoms/MenuItemIcon/MenuItemIconProps';

export interface MenuItemProps {
  href: '/' | '/about' | '/subscribe' | '/projects' | '/resume';
  icon: MenuItemIconProps['name'];
  text: 'Home' | 'About' | 'Subscribe' | 'Projects' | 'Resume';
}
