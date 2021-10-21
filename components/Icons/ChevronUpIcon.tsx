import type { IconProperty } from '#types/icon';

export default function ChevronUpIcon({ width, height }: IconProperty) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      width={width || '1rem'}
      height={height || '1rem'}
      className="text-white"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
    </svg>
  );
}
