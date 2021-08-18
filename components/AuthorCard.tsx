import Image from 'next/image';
import TwitterIcon from './TwitterIcon';

export default function AuthorCard({ name, github, twitter }) {
  return (
    <div className="inline-grid grid-cols-[3.5rem,1fr] grid-rows-2 items-center justify-center">
      <div className="grid place-items-center row-start-1 row-end-3">
        <a href={`https://github.com/${github}`}>
          <Image
            className="rounded-full"
            src={`https://github.com/${github}.png`}
            width="42"
            height="42"
            alt="author"
          />
        </a>
      </div>
      <span className="font-sans text-left text-gray-700">{name}</span>
      <a href={`https://twitter.com/${twitter}`} className="font-sans text-left flex items-center gap-2 text-gray-700">
        @{twitter}{' '}
        <span className="text-blue-500">
          <TwitterIcon />
        </span>
      </a>
    </div>
  );
}
