import siteData from "data/site";
import { NextSeo } from "next-seo";
import { getAllPosts, getPostCategories } from "~/services";
import { FeaturedPost } from "~/components/FeaturedPost";
import { BrowseTopic } from "~/components/BrowseTopic";
import { ReadAnyway } from "~/components/ReadAnyway";
import { Contributing } from "~/components/Contributing";
import { PostField } from "~/types/post";
import { Contributor } from "~/types/contributor";

type HomeProps = {
    categories: string[];
    posts: PostField[];
    contributors: Contributor[];
};

export default function Home(props: HomeProps) {
    return (
        <>
            <NextSeo
                title={siteData.siteName}
                description={siteData.description}
                openGraph={{
                    type: "website",
                    title: siteData.siteName,
                    description: siteData.description,
                    url: process.env.NEXT_PUBLIC_SERVER_URL,
                    site_name: siteData.siteName,
                }}
            />
            <FeaturedPost post={props.posts[0]} />
            <BrowseTopic categories={props.categories} />
            <ReadAnyway posts={props.posts} />
            <Contributing contributors={props.contributors} />
        </>
    );
}

export const getStaticProps = async () => {
    const posts = await getAllPosts(["title", "slug", "desc", "date", "categories", "author", "github", "cover"]);
    const categories = getPostCategories(posts);
    const res = await fetch("https://api.github.com/repos/teknologi-umum/blog/contributors");
    const contributors = (await res.json()) as Contributor[];

    return {
        props: {
            categories,
            posts: posts.slice(0, 6),
            contributors,
        },
    };
};
