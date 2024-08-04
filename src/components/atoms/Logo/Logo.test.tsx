import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Logo from './Logo';
import { usePathname } from 'next/navigation';

// Mock the usePathname hook
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

// Mock the StrapiImage component
vi.mock('@/components/atoms/StrapiImage/StrapiImage', () => ({
  StrapiImage: ({
    src,
    alt,
    width,
    height,
    className,
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
  }) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  ),
}));

describe('Logo', () => {
  const logoProps = {
    src: '/uploads/me_2542f5c41c.jpg',
    alt: 'Me',
  };

  it('renders the logo image when pathname is not "/"', () => {
    vi.mocked(usePathname).mockReturnValue('/about');

    const { getByAltText } = render(
      <Logo
        src={logoProps.src}
        alt={logoProps.alt}
      />
    );

    const logoImage = getByAltText('Me');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', logoProps.src);
  });

  it('does not render the logo image when pathname is "/"', () => {
    vi.mocked(usePathname).mockReturnValue('/');

    const { queryByAltText } = render(
      <Logo
        src={logoProps.src}
        alt={logoProps.alt}
      />
    );

    const logoImage = queryByAltText('Me');
    expect(logoImage).not.toBeInTheDocument();
  });

  it('renders the logo image with correct attributes', () => {
    vi.mocked(usePathname).mockReturnValue('/projects');

    const { getByAltText } = render(
      <Logo
        src={logoProps.src}
        alt={logoProps.alt}
      />
    );

    const logoImage = getByAltText('Me');
    expect(logoImage).toHaveAttribute('width', '32');
    expect(logoImage).toHaveAttribute('height', '32');
  });

  it('renders a link wrapping the logo image', () => {
    vi.mocked(usePathname).mockReturnValue('/contact');

    const { getByRole } = render(
      <Logo
        src={logoProps.src}
        alt={logoProps.alt}
      />
    );

    const linkElement = getByRole('link');
    expect(linkElement).toHaveAttribute('href', '/');
  });
});
