import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import remarkMath from "remark-math";
import remarkUnwrapImages from "remark-unwrap-images";

const codeHighlightOption = {
    theme: "github-dark",
} satisfies Partial<Options>;

/**
 * Convert given markdown string to HTMl using remark
 * @param content - The raw markdown you want to convert into HTML
 * @return String containing HTML
 */
export const transformMdx = async (content: string): Promise<MDXRemoteSerializeResult<Record<string, unknown>>> => {
    const markdown = await serialize(content, {
        mdxOptions: {
            remarkPlugins: [remarkUnwrapImages, remarkMath],
            rehypePlugins: [[rehypePrettyCode, codeHighlightOption], rehypeKatex],
        },
    });

    return markdown;
};
