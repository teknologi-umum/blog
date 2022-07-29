import { readdir } from 'fs/promises';
import { POST_DIR } from './constants';

export async function getPostSlugs() {
  const paths = await readdir(POST_DIR);
  return paths.map((path) => path.replace(/\.md$/, ''));
}
