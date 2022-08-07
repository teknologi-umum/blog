import pLimit from 'p-limit';
import { PostFieldName } from '~/types/post';
import { getPostSlugs } from './post-slugs';
import { getPostBySlug } from './post-by-slug';

/**
 * Get all posts but only expose selected fields. Date will always be exposed for sorting.
 * @param fields Exposed fields
 * @returns Posts with exposed fields
 */
export async function getAllPosts<TSelectedField extends PostFieldName>(fields: TSelectedField[]) {
  const selectedFields: PostFieldName[] = ['date', ...fields];
  const limit = pLimit(10);
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map((path) => limit(getPostBySlug, path, selectedFields)));

  // sort posts by date in descending order
  return posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}
