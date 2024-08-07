/// <reference types="vitest" />

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import ThemeToggle from './ThemeToggle';
import { useTheme } from 'next-themes';

// Mock the useTheme hook
vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
}));

describe('ThemeToggle', () => {
  it('renders the checkbox correctly', () => {
    (useTheme as unknown as Mock).mockReturnValue({ theme: 'light', setTheme: vi.fn() });

    render(<ThemeToggle />);

    const checkbox = screen.getByRole('checkbox', { name: /switch to light \/ dark version/i });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });

  it('toggles theme from light to dark on change', () => {
    const setThemeMock = vi.fn();
    (useTheme as unknown as Mock).mockReturnValue({
      theme: 'light',
      setTheme: setThemeMock,
    });

    render(<ThemeToggle />);

    const checkbox = screen.getByRole('checkbox', { name: /switch to light \/ dark version/i });
    fireEvent.click(checkbox);
    expect(setThemeMock).toHaveBeenCalledWith('dark');
  });

  it('toggles theme from dark to light on change', () => {
    const setThemeMock = vi.fn();
    (useTheme as unknown as Mock).mockReturnValue({
      theme: 'dark',
      setTheme: setThemeMock,
    });

    render(<ThemeToggle />);

    const checkbox = screen.getByRole('checkbox', { name: /switch to light \/ dark version/i });
    fireEvent.click(checkbox);
    expect(setThemeMock).toHaveBeenCalledWith('light');
  });

  it('renders correct svg for light theme', () => {
    (useTheme as unknown as Mock).mockReturnValue({ theme: 'light', setTheme: vi.fn() });

    render(<ThemeToggle />);

    const lightIcon = document.querySelector('.dark\\:hidden');
    expect(lightIcon).toBeInTheDocument();
  });

  it('renders correct svg for dark theme', () => {
    (useTheme as unknown as Mock).mockReturnValue({ theme: 'dark', setTheme: vi.fn() });

    render(<ThemeToggle />);

    const darkIcon = document.querySelector('.hidden.dark\\:block');
    expect(darkIcon).toBeInTheDocument();
  });
});
