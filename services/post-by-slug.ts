import { join } from 'path';
import { readFile } from 'fs/promises';
import matter from 'gray-matter';
import type { PostField, PostFieldName } from '~/types/post';
import { POST_DIR } from './constants';

export async function getPostBySlug<TSelectedField extends PostFieldName>(
  slug: string,
  selectedFields: TSelectedField[],
): Promise<Pick<PostField, TSelectedField>> {
  const fullPath = join(POST_DIR, `${slug}.md`);
  const fileContent = await readFile(fullPath, 'utf-8');
  const { data, content } = matter(fileContent);

  const exposedFields = new Map<TSelectedField, string>();
  for (const field of selectedFields) {
    switch (field) {
      case 'slug':
        exposedFields.set(field, slug);
        break;
      case 'content':
        exposedFields.set(field, content);
        break;
      case 'date':
        exposedFields.set(field, data.date.toISOString());
        break;
      default:
        // turn undefined to null so it can be serialised
        exposedFields.set(field, data[field] ?? null);
    }
  }

  return Object.fromEntries(exposedFields) as Pick<PostField, TSelectedField>;
}
