import type { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

export function ImageWithFrame({ src, alt }: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
  return (
    <figure className="text-center">
      <img className="inline-block p-0 overflow-hidden rounded-md" src={src} alt={alt} />
      <figcaption className="break-words">{alt}</figcaption>
    </figure>
  );
}
