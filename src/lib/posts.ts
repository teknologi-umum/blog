import fs from 'fs';
import type { Dirent } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve, join } from 'path';
import matter from 'gray-matter';

export interface Post {
  title: string;
  slug: string;
  author?: string;
  email?: string;
  date?: string | Date;
  cover?: string;
  content?: string;
}

const contentPath = resolve(dirname(fileURLToPath(import.meta.url)), '../../content/');

export function fetchPosts(): Post[] {
  return fs
    .readdirSync(contentPath, { encoding: 'utf-8', withFileTypes: true })
    .filter((file: Dirent) => file.name.endsWith('.md'))
    .map(
      (file: Dirent): Post => {
        const fileContent = fs.readFileSync(join(contentPath, file.name), 'utf-8');
        const { content, data } = matter(fileContent);

        return {
          title: data?.title ?? '',
          slug: file.name.replace('.md', ''),
          author: data?.author ?? '',
          email: data?.email ?? '',
          date: data?.date ?? '',
          cover: data?.cover ?? '',
          content,
        };
      },
    );
}

export function fetchOnePost(slug: string): Post {
  const file = fs
    .readdirSync(contentPath, { encoding: 'utf-8', withFileTypes: false })
    .find((fileName: string) => fileName === slug);
  if (file && file.length === 1) {
    const fileContent = fs.readFileSync(join(contentPath, `${file}.md`), 'utf-8');
    const { content, data } = matter(fileContent);

    return {
      title: data?.title ?? '',
      slug: file.replace('.md', ''),
      author: data?.author ?? '',
      email: data?.email ?? '',
      date: data?.date ?? '',
      cover: data?.cover ?? '',
      content,
    };
  }
  return {
    title: '',
    slug: '',
  };
}
