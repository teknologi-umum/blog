import { IconProperty } from '../../types/icon';

export default function TelegramIcon({ width, height }: IconProperty) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      width={width || '1rem'}
      height={height || '1rem'}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="12" fill="transparent" />
      <path
        fill="currentColor"
        d="m5.491 11.74 11.57-4.461c.537-.194 1.006.131.832.943l.001-.001-1.97 9.281c-.146.658-.537.818-1.084.508l-3-2.211-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953z"
      />
    </svg>
  );
}
