import siteData from 'data/site';
import { NextSeo } from 'next-seo';
import { getAllPosts, getPostCategories } from '../utils/posts';
import Link from 'next/link';
import { PostFields } from '#types/post';
import PostCard from '#components/PostCard';
import GithubIcon from '#components/Icons/GithubIcon';

export default function Home({ categories, posts, contributors = [] }) {
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
      <ReadAnyway posts={posts} />
      <Contributing contributors={contributors} />
    </>
  );
}

export const getStaticProps = async () => {
  let categories = await getPostCategories();
  let posts = await getAllPosts(['title', 'slug', 'desc', 'date', 'categories', 'author', 'github']);
  const res = await fetch('https://api.github.com/repos/teknologi-umum/blog/contributors');
  const contributors = await res.json();

  return {
    props: {
      categories,
      posts: posts.slice(0, 6),
      contributors,
    },
  };
};

const Contributing = ({ contributors }) => {
  return (
    <>
      <div className="md:-mx-12 mt-24 bg-primary-900 py-12 px-12 md:px-16 grid gap-12 grid-cols-1 md:grid-cols-2">
        <div>
          <h1 className="text-white text-4xl font-bold">Feeling like contributing?</h1>
          <p className="mt-6 mb-4 text-white text-lg">
            Blog writers, code contributors, proofreaders... anything you could do is always welcome!
          </p>
          <a
            href="https://github.com/teknologi-umum/blog"
            className="text-black bg-white p-1.5 px-6 inline-flex items-center font-bold"
          >
            <GithubIcon width="25px" height="25px" />
            <span className="ml-2">BROWSE THE REPOSITORY</span>
          </a>
        </div>
        <div className="flex flex-wrap -mb-4 -mr-4">
          {contributors.map((contributor) => (
            <a href={contributor.html_url} key={contributor.id} className="mr-4 mb-4 inline-block">
              <img
                src={contributor.avatar_url}
                className="w-10 h-auto rounded-full mx-auto"
                loading="lazy"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                alt={contributor.login}
              />
            </a>
          ))}
          <a
            href="https://github.com/teknologi-umum/blog"
            className="bg-gray-300 mr-4 mb-4 rounded-full hover:scale-110 w-10 h-10 inline-flex items-center justify-center text-sm font-semibold"
          >
            You?
          </a>
        </div>
      </div>
    </>
  );
};

const ReadAnyway = ({ posts }) => {
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
        <h2 className="uppercase font-bold text-xl mb-10">...OR JUST READ ANYWAY</h2>

        <div className="grid lg:grid-cols-3 gap-4 -mx-2 px-2 pb-6 horizontal-scroll">
          {posts.map((post: PostFields, idx: number) => (
            <PostCard {...post} key={idx} />
          ))}
        </div>

        <Link href="/blog">
          <a className="w-full font-bold text-black text-center block mt-10">FIND MORE POST</a>
        </Link>
      </div>
    </>
  );
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
          Embedded programming is always different with regular high-level programming with humanlike APIs--they tend to
          be closer to the metal, and less easy for humans to read.
        </p>
        <Link href="/blog">
          <a className="bg-primary-900 text-white py-1.5 px-10 inline-block mt-4">READ MORE</a>
        </Link>
      </div>
      <div className="w-5/6 lg:w-full mx-auto lg:mx-0">
        <div className="aspect-w-16 aspect-h-13 w-full">
          <img
            className="w-full object-cover object-center"
            src="https://picsum.photos/500"
            alt="Modern C++ on Arduino"
          />
        </div>
      </div>
    </div>
  );
};
