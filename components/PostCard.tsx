import Link from 'next/link';
import type { PostFields } from '#types/post';

export default function PostCard({
  slug,
  title,
  desc,
  categories,
  author,
  github,
  cover = '/image/sample.jpg',
}: Partial<PostFields>) {
  return (
    <>
      <style jsx>
        {`
          p,
          a {
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        `}
      </style>
      <div className="max-h-max flex flex-col flex-wrap justify-start shadow-lg rounded-md overflow-hidden font-sans">
        <img className="h-[10rem] object-cover w-full" src={cover} alt={slug} />
        <div className="p-4">
          <div className="flex flex-wrap gap-1 mb-2">
            {categories &&
              categories.map((category: string, idx: number) => (
                <span
                  className="text-xs px-2 py-1 rounded-sm bg-gray-200 text-gray-700 uppercase font-semibold"
                  key={`${idx}-${category}`}
                >
                  {category}
                </span>
              ))}
          </div>
          <div className="py-1">
            <Link href={`/posts/${slug}`}>
              <a className="text-xl font-bold capitalize font-display text-gray-800 hover:text-primary-600">{title}</a>
            </Link>
            <p className="text-base leading-relaxed text-gray-500 mb-2 font-serif">{desc}</p>
          </div>
          <a className="group" href={`https://github.com/${github}`}>
            <div className="flex gap-2 items-center justify-start">
              <img
                className="rounded-full shadow-md"
                src={`https://github.com/${github}.png`}
                width="32"
                height="32"
                alt="author"
              />
              <span className="text-sm text-left text-gray-700 group-hover:text-primary-600">{author}</span>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
