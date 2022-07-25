import Link from 'next/link';

type BrowseTopicProps = {
  categories: string[];
};

export function BrowseTopic({ categories }: BrowseTopicProps) {
  return (
    <>
      <div className="md:-mx-12 mt-24">
        <h2 className="uppercase font-bold text-xl mb-10">Browse Interesting Topics</h2>

        <div className="flex flex-wrap gap-6 items-center">
          {categories.map((category: string, i: number) => (
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
      </div>
    </>
  );
}
