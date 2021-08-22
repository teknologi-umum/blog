import type { GetStaticPaths, GetStaticProps } from 'next';
import AuthorCard from '../../components/AuthorCard';
import { markdownToHtml } from 'utils/markdownToHtml';
import { getPostBySlug, getPostSlugs } from 'utils/posts';
import siteData from '../../data/site';
import { NextSeo } from 'next-seo';
import type { PostFields } from '#types/post';

interface PostType extends PostFields {
  html: string;
}

export default function Post({ title, desc, html, author, github, twitter, telegram, date }: PostType) {
  return (
    <>
      <NextSeo
        title={title}
        description={desc}
        openGraph={{
          type: 'website',
          title,
          description: desc,
          url: process.env.NEXT_PUBLIC_SERVER_URL,
          site_name: siteData.siteName,
        }}
      />
      <header className="w-full px-4 pt-32 pb-20 bg-gray-100 mb-8 -mt-16 text-center md:text-left">
        <div className="mx-auto w-full max-w-screen-lg">
          <h1 className="font-heading text-gray-800 text-4xl font-bold capitalize mb-2">{title}</h1>
          <p className="text-gray-600 text-xl font-serif mb-4 pt-2">{desc}</p>
          <p className="mb-10 text-gray-600 text-sm uppercase">
            Posted in {new Date(date).toLocaleDateString('en-GB')}
          </p>
          <AuthorCard author={author} github={github} twitter={twitter} telegram={telegram} />
        </div>
      </header>
      <div className="mx-auto px-4 max-w-screen-md prose xl:prose-lg">
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { content, ...metadata } = await getPostBySlug(params!.slug! as string, [
    'title',
    'content',
    'date',
    'desc',
    'author',
    'github',
    'twitter',
    'telegram',
  ]);
  const html = await markdownToHtml(content!);

  return {
    props: {
      html,
      ...metadata,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getPostSlugs();

  return {
    paths: slugs.map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
};
