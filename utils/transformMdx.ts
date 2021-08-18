import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Data, Node } from 'unist';
import { serialize } from 'next-mdx-remote/serialize';
import * as shiki from 'shiki';
import visit from 'unist-util-visit';

// TODO(elianiva): this seems hacky, but Node<Data> doesn't have value, lang, or meta.
interface CodeNode extends Node {
  value: string;
  lang: string;
  meta: unknown;
}
const attachHighlighter = (options: { highlighter: shiki.Highlighter }) => async (tree: Node<Data>) => {
  visit(tree, 'code', (node: CodeNode) => {
    node.type = 'html';
    node.value = options.highlighter
      .codeToHtml(node.value, node.lang)
      .replace('<pre class="shiki"', `<pre class="shiki" language="${node.lang}" meta="${node.meta}"`);
  });
};

/**
 * Convert given markdown string to HTMl using remark
 * @param raw - The raw markdown you want to convert into HTML
 * @return String containing HTML
 */
export const transformMdx = async (raw: string): Promise<MDXRemoteSerializeResult<Record<string, unknown>>> => {
  const highlighter = await shiki.getHighlighter({ theme: 'github-dark' });
  const markdown = await serialize(raw, {
    mdxOptions: { remarkPlugins: [[attachHighlighter, { highlighter }]] },
  });

  return markdown;
};
