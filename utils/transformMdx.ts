import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Data, Node } from 'unist';
import { serialize } from 'next-mdx-remote/serialize';
import * as shiki from 'shiki';
import visit from 'unist-util-visit';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkGFM from 'remark-gfm';

// TODO(elianiva): this seems hacky, but Node<Data> doesn't have value, lang, or meta.
interface CodeNode extends Node {
  value: string;
  lang: string;
  meta: string;
}

interface LineOption {
  line: number;
  classes?: string[];
}

const highlightLine = (highlightRange: string) => {
  const lineOptions: LineOption[] = [];

  for (const line of highlightRange.split(',')) {
    let range = line.split('-').map(Number);

    if (range.length > 1) {
      const begin = range[0],
        end = range[1];
      range = Array.from({ length: end - begin + 1 }, (_, i) => i + begin);
    }

    range.forEach((n) => {
      lineOptions.push({ line: n, classes: ['line-highlight'] });
    });
  }

  return lineOptions;
};

const attachHighlighter = (options: { highlighter: shiki.Highlighter }) => async (tree: Node<Data>) => {
  visit(tree, 'code', (node: CodeNode) => {
    const preClassName = ['shiki'];
    const lineOptions: LineOption[] = [];
    let withHighlightLine = false;

    if (node.meta) {
      const params = node.meta.split(' ');

      if (params.includes('no-line-numbers')) {
        preClassName.push('shiki-no-line-numbers');
      }

      const highlightRange = node.meta.match(/{([^]*)}/)?.[1];
      if (highlightRange) {
        withHighlightLine = true;
        lineOptions.push(...highlightLine(highlightRange));
        preClassName.push('shiki-line-highlights');
      }
    }

    node.type = 'html';

    node.value = options.highlighter
      .codeToHtml(node.value, { lang: node.lang, lineOptions: lineOptions })
      .replace(
        '<pre class="shiki"',
        `<pre class="${preClassName.join(' ')}" language="${node.lang}" meta="${node.meta}"`,
      );

    if (withHighlightLine) {
      node.value = node.value.replaceAll(`<span class="line"></span>`, '<span class="line"><br/></span>');
    }
  });
};

/**
 * Convert given markdown string to HTMl using remark
 * @param raw - The raw markdown you want to convert into HTML
 * @return String containing HTML
 */
export const transformMdx = async (raw: string): Promise<MDXRemoteSerializeResult<Record<string, unknown>>> => {
  const highlighter = await shiki.getHighlighter({ theme: 'github-dark-dimmed' });
  const markdown = await serialize(raw, {
    mdxOptions: {
      remarkPlugins: [[attachHighlighter, { highlighter }], remarkGFM, remarkMath],
      rehypePlugins: [rehypeKatex],
    },
  });

  return markdown;
};
