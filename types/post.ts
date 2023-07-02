export type Author = {
    author: string;
    github: string;
    twitter: string | null;
    telegram: string | null;
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
