import { NextSeo } from 'next-seo';
import siteData from 'data/site';
import { getAllPosts } from '~/services';
import { PostCard } from '~/components/PostCard';
import type { PostField } from '~/types/post';

export default function Blog({ posts }) {
  return (
    <>
      <NextSeo
        title={'Blog - ' + siteData.siteName}
        description={siteData.description}
        openGraph={{
          type: 'website',
          title: 'Blog - ' + siteData.siteName,
          description: siteData.description,
          url: process.env.NEXT_PUBLIC_SERVER_URL,
          site_name: siteData.siteName,
        }}
      />
      <style jsx>{`
        @media print {
          .posts {
            grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
          }
        }
      `}</style>
      <h1 className="text-left uppercase text-2xl font-bold my-8 dark:text-neutral-100">Blog Posts</h1>
      <div className="posts grid lg:grid-cols-3 gap-4">
        {posts.map((post: PostField, idx: number) => (
          <PostCard {...post} key={idx} />
        ))}
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const posts = await getAllPosts(['title', 'slug', 'desc', 'date', 'categories', 'cover', 'author', 'github']);

  return {
    props: {
      posts,
    },
  };
};
