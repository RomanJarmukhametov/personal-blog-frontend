import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Logo from './Logo';
import { usePathname } from 'next/navigation';

// Mock the usePathname hook
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

describe('Logo', () => {
  it('renders the logo image when pathname is not "/"', () => {
    vi.mocked(usePathname).mockReturnValue('/about');

    const { getByAltText } = render(<Logo />);

    const logoImage = getByAltText('Me');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', expect.stringContaining('me.jpg'));
  });

  it('does not render the logo image when pathname is "/"', () => {
    vi.mocked(usePathname).mockReturnValue('/');

    const { queryByAltText } = render(<Logo />);

    const logoImage = queryByAltText('Me');
    expect(logoImage).not.toBeInTheDocument();
  });

  it('renders the logo image with correct attributes', () => {
    vi.mocked(usePathname).mockReturnValue('/projects');

    const { getByAltText } = render(<Logo />);

    const logoImage = getByAltText('Me');
    expect(logoImage).toHaveAttribute('width', '32');
    expect(logoImage).toHaveAttribute('height', '32');
  });

  it('renders a link wrapping the logo image', () => {
    vi.mocked(usePathname).mockReturnValue('/contact');

    const { getByRole } = render(<Logo />);

    const linkElement = getByRole('link');
    expect(linkElement).toHaveAttribute('href', '/');
  });
});
