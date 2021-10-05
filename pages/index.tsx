import siteData from 'data/site';
import { NextSeo } from 'next-seo';
import { getAllPosts, getPostCategories } from '../utils/posts';
import FeaturedPost from '#components/FeaturedPost';
import BrowseTopic from '#components/BrowseTopic';
import ReadAnyway from '#components/ReadAnyway';
import Contributing from '#components/Contributing';

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
      <BrowseTopic categories={categories} />
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
