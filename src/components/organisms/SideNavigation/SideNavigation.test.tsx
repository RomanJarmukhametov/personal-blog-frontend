import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SideNavigation from './SideNavigation';
import { usePathname } from 'next/navigation';

// Mock the usePathname hook
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

describe('SideNavigation', () => {
  it('renders the Logo component when pathname is not "/"', () => {
    vi.mocked(usePathname).mockReturnValue('/about');

    const { getByAltText } = render(<SideNavigation />);
    const logoImage = getByAltText('Me');
    expect(logoImage).toBeInTheDocument();
  });

  it('does not render the Logo component when pathname is "/"', () => {
    vi.mocked(usePathname).mockReturnValue('/');

    const { queryByAltText } = render(<SideNavigation />);
    const logoImage = queryByAltText('Me');
    expect(logoImage).not.toBeInTheDocument();
  });

  it('renders all menu items', () => {
    vi.mocked(usePathname).mockReturnValue('/');

    const { getByText } = render(<SideNavigation />);

    const menuItems = ['Home', 'About', 'Projects', 'Resume', 'Subscribe'];

    menuItems.forEach((text) => {
      expect(getByText(text)).toBeInTheDocument();
    });
  });

  it('renders menu items with correct href attributes', () => {
    vi.mocked(usePathname).mockReturnValue('/');

    const { getByRole } = render(<SideNavigation />);

    const menuItems = [
      { text: 'Home', href: '/' },
      { text: 'About', href: '/about' },
      { text: 'Projects', href: '/projects' },
      { text: 'Resume', href: '/resume' },
      { text: 'Subscribe', href: '/subscribe' },
    ];

    menuItems.forEach(({ text, href }) => {
      const linkElement = getByRole('link', { name: text });
      expect(linkElement).toHaveAttribute('href', href);
    });
  });
});
