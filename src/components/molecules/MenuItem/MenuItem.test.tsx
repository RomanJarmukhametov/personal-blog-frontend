import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MenuItem from './MenuIem';
import { usePathname } from 'next/navigation';

// Mock the usePathname hook
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

describe('MenuItem', () => {
  it('renders correctly with the given props', () => {
    const href = '/';
    const icon = 'home';
    const text = 'Home';

    vi.mocked(usePathname).mockReturnValue('/');

    const { getByText, getByRole } = render(
      <MenuItem
        href={href}
        icon={icon}
        text={text}
      />
    );

    const linkElement = getByRole('link');
    expect(linkElement).toHaveAttribute('href', href);
    expect(linkElement.querySelector('svg')).toBeInTheDocument();
    expect(getByText('Home')).toHaveClass('sr-only');
  });

  it('applies the active class when the pathname matches href', () => {
    const href = '/';
    const icon = 'home';
    const text = 'Home';

    vi.mocked(usePathname).mockReturnValue(href);

    const { getByRole } = render(
      <MenuItem
        href={href}
        icon={icon}
        text={text}
      />
    );

    const linkElement = getByRole('link');
    expect(linkElement).toHaveClass('text-sky-500 after:bg-sky-500');
  });

  it('applies the inactive class when the pathname does not match href', () => {
    const href = '/about';
    const icon = 'about';
    const text = 'About';

    vi.mocked(usePathname).mockReturnValue('/');

    const { getByRole } = render(
      <MenuItem
        href={href}
        icon={icon}
        text={text}
      />
    );

    const linkElement = getByRole('link');
    expect(linkElement).toHaveClass(
      'text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400'
    );
  });

  it('renders the correct icon based on the icon prop', () => {
    const href = '/';
    const icon = 'projects';
    const text = 'Projects';

    vi.mocked(usePathname).mockReturnValue('/');

    const { container } = render(
      <MenuItem
        href={href}
        icon={icon}
        text={text}
      />
    );

    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });
});
