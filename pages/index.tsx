import { getAllPosts } from '../utils/posts';
import PostCard from '../components/PostCard';
import type { PostFields } from '../utils/posts';

export default function Home({ posts }) {
  return (
    <div className="mx-auto max-w-screen-lg">
      <h1 className="text-center text-4xl font-bold my-8">Teknologi Umum</h1>
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post: PostFields, idx: number) => (
          <PostCard {...post} key={idx} />
        ))}
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const posts = await getAllPosts(['title', 'slug', 'desc', 'date', 'categories']);

  return {
    props: {
      posts,
    },
  };
};
