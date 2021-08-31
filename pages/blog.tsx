import { getAllPosts } from '#utils/posts';
import PostCard from '#components/PostCard';
import type { PostFields } from '#types/post';

export default function Blog({ posts }) {
  return (
    <>
      <style jsx>{`
        .posts {
          grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
        }

        @media screen and (min-width: 432px) {
          .posts {
            grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
          }
        }
      `}</style>
      <h1 className="text-left uppercase text-2xl font-bold my-8">Blog Posts</h1>
      <div className="posts grid grid-cols-3 gap-4 px-4">
        {posts.map((post: PostFields, idx: number) => (
          <PostCard {...post} key={idx} />
        ))}
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
