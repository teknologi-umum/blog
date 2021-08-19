import { useRouter } from 'next/router';
import ContentPreview from '#components/ContentPreview';
import { getListContent } from '#utils/content';
import NextPageError from 'next/error';

export default function Blog({ type, contents }) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <h2>Loading list content...</h2>;
  }

  if (!contents) {
    return <NextPageError statusCode={404} />;
  }

  return (
    <>
      <style jsx>{`
        .posts {
          grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
        }
      `}</style>
      <div className="max-w-screen-lg mx-auto">
        <h1 className="my-8 text-4xl font-bold text-center">Semua {type === 'blogs' ? 'Blogs' : 'News'}</h1>
        <div className="grid grid-cols-3 gap-4 px-4 posts">
          {contents.map(({ meta }, idx: number) => (
            <ContentPreview contentType={type} {...meta} key={idx} />
          ))}
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async ({ params }) => {
  const contents = await getListContent(params.type);

  return {
    props: {
      type: params.type,
      contents,
    },
    // Revalidate list contents every 1 hour after first request
    revalidate: 3600,
  };
};

export async function getStaticPaths() {
  return {
    fallback: true,
    paths: [],
  };
}
