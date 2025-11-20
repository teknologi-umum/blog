import { GetServerSideProps } from "next";
import { getAllPosts } from "~/services";
import siteData from "~/data/site";

function generateRssItem(post: {
    title: string;
    desc: string;
    slug: string;
    date: string;
    author: string;
    categories: string[];
}): string {
    const postUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${post.slug}`;
    return `
    <item>
      <guid>${postUrl}</guid>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <description><![CDATA[${post.desc}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author><![CDATA[${post.author}]]></author>
      ${post.categories.map((category) => `<category>${category}</category>`).join("\n      ")}
    </item>`;
}

function generateRss(
    posts: Array<{
        title: string;
        desc: string;
        slug: string;
        date: string;
        author: string;
        categories: string[];
    }>,
): string {
    const itemsXml = posts.map(generateRssItem).join("\n");
    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteData.siteName}</title>
    <link>${process.env.NEXT_PUBLIC_SERVER_URL}</link>
    <description>${siteData.description}</description>
    <language>id</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${process.env.NEXT_PUBLIC_SERVER_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const posts = await getAllPosts(["title", "slug", "desc", "date", "author", "categories"]);
    const rss = generateRss(posts);

    res.setHeader("Content-Type", "text/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=1800");
    res.write(rss);
    res.end();

    return {
        props: {},
    };
};

// Default export to prevent Next.js errors
export default function Feed() {
    return null;
}
