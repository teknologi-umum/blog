import type { GetStaticPaths, GetStaticProps } from 'next';
import AuthorCard from '#components/AuthorCard';
import ImageWithFrame from '#components/ImageWithFrame';
import EnhancedSection from '#components/EnhancedSection';
import { transformMdx } from 'utils/transformMdx';
import { getPostBySlug, getPostSlugs } from 'utils/posts';
import siteData from '../../data/site';
import { NextSeo } from 'next-seo';
import type { PostFields } from '#types/post';
import { MDXRemote } from 'next-mdx-remote';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Giscus } from '@giscus/react';
import { isCookieEnabled } from '#utils/cookies';

interface PostType extends PostFields {
  html: MDXRemoteSerializeResult<Record<string, unknown>>;
}

export default function Post({
  title,
  desc,
  html,
  author,
  github,
  twitter,
  telegram,
  date,
  cover = '/image/sample.jpg',
}: PostType) {
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
            url(${cover});
        }
        .shift-left {
          left: calc(-50vw + 50%);
        }
      `}</style>
      <header className="flex flex-row items-center w-screen relative shift-left bg-gray-100 bg-no-repeat bg-cover bg-center bg-image my-4">
        <div className="flex-1 w-full px-4 md:px-8 pt-32 pb-20 rounded-lg -mt-16 text-center md:text-left print:pb-5">
          <div className="mx-auto w-full max-w-screen-lg print:px-10">
            <h1 className="font-heading text-gray-800 text-4xl font-bold capitalize mb-2">{title}</h1>
            <p className="text-gray-600 text-xl font-serif mb-4 pt-2">{desc}</p>
            <p className="mb-10 text-gray-600 text-sm uppercase">
              Posted on {new Date(date).toLocaleDateString('en-GB')}
            </p>
            <AuthorCard author={author} github={github} twitter={twitter} telegram={telegram} />
          </div>
        </div>
      </header>
      <div className="mx-auto py-12 max-w-screen-md prose xl:prose-lg prose-ul:break-words prose-code:break-words print:prose-pre:border print:pt-3 print:prose-pre:whitespace-pre-wrap	">
        <MDXRemote
          {...html}
          components={{
            img: ImageWithFrame,
            pre: function CopyableCodeBlock(props) {
              return <EnhancedSection copyable {...props} />;
            },
          }}
        />
      </div>
      <div className="print:hidden">
        {isCookieEnabled() && (
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
        )}
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
    'cover',
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
