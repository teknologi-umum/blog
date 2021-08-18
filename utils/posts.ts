import { readdirSync, readFileSync } from 'fs';
import matter from 'gray-matter';
import { join, resolve } from 'path';

const POST_DIR = resolve('content');

export interface PostFields {
  slug: string;
  content: string;
  title: string;
  author: string;
  desc: string;
  categories: string[];
  date: string;
}
type Fields = Array<keyof PostFields>;

export const getPostSlugs = (): string[] => {
  return readdirSync(POST_DIR).map((path) => path.replace(/\.md$/, ''));
};

export const getPostBySlug = (path: string, fields: Fields): Partial<PostFields> => {
  const fullPath = join(POST_DIR, `${path}.md`);
  const fileContent = readFileSync(fullPath, 'utf-8');
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
  const slugs = getPostSlugs();
  const posts = slugs
    .map((path) => getPostBySlug(path, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date! > post2.date! ? -1 : 1));
  return posts;
};
