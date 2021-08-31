import { useDebounce } from '#hooks/index';
import React, { useEffect, useState } from 'react';
import type { PostFields } from '#types/post';
import PostCard from '#components/PostCard';

export default function Search() {
  const [keywords, setKeywords] = useState<string>('');
  const [posts, setPosts] = useState<PostFields[]>([]);

  const debouncedKeywords = useDebounce<typeof keywords>(keywords);

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch(`/api/search?keywords=${debouncedKeywords}`);
      const json = await res.json();
      setPosts(json.data);

      console.log(json.data);
    };

    if (debouncedKeywords.replace(/\s/g, '').length) {
      getPosts();
      return;
    }

    setPosts([]);
  }, [debouncedKeywords]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setKeywords(value);
  };
  return (
    <>
      <style jsx>{`
        .thin-border-b {
          border-bottom-width: 1px;
        }
        .posts {
          grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
        }

        @media screen and (min-width: 432px) {
          .posts {
            grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
          }
        }
      `}</style>
      <div className="my-8">
        <input
          className="thin-border-b w-full h-12 leading-tight border-0 border-gray-600 text-2xl focus:outline-none"
          type="text"
          placeholder="Dukun Teknologi Umum"
          onChange={handleChange}
        />
      </div>

      {posts.length > 0 && (
        <div className="posts grid grid-cols-3 gap-4 px-4">
          {posts.map((post: PostFields, idx: number) => (
            <PostCard {...post} key={idx} />
          ))}
        </div>
      )}
    </>
  );
}
