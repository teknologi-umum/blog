export interface PostFields extends Author {
  slug: string;
  content: string;
  title: string;
  desc: string;
  date: string;
  categories: string[];
}

export interface Author {
  author: string;
  github: string;
  twitter: string;
  telegram: string;
}
