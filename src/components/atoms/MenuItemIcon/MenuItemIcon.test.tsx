import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { getIcon } from './MenuItemIcon';
import '@testing-library/jest-dom';

describe('MenuItemIcon', () => {
  it('renders the Home icon', () => {
    const { container } = render(getIcon({ name: 'home' }));
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders the About icon', () => {
    const { container } = render(getIcon({ name: 'about' }));
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders the Projects icon', () => {
    const { container } = render(getIcon({ name: 'projects' }));
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders the Resume icon', () => {
    const { container } = render(getIcon({ name: 'resume' }));
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders the Subscribe icon', () => {
    const { container } = render(getIcon({ name: 'subscribe' }));
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
