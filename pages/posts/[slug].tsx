import type { GetStaticPaths, GetStaticProps } from 'next';
import { markdownToHtml } from 'utils/markdownToHtml';
import { getPostBySlug, getPostSlugs } from 'utils/posts';

export default function Post({ html }) {
  return (
    <div className="mx-auto max-w-screen-md prose xl:prose-lg">
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
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
