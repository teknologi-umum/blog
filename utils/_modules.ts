import type { PostFields } from '#types/post';

export const filterPostsByAvailableFields = (posts: Partial<PostFields>[], lookup: string[]): Partial<PostFields>[] => {
  return posts.map((curr) => {
    return Object.entries(curr).reduce((acc, [key, val]) => {
      if (lookup.includes(key)) {
        return { ...acc, [key]: val };
      }
      return acc;
    }, {});
  });
};

const filterValues = (value: string | string[], keywords: string): boolean => {
  const lowerCasedKeywords = keywords.toLowerCase();

  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i += 1) {
      if (value[i].toLowerCase().includes(lowerCasedKeywords)) {
        return true;
      }
    }

    return false;
  }

  return value.toLowerCase().includes(lowerCasedKeywords);
};

export const filterPostsByKeywords = (
  posts: Partial<PostFields>[] = [],
  keywords: string = '',
  tags: string[] = [],
) => {
  const lookup = ['author', 'title', 'categories', 'desc', 'cover'];
  const lookupCacheIndex: number[] = [];
  const postsMatchedKeys = filterPostsByAvailableFields(posts, lookup);

  // filtering based from meta data
  let filteredPosts = postsMatchedKeys.filter((post, idx) => {
    return Object.entries(post).some(([key, val]) => {
      if (tags.length) {
        // create object of matches tags
        let isMatched = tags.reduce((acc, val) => {
          return { ...acc, [val]: false };
        }, {});

        for (let i = 0; i < tags.length; i += 1) {
          if (key === tags[i]) {
            isMatched[tags[i]] = filterValues(val, keywords);
          }
        }

        const result = Object.values(isMatched).some((val) => val);

        if (result) lookupCacheIndex.push(idx);

        return result;
      }

      const result = filterValues(val, keywords);

      if (result) lookupCacheIndex.push(idx);

      return result;
    });
  });

  // reassign filtered posts with old values after lookup process
  for (let i = 0; i < filteredPosts.length; i += 1) {
    filteredPosts[i] = { ...posts[lookupCacheIndex[i]], ...filteredPosts[i] };
  }

  return filteredPosts;
};
