import { PostField } from "~/types/post";

// this function will return all categories available such ['javascript', 'tutorial'] from all posts dynamically
// but based from my reference which is medium, they're using
// something like 'people', 'story', 'tags', etc.
// so rather than returning all categories available
// I'm using constant string[] from a couple of available meta from each post
// so this function quite unused
export function getPostCategories(posts: Pick<PostField, "categories">[]) {
    const categories = new Set<string>(posts.map((post) => post.categories).flat());
    return [...categories];
}
