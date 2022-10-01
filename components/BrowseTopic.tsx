import Link from 'next/link';
import { useReducer } from 'react';

const SHOWN_TOPICS_LIMIT = 15;

type BrowseTopicProps = {
  categories: string[];
};

export function BrowseTopic({ categories }: BrowseTopicProps) {
  const [showMoreTopics, toggleShownTopics] = useReducer((s) => !s, false);

  return (
    <>
      <div className="md:-mx-12 mt-24">
        <h2 className="uppercase font-bold text-xl mb-10">Browse Interesting Topics</h2>

        <div className="flex flex-wrap gap-6 items-center justify-center">
          {categories.slice(0, showMoreTopics ? -1 : SHOWN_TOPICS_LIMIT).map((category: string, i: number) => (
            <Link
              key={i}
              href={{
                pathname: '/search',
                query: { q: category },
              }}
            >
              <a className="flex-[0_0_calc(20%-1.5rem)] text-lg pb-3 border-b border-black text-center lowercase hover:text-primary-600 whitespace-nowrap">
                {category}
              </a>
            </Link>
          ))}
        </div>

        <button
          className="block mx-auto mt-10 font-medium text-lg text-gray-600 hover:text-primary-600 hover:underline decoration-dashed underline-offset-4"
          onClick={() => toggleShownTopics()}
        >
          SHOW {showMoreTopics ? 'LESS' : 'MORE'} TOPICS
        </button>
      </div>
    </>
  );
}
