import Link from 'next/link';

const BrowseTopic = ({ categories }) => {
  return (
    <>
      <style jsx>{`
        .item {
          flex: 0 0 calc(20% - 1.5rem);
        }
      `}</style>
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
              <a className="item text-lg pb-3 border-b border-black text-center lowercase hover:text-primary-600 whitespace-nowrap">
                {category}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default BrowseTopic;
