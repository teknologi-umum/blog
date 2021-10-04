import siteData from 'data/site';
import { NextSeo } from 'next-seo';
import { getPostCategories } from '../utils/posts';
import Link from 'next/link';

export default function Home({ categories }: any) {
  return (
    <>
      <NextSeo
        title={siteData.siteName}
        description={siteData.description}
        openGraph={{
          type: 'website',
          title: siteData.siteName,
          description: siteData.description,
          url: process.env.NEXT_PUBLIC_SERVER_URL,
          site_name: siteData.siteName,
        }}
      />
      <FeaturedPost />
      <Browse categories={categories} />
    </>
  );
}

export const getStaticProps = async () => {
  let categories = await getPostCategories();
  return {
    props: {
      categories,
    },
  };
};

const Browse = ({ categories }) => {
  const Block = ({ category }) => (
    <>
      <style jsx>{`
        .flex-item {
          flex: 0 0 calc(20% - 1.5rem);
        }
      `}</style>
      <a
        href="#"
        className="text-lg pb-3 border-b border-black text-center hover:text-primary-900 hover:font-bold flex-item whitespace-nowrap"
      >
        {category}
      </a>
    </>
  );

  return (
    <div className="md:-mx-12 mt-24">
      <h2 className="uppercase font-bold text-xl mb-10">Browse Interesting Topics</h2>

      <div className="flex flex-wrap gap-6 items-center">
        {categories.map((category: string) => (
          <Block category={category} key={category} />
        ))}
      </div>
    </div>
  );
};

const FeaturedPost = () => {
  return (
    <>
      <style jsx>{`
        .aspect-landscape {
          position: relative;
        }

        .aspect-landscape > * {
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }

        .aspect-landscape::before {
          float: left;
          content: '';
          padding-top: 81.25%;
        }

        .aspect-landscape::after {
          content: '';
          display: block;
          clear: both;
        }
      `}</style>
      <div className="grid lg:grid-cols-2 grid-cols-1 items-center mt-12 md:-mx-12 lg:gap-x-20 gap-y-10 lg:gap-y-0">
        <div className="lg:text-left text-center">
          <p className="text-black font-medium">FEATURED</p>
          <h1 className="sm:text-5xl text-4xl mb-4 mt-2 font-bold text-black">Modern C++ on Arduino</h1>
          <a className="group inline-block" href={`https://github.com/`}>
            <div className="flex space-x-2 items-center justify-start">
              <img
                className="rounded-full shadow-md"
                src={`https://avatars.githubusercontent.com/u/1024025?v=4`}
                width="32"
                height="32"
                alt="author"
              />
              <span className="text-sm text-left text-gray-700 group-hover:text-primary-600">Simon Al Kamina</span>
            </div>
          </a>
          <p className="mt-4 leading-relaxed font-serif text-gray-500">
            Embedded programming is always different with regular high-level programming with humanlike APIs--they tend
            to be closer to the metal, and less easy for humans to read.
          </p>
          <Link href="/blog">
            <a className="bg-primary-900 text-white py-1.5 px-10 inline-block mt-4">READ MORE</a>
          </Link>
        </div>
        <div className="w-5/6 lg:w-full mx-auto lg:mx-0">
          <div className="aspect-landscape w-full">
            <img className="w-full object-cover object-center" src="https://picsum.photos/500" />
          </div>
        </div>
      </div>
    </>
  );
};
