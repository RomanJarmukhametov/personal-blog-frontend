import React from 'react';
import clsx from 'clsx'; // Import clsx for className merging
import { HeadingProps } from './HeadingProps';

const Heading: React.FC<HeadingProps> = ({ level, text, highlightedText, children, className }) => {
  const baseClass = (): string => {
    switch (level) {
      case '1':
        return 'antialiased text-4xl font-semibold md:text-5xl text-slate-900 dark:text-slate-50';
      case '2':
        return 'antialiased text-2xl font-semibold md:text-3xl text-slate-900 dark:text-slate-50';
      case '3':
        return 'antialiased text-xl font-semibold md:text-2xl text-slate-900 dark:text-slate-50';
      case '4':
        return 'antialiased text-lg font-semibold text-slate-900 dark:text-slate-50';
      default:
        return '';
    }
  };

  /**
   * The `renderText` function highlights a specific text within a given text by wrapping it in a
   * styled `<span>` element.
   * @returns The `renderText` function returns an array of JSX elements. Each element in the array is
   * either a regular text part or a `<span>` element with specific styling applied if the part matches
   * the `highlightedText`.
   */
  const renderText = () => {
    if (!highlightedText || !text) return text;

    const parts = text.split(new RegExp(`(${highlightedText})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlightedText.toLowerCase() ? (
        <span
          key={index}
          className="inline-flex relative text-sky-500 before:absolute before:inset-0 before:bg-sky-200 dark:before:bg-sky-500 before:opacity-30 before:-z-10 before:-rotate-2 before:translate-y-1/4"
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return React.createElement(
    `h${level}`,
    { className: clsx(baseClass(), className) }, // Merge baseClass with className
    children || renderText()
  );
};

export default Heading;
