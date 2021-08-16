import type { RequestHandler } from '@sveltejs/kit';
import type { Post } from '$lib/posts';
import { fetchOnePost, fetchPosts } from '$lib/posts';

export const get: RequestHandler = async ({ query }) => {
  let result: Post | Post[];

  if (query.get('slug')) {
    result = fetchOnePost(query.get('slug'));
  } else {
    result = fetchPosts();
  }

  if (result) {
    return {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
      body: result,
    };
  }
  return {
    status: 500,
    body: 'something wrong',
  };
};
