interface Author {
  /** Display name for the blog */
  name: string;

  /** Github username */
  github: string;

  /** Twitter username */
  twitter: string;
}

export const authors: Record<string, Author> = {
  manusia_bernapas: {
    name: 'Dicha.. siapa hayo',
    github: 'elianiva',
    twitter: 'elianiva_',
  },
};
