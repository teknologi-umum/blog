import TwitterIcon from '#components/TwitterIcon';

interface AuthorCardProps {
  author: string;
  github: string;
  twitter: string;
}

export default function AuthorCard({ author, github, twitter }: AuthorCardProps) {
  return (
    <div className="text-center md:text-left md:inline-grid md:grid-cols-[3.5rem,1fr] md:grid-rows-2 md:items-center md:justify-center">
      <div className="grid place-items-center row-start-1 row-end-3">
        <a href={`https://github.com/${github}`}>
          <img className="rounded-full" src={`https://github.com/${github}.png`} width="42" height="42" alt="author" />
        </a>
      </div>
      <span className="md:text-left text-gray-700">{author}</span>
      <a
        href={`https://twitter.com/${twitter}`}
        className="flex items-center justify-center md:justify-start gap-2 text-gray-700 hover:text-blue-600"
      >
        @{twitter}{' '}
        <span className="text-blue-600">
          <TwitterIcon />
        </span>
      </a>
    </div>
  );
}
