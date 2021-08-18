import grayMatter from 'gray-matter';
import { markdownToHtml } from './markdownToHtml';

type ContentType = 'blogs' | 'news';

async function fetchContent(type: ContentType, slug: string) {
  const res = await fetch(`https://raw.githubusercontent.com/teknologi-umum/contents/master/${type}/${slug}.md`);

  return await res.text();
}

export async function getContent(type: ContentType, slug: string) {
  const raw = await fetchContent(type, slug);
  const { content, data: meta } = grayMatter(raw);
  const html = await markdownToHtml(content);

  if (meta.date instanceof Date) {
    meta.date = meta.date.toISOString();
  }

  return {
    meta,
    html,
  };
}
