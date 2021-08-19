import ContentPreview from '#components/ContentPreview';
import { getListContent } from '#utils/content';

export default function Blog({ contents }) {
  return (
    <>
      <style jsx>{`
        .posts {
          grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
        }
      `}</style>
      <div className="max-w-screen-lg mx-auto">
        <h1 className="my-8 text-4xl font-bold text-center">Semua Blogs</h1>
        <div className="grid grid-cols-3 gap-4 px-4 posts">
          {contents.map(({ meta }, idx: number) => (
            <ContentPreview {...meta} key={idx} />
          ))}
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const contents = await getListContent('news');

  return {
    props: {
      contents,
    },
  };
};
