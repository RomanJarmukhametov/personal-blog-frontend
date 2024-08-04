import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StrapiImage } from './StrapiImage';
import { getStrapiMedia } from '@/lib/utils';

// Mock the getStrapiMedia utility function
vi.mock('@/lib/utils', () => ({
  getStrapiMedia: vi.fn(),
}));

describe('StrapiImage', () => {
  it('renders the image with a valid source', () => {
    const src = '/uploads/me_2542f5c41c.jpg';
    const alt = 'My Image';
    const height = 100;
    const width = 100;
    const className = 'my-class';
    const imageUrl = 'http://localhost/uploads/me_2542f5c41c.jpg';

    vi.mocked(getStrapiMedia).mockReturnValue(imageUrl);

    const { getByAltText } = render(
      <StrapiImage
        src={src}
        alt={alt}
        height={height}
        width={width}
        className={className}
      />
    );

    const image = getByAltText(alt);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src');
    expect(image.getAttribute('src')).toBeTruthy();
    expect(image).toHaveAttribute('height', height.toString());
    expect(image).toHaveAttribute('width', width.toString());
    expect(image).toHaveClass(className);
  });

  it('does not render anything when source is missing', () => {
    const { container } = render(
      <StrapiImage
        src=""
        alt="My Image"
        height={100}
        width={100}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('applies the correct alt text', () => {
    const src = '/uploads/me_2542f5c41c.jpg';
    const alt = 'My Alt Text';
    const height = 100;
    const width = 100;

    vi.mocked(getStrapiMedia).mockReturnValue('http://localhost/uploads/me_2542f5c41c.jpg');

    const { getByAltText } = render(
      <StrapiImage
        src={src}
        alt={alt}
        height={height}
        width={width}
      />
    );
    const image = getByAltText(alt);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', alt);
  });
});
