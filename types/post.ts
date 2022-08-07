export type Author = {
  author: string;
  github: string;
  twitter: string;
  telegram: string;
};

export type PostField = Author & {
  slug: string;
  content: string;
  title: string;
  desc: string;
  date: string;
  cover: string;
  categories: string[];
};

export type PostFieldName = keyof PostField;
