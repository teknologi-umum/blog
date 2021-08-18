import grayMatter from 'gray-matter';
import { transformMdx } from '#utils/transformMdx';
import { Octokit } from '@octokit/rest';
import { request } from 'undici';

const octokit = new Octokit();

type ContentType = 'blogs' | 'news';

async function fetchContent(type: ContentType, slug: string) {
  if (!slug.endsWith('.md')) {
    slug = `${slug}.md`;
  }

  const res = await request(`https://raw.githubusercontent.com/teknologi-umum/contents/master/${type}/${slug}`);

  return await res.body.text();
}

export async function getContent(type: ContentType, slug: string) {
  const raw = await fetchContent(type, slug);
  const { content, data: meta } = grayMatter(raw);
  const html = await transformMdx(content);

  meta.slug = slug;

  if (meta.date instanceof Date) {
    meta.date = meta.date.toISOString();
  }

  return {
    meta,
    html,
  };
}

export async function getListContentSlug(type: ContentType) {
  const {
    data: { tree },
  } = await octokit.git.getTree({
    owner: 'teknologi-umum',
    repo: 'contents',
    tree_sha: 'master',
    recursive: '1',
  });

  return tree.filter((v) => v.path !== type && v.path?.startsWith(type)).map((v) => v.path?.substring(type.length + 1));
}

export async function getListContent(type: ContentType) {
  const listContentSlug = await getListContentSlug(type);

  const listContent = await Promise.all(listContentSlug.map((slug) => getContent(type, slug as string)));

  // TODO: Add sorting
  return listContent;
}
