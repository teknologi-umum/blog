import type { PostField, PostFieldName } from "~/types/post";
import { isMatched } from "~/utils/is-matched";

/**
 * Filter posts based on keyword
 * @param posts Posts to filter
 * @param keywords Keywords to search
 * @param fields The keyword will be applied on each of these fields. By default it tries to filter on all fields
 */
export const filterPostsByKeywords = (posts: PostField[] = [], keywords = "", fields?: PostFieldName[]) => {
    const selectedFields: PostFieldName[] =
        fields !== undefined && fields.length > 1 ? fields : ["author", "title", "desc", "categories", "desc"];

    // filter posts that has the specified field for filtering so we won't encounter undefined value for key K
    const postsWithValidTags = posts.filter((post) => {
        const postFields = Object.keys(post) as PostFieldName[];
        return selectedFields.every((field) => postFields.includes(field));
    });

    // filter based on selected field
    const postsFilteredByTags = postsWithValidTags.filter((post) => {
        for (const field of selectedFields) {
            const value = post[field];

            if (value === null) continue;

            if (isMatched(value, keywords)) {
                return true;
            }
        }
        return false;
    });

    return postsFilteredByTags;
};
