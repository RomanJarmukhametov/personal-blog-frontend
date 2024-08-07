/// <reference types="vitest" />
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from './Header';

vi.mock('@/components/atoms/ThemeToggle/ThemeToggle', () => ({
  default: () => <div data-testid="theme-toggle">ThemeToggle</div>,
}));

vi.mock('@/components/atoms/Button/Button', () => ({
  Button: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="button">{children}</div>
  ),
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a
      href={href}
      data-testid="link"
    >
      {children}
    </a>
  ),
}));

describe('Header', () => {
  it('renders the ThemeToggle component', () => {
    render(
      <Header
        name="Home"
        href="/"
      />
    );

    const themeToggle = screen.getByTestId('theme-toggle');
    expect(themeToggle).toBeInTheDocument();
  });

  it('renders the Button component with correct Link', () => {
    render(
      <Header
        name="Home"
        href="/"
      />
    );

    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();

    const link = screen.getByTestId('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
    expect(link).toHaveTextContent('Home');
  });
});
