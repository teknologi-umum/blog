import AuthorCard from '../../components/AuthorCard';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { markdownToHtml } from 'utils/markdownToHtml';
import { getPostBySlug, getPostSlugs } from 'utils/posts';
import { authors } from '../../data/author';

export default function Post({ title, desc, html, author }) {
  return (
    <>
      <header className="w-full pt-32 pb-20 bg-gray-100 mb-8 -mt-16">
        <div className="mx-auto max-w-screen-lg">
          <h1 className="font-heading text-gray-800 text-4xl font-bold capitalize mb-3">{title}</h1>
          <p className="font-sans text-gray-600 text-xl leading-loose mb-12">{desc}</p>
          <AuthorCard {...authors[author]} />
        </div>
      </header>
      <div className="mx-auto px-4 max-w-screen-md prose xl:prose-lg">
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { content, ...metadata } = getPostBySlug(params!.slug! as string, [
    'title',
    'content',
    'date',
    'desc',
    'author',
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
  const slugs = getPostSlugs();

  return {
    paths: slugs.map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
};
