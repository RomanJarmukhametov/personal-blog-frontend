import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Heading from './Heading';

describe('Heading component', () => {
  it('renders the correct heading level with the correct text', () => {
    render(
      <Heading
        level="1"
        text="This is a Heading"
      />
    );
    const heading = screen.getByRole('heading', { name: /this is a heading/i });
    expect(heading.tagName).toBe('H1');
    expect(heading).toHaveTextContent('This is a Heading');
  });

  it('renders with the correct classes for level 1', () => {
    render(
      <Heading
        level="1"
        text="This is a Heading"
      />
    );
    const heading = screen.getByRole('heading', { name: /this is a heading/i });
    expect(heading).toHaveClass(
      'antialiased text-4xl font-semibold md:text-5xl text-slate-900 dark:text-slate-50'
    );
  });

  it('renders with the correct classes for level 2', () => {
    render(
      <Heading
        level="2"
        text="This is a Subheading"
      />
    );
    const heading = screen.getByRole('heading', { name: /this is a subheading/i });
    expect(heading).toHaveClass(
      'antialiased text-2xl font-semibold md:text-3xl text-slate-900 dark:text-slate-50'
    );
  });

  it('renders with additional custom classes', () => {
    render(
      <Heading
        level="1"
        text="This is a Heading"
        className="custom-class"
      />
    );
    const heading = screen.getByRole('heading', { name: /this is a heading/i });
    expect(heading).toHaveClass(
      'antialiased text-4xl font-semibold md:text-5xl text-slate-900 dark:text-slate-50 custom-class'
    );
  });

  it('renders highlighted text correctly', () => {
    render(
      <Heading
        level="2"
        text="This is a highlighted text"
        highlightedText="highlighted"
      />
    );
    const highlightedPart = screen.getByText('highlighted');
    expect(highlightedPart).toBeInTheDocument();
    expect(highlightedPart).toHaveClass(
      'inline-flex relative text-sky-500 before:absolute before:inset-0 before:bg-sky-200 dark:before:bg-sky-500 before:opacity-30 before:-z-10 before:-rotate-2 before:translate-y-1/4'
    );
  });

  it('renders children instead of text when children are provided', () => {
    render(
      <Heading level="3">
        <span>Custom Child Element</span>
      </Heading>
    );
    const childElement = screen.getByText('Custom Child Element');
    expect(childElement).toBeInTheDocument();
  });

  it('renders correct text without highlighted part if highlightedText is not found', () => {
    render(
      <Heading
        level="2"
        text="This is a highlighted text"
        highlightedText="notpresent"
      />
    );
    const heading = screen.getByRole('heading', { name: /this is a highlighted text/i });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('This is a highlighted text');
    expect(screen.queryByText('notpresent')).not.toBeInTheDocument();
  });
});
