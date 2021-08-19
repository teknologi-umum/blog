// import withShiki from '@stefanprobst/remark-shiki';
import fromMarkdown from 'remark-parse';
import toHAST from 'remark-rehype';
import toHTML from 'rehype-stringify';
import withHtmlInMarkdown from 'rehype-raw';
import { unified } from 'unified';
// import * as shiki from 'shiki';
import withPrism from '@mapbox/rehype-prism';

const createProcessor = async () => {
  // const highlighter = await shiki.getHighlighter({ theme: 'github-dark' });

  return (
    unified()
      .use(fromMarkdown)
      // @ts-ignore
      // .use(withShiki, { highlighter })
      .use(withPrism)
      .use(toHAST, { allowDangerousHtml: true })
      .use(withHtmlInMarkdown)
      .use(toHTML)
  );
};

/**
 * Convert given markdown string to HTMl using remark
 * @param markdown - The markdown you want to convert
 * @return String containing HTML
 */
export const markdownToHtml = async (markdown: string): Promise<string> => {
  const processor = await createProcessor();
  const vfile = await processor.process(markdown);
  return vfile.toString();
};
