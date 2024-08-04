import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SideNavigation from './SideNavigation';
import { usePathname } from 'next/navigation';
import { MenuItemProps } from '@/components/molecules/MenuItem/MenuItemProps';

// Mock the usePathname hook
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

describe('SideNavigation', () => {
  it('renders the Logo component when pathname is not "/"', () => {
    vi.mocked(usePathname).mockReturnValue('/about');

    const { getByAltText } = render(<SideNavigation menuItems={[]} />);
    const logoImage = getByAltText('Me');
    expect(logoImage).toBeInTheDocument();
  });

  it('does not render the Logo component when pathname is "/"', () => {
    vi.mocked(usePathname).mockReturnValue('/');

    const { queryByAltText } = render(<SideNavigation menuItems={[]} />);
    const logoImage = queryByAltText('Me');
    expect(logoImage).not.toBeInTheDocument();
  });

  it('renders all menu items', () => {
    vi.mocked(usePathname).mockReturnValue('/');

    const menuItems = [
      { id: 1, href: '/', icon: 'home', text: 'Home' },
      { id: 2, href: '/about', icon: 'about', text: 'About' },
      { id: 3, href: '/projects', icon: 'projects', text: 'Projects' },
      { id: 4, href: '/resume', icon: 'resume', text: 'Resume' },
      { id: 5, href: '/subscribe', icon: 'subscribe', text: 'Subscribe' },
    ];

    const { getByText } = render(<SideNavigation menuItems={menuItems as MenuItemProps[]} />);

    menuItems.forEach(({ text }) => {
      expect(getByText(text)).toBeInTheDocument();
    });
  });

  it('renders menu items with correct href attributes', () => {
    vi.mocked(usePathname).mockReturnValue('/');

    const menuItems = [
      { id: 1, href: '/', icon: 'home', text: 'Home' },
      { id: 2, href: '/about', icon: 'about', text: 'About' },
      { id: 3, href: '/projects', icon: 'projects', text: 'Projects' },
      { id: 4, href: '/resume', icon: 'resume', text: 'Resume' },
      { id: 5, href: '/subscribe', icon: 'subscribe', text: 'Subscribe' },
    ];

    const { getByRole } = render(<SideNavigation menuItems={menuItems as MenuItemProps[]} />);

    menuItems.forEach(({ text, href }) => {
      const linkElement = getByRole('link', { name: text });
      expect(linkElement).toHaveAttribute('href', href);
    });
  });
});
