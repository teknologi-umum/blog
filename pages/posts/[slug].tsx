import type { GetStaticPaths, GetStaticProps } from 'next';
import AuthorCard from '#components/AuthorCard';
import { transformMdx } from 'utils/transformMdx';
import { getPostBySlug, getPostSlugs } from 'utils/posts';
import siteData from '../../data/site';
import { NextSeo } from 'next-seo';
import type { PostFields } from '#types/post';
import { MDXRemote } from 'next-mdx-remote';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Giscus } from '@giscus/react';

interface PostType extends PostFields {
  html: MDXRemoteSerializeResult<Record<string, unknown>>;
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
      <style jsx>{`
        .bg-image {
          background-image: linear-gradient(120deg, rgba(243, 244, 246, 100) 35%, rgba(243, 244, 246, 0) 100%),
            url('https://images.unsplash.com/photo-1549880181-56a44cf4a9a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80');
        }
        .shift-left {
          left: calc(-50vw + 50%);
        }
      `}</style>
      <header className="flex flex-row items-center w-screen relative shift-left bg-gray-100 bg-no-repeat bg-cover bg-center bg-image my-4">
        <div className="flex-1 w-full px-4 md:px-8 pt-32 pb-20 rounded-lg -mt-16 text-center md:text-left">
          <div className="mx-auto w-full max-w-screen-lg">
            <h1 className="font-heading text-gray-800 text-4xl font-bold capitalize mb-2">{title}</h1>
            <p className="text-gray-600 text-xl font-serif mb-4 pt-2">{desc}</p>
            <p className="mb-10 text-gray-600 text-sm uppercase">
              Posted on {new Date(date).toLocaleDateString('en-GB')}
            </p>
            <AuthorCard author={author} github={github} twitter={twitter} telegram={telegram} />
          </div>
        </div>
      </header>
      <div className="mx-auto py-12 max-w-screen-md prose xl:prose-lg">
        <MDXRemote {...html} />
      </div>
      <Giscus
        repo="teknologi-umum/blog"
        repoId="MDEwOlJlcG9zaXRvcnkzOTU1NzU1NTk="
        category="General"
        categoryId="DIC_kwDOF5QBB84B-uOk"
        mapping="pathname"
        term="..."
        reactionsEnabled="1"
        emitMetadata="1"
        // TODO: Change the theme to "preferred_color_scheme" when we implement dark mode support
        theme="light"
      />
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
  const html = await transformMdx(content!);

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
