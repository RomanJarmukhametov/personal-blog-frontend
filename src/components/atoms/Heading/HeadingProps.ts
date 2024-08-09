export interface HeadingProps {
  level: '1' | '2' | '3' | '4';
  text?: string;
  highlightedText?: string;
  children?: React.ReactNode;
  className?: string; // Accept custom class names
}
