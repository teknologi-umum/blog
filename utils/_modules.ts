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
    let matchCount = 0;

    for (let i = 0; i < value.length; i += 1) {
      if (matchCount > 0) break;
      if (value[i].toLowerCase().includes(lowerCasedKeywords)) matchCount += 1;
    }

    return !!matchCount;
  }

  return value.toLowerCase().includes(lowerCasedKeywords);
};

export const filterPostsByKeywords = (
  posts: Partial<PostFields>[] = [],
  keywords: string = '',
  tags: string[] = [],
) => {
  const lookup = ['author', 'title', 'categories', 'desc', 'github'];
  const postsMatchedKeys = filterPostsByAvailableFields(posts, lookup);

  // filtering based from meta data
  const filteredPosts = postsMatchedKeys.filter((post) => {
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

        return Object.values(isMatched).some((val) => val);
      }

      return filterValues(val, keywords);
    });
  });

  return filteredPosts;
};
