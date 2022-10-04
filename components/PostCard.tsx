import Link from 'next/link';
import type { PostField } from '~/types/post';

type PostCardProps = Pick<PostField, 'slug' | 'title' | 'desc' | 'categories' | 'author' | 'github'> & {
  cover?: string;
};

export function PostCard({
  slug,
  title,
  desc,
  categories,
  author,
  github,
  cover = '/image/sample.jpg',
}: PostCardProps) {
  return (
    <>
      <style>
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
      <div className="flex flex-col flex-wrap justify-start shadow-lg rounded-md overflow-hidden font-sans print:shadow-none print:border">
        <img className="h-[10rem] object-cover w-full" src={cover} alt={slug} />

        <div className="w-full overflow-x-auto p-4">
          <div className="flex gap-1 whitespace-nowrap">
            {categories &&
              categories.map((category: string, idx: number) => (
                <span
                  className="text-xs px-2 py-1 rounded-sm bg-gray-200 text-gray-700 uppercase font-semibold print:px-1 print:border"
                  key={`${idx}-${category}`}
                >
                  {category}
                </span>
              ))}
          </div>
        </div>

        <div className="px-4 mt-1 mb-4">
          <Link href={`/posts/${slug}`}>
            <a className="text-xl font-bold capitalize font-display text-gray-800 hover:text-primary-600">{title}</a>
          </Link>
          <p className="text-base leading-relaxed text-gray-500 mb-2 font-serif">{desc}</p>
        </div>

        <a className="group px-4 mb-4" href={`https://github.com/${github}`}>
          <div className="flex items-center justify-start">
            <img
              className="rounded-full shadow-md"
              src={`https://github.com/${github}.png`}
              width="32"
              height="32"
              alt="author"
            />
            <span className="text-sm ml-2 text-left text-gray-700 group-hover:text-primary-600">{author}</span>
          </div>
        </a>
      </div>
    </>
  );
}
