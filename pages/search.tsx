import { useDebounce } from '#hooks/index';
import React, { useEffect, useState } from 'react';
/* import type { PostFields } from '#types/post'; */

export default function Search() {
  const [keywords, setKeywords] = useState<string>('');
  /* const [posts, setPosts] = useState<PostFields[]>(); */

  const debouncedKeywords = useDebounce<typeof keywords>(keywords);

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch(`/api/search?keywords=${debouncedKeywords}`);
      const json = await res.json();

      console.log(json);
    };

    if (debouncedKeywords.replace(/\s/g, '').length) {
      getPosts();
    }
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
      `}</style>
      <div className="my-8">
        <input
          className="thin-border-b w-full h-12 leading-tight border-0 border-gray-600 text-2xl focus:outline-none"
          type="text"
          placeholder="Search"
          onChange={handleChange}
        />
      </div>
    </>
  );
}
