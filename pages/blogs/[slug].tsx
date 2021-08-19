import NextPageError from 'next/error';
import { getContent } from '#utils/content';
import PageContent from '../../components/PageContent';

export default function Content({ meta, html }) {
  if (!html) {
    return <NextPageError statusCode={404} />;
  }

  return <PageContent meta={meta} html={html} />;
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { meta, html } = await getContent('blogs', params.slug);

  return {
    props: {
      meta,
      html,
    },
    // Revalidate every 1 hour after first request
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
