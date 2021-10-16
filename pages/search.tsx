import { NextSeo } from 'next-seo';
import siteData from 'data/site';
import { useDebounce } from '#hooks/index';
import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import type { PostFields } from '#types/post';
import PostCard from '#components/PostCard';
import { getAllPosts } from '#utils/posts';
import { filterPostsByKeywords } from '#utils/_modules';
import Router, { useRouter } from 'next/router';

export default function Search({ posts }) {
  const router = useRouter();
  const tags = useMemo<Array<keyof PostFields>>(() => ['author', 'title', 'categories', 'desc'], []);
  const [filteredPosts, setFilteredPosts] = useState<Partial<PostFields>[] | PostFields[]>([]);
  const [keywords, setKeywords] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const didMount = useRef(false);

  const debouncedKeywords = useDebounce<typeof keywords>(keywords);

  const notEmpty = (str: string) => str.replace(/\s/g, '').length;

  useEffect(() => {
    if (!router.isReady) return;
    if ('q' in router.query && inputRef.current) {
      const q = router.query.q as string;
      setKeywords(q);
      inputRef.current.value = q;
      setFilteredPosts(() => filterPostsByKeywords(posts, q));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    Router.replace({
      ...(notEmpty(debouncedKeywords) ? { query: { q: debouncedKeywords } } : {}),
    });

    if (notEmpty(debouncedKeywords)) {
      setFilteredPosts(() => filterPostsByKeywords(posts, debouncedKeywords, selectedTags));
      return;
    }
    setFilteredPosts(posts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedKeywords, selectedTags]);

  const activeTag = (tagName: string): string => {
    if (selectedTags.includes(tagName)) return 'font-bold';

    return '';
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setKeywords(value);
  };

  const handleSelectTag = (tagName) => {
    // check if items already exists in selectedTags
    // if so, remove it
    if (selectedTags.includes(tagName)) {
      setSelectedTags((prev) => prev.filter((v) => v !== tagName));
      return;
    }

    setSelectedTags((prev) => [...prev, tagName]);
  };
  return (
    <>
      <NextSeo
        title={'Search - ' + siteData.siteName}
        description={siteData.description}
        openGraph={{
          type: 'website',
          title: 'Search - ' + siteData.siteName,
          description: siteData.description,
          url: process.env.NEXT_PUBLIC_SERVER_URL,
          site_name: siteData.siteName,
        }}
      />
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
      <div className="my-8">
        <input
          ref={inputRef}
          className="w-full h-12 leading-tight border-0 border-b border-gray-600 text-2xl focus:outline-none"
          type="text"
          placeholder="Dukun Teknologi Umum"
          onChange={handleChange}
        />

        <div className="mt-4 flex flex-wrap gap-3">
          {tags.map((tag, idx) => (
            <div key={idx} className={`p-1 cursor-pointer ${activeTag(tag)}`} onClick={() => handleSelectTag(tag)}>
              <span className="text-base capitalize">{tag}</span>
            </div>
          ))}
        </div>
      </div>

      {filteredPosts.length > 0 && (
        <div className="posts grid grid-cols-3 gap-4 px-4">
          {filteredPosts.map((post: Partial<PostFields> | PostFields, idx: number) => (
            <PostCard {...post} key={idx} />
          ))}
        </div>
      )}
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
