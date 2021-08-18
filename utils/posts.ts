import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';
import pLimit from 'p-limit';
import { join, resolve } from 'path';
import type { PostFields } from '#types/post';
import { filterPostsByKeywords } from './_modules';

const POST_DIR = resolve('content');

type Fields = Array<keyof PostFields>;

export const getPostSlugs = async (): Promise<string[]> => {
  const paths = await readdir(POST_DIR);
  return paths.map((path: string) => path.replace(/\.md$/, ''));
};

export const getPostBySlug = async (path: string, fields: Fields): Promise<Partial<PostFields>> => {
  const fullPath = join(POST_DIR, `${path}.md`);
  const fileContent = await readFile(fullPath, 'utf-8');
  const { data, content } = matter(fileContent);

  // only expose necessary field
  return fields.reduce((acc, field) => {
    if (field === 'slug') return { ...acc, slug: path.replace(/\.md$/, '') };
    if (field === 'content') return { ...acc, content };
    if (field === 'date') return { ...acc, date: data.date.toISOString() };
    if (data[field]) return { ...acc, [field]: data[field] };
    return acc;
  }, {});
};

export const getAllPosts = async (fields: Fields = []) => {
  const limit = pLimit(10);
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map((path) => limit(getPostBySlug, path, fields)));
  // sort posts by date in descending order
  return posts.sort((post1, post2) => (post1.date! > post2.date! ? -1 : 1));
};

export const getPostsBySearchKeywords = async (keywords: string) => {
  const posts = await getAllPosts(['title', 'slug', 'desc', 'date', 'categories', 'author', 'github']);

  return filterPostsByKeywords(posts, keywords);
};

// this function will return all categories available such ['javascript', 'tutorial'] from all posts dynamically
// but based from my reference which is medium, they're using
// something like 'people', 'story', 'tags', etc.
// so rather than returning all categories available
// I'm using constant string[] from a couple of available meta from each post
// so this function quite unused
export const getPostCategories = async (posts?: Partial<PostFields>[]) => {
  posts ??= await getAllPosts(['categories']);
  const categories = new Set();

  for (let i = 0; i < posts.length; i += 1) {
    const post = posts[i];
    if (post.categories && post.categories?.length) {
      for (let j = 0; j < post.categories.length; j += 1) {
        const category = post.categories[j];
        categories.add(category);
      }
    }
  }

  return [...categories];
};
