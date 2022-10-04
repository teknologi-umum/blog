import Link from 'next/link';
import type { PostField } from '~/types/post';
import { PostCard } from './PostCard';

type ReadAnywayProps = {
  posts: PostField[];
};

export function ReadAnyway({ posts }: ReadAnywayProps) {
  return (
    <>
      <style jsx>{`
        @media screen and (max-width: 1024px) {
          .horizontal-scroll {
            grid-auto-flow: column;
            grid-auto-columns: calc(350px - 1rem * 2);
            overflow-x: auto;
          }
        }
      `}</style>
      <div className="md:-mx-12 mt-24">
        <h2 className="uppercase font-bold text-xl dark:text-neutral-100 mb-10">...OR JUST READ ANYWAY</h2>

        <div className="grid lg:grid-cols-3 print:grid-cols-2 gap-4 -mx-2 px-2 pb-6 horizontal-scroll">
          {posts.map((post: PostField, idx: number) => (
            <PostCard key={idx} {...post} />
          ))}
        </div>

        <Link href="/blog">
          <a className="w-full font-bold text-black dark:text-white text-center block mt-10 hover:text-primary-600 dark:hover:text-primary-200 transition duration-300">
            FIND MORE POST
          </a>
        </Link>
      </div>
    </>
  );
}
