import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';
import { join, resolve } from 'path';

const POST_DIR = resolve('content');

export interface PostFields {
  slug: string;
  content: string;
  title: string;
  desc: string;
  author: string;
  github: string;
  twitter: string;
  telegram: string;
  date: string;
  categories: string[];
}
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
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map((path) => getPostBySlug(path, fields)));
  // sort posts by date in descending order
  return posts.sort((post1, post2) => (post1.date! > post2.date! ? -1 : 1));
};
