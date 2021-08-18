import { getAllPosts } from '#utils/posts';
import PostCard from '#components/PostCard';
import type { PostFields } from '#utils/posts';

export default function Blog({ posts }) {
  return (
    <>
      <style jsx>{`
        .posts {
          grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
        }
      `}</style>
      <div className="mx-auto max-w-screen-lg">
        <h1 className="text-center text-4xl font-bold my-8">Semua Post</h1>
        <div className="posts grid grid-cols-3 gap-4 px-4">
          {posts.map((post: PostFields, idx: number) => (
            <PostCard {...post} key={idx} />
          ))}
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const posts = await getAllPosts(['title', 'slug', 'desc', 'date', 'categories', 'author', 'github']);

  return {
    props: {
      posts,
    },
  };
};
