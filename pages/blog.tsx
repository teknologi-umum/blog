import { NextSeo } from "next-seo";
import siteData from "data/site";
import { getAllPosts } from "~/services";
import { PostCard } from "~/components/PostCard";
import { PageTitle } from "~/components/PageTitle";
import type { PostField } from "~/types/post";

type BlogProps = {
    posts: PostField[];
};

export default function Blog(props: BlogProps) {
    return (
        <>
            <NextSeo
                title={"Blog - " + siteData.siteName}
                description={siteData.description}
                openGraph={{
                    type: "website",
                    title: "Blog - " + siteData.siteName,
                    description: siteData.description,
                    url: process.env.NEXT_PUBLIC_SERVER_URL,
                    site_name: siteData.siteName,
                }}
            />
            <style jsx>{`
                @media print {
                    .posts {
                        grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
                    }
                }
            `}</style>
            <PageTitle>Blog Posts</PageTitle>
            <div className="posts grid lg:grid-cols-3 gap-4">
                {props.posts.map((post: PostField) => (
                    <PostCard {...post} key={post.title} />
                ))}
            </div>
        </>
    );
}

export const getStaticProps = async () => {
    const posts = await getAllPosts(["title", "slug", "desc", "date", "categories", "cover", "author", "github"]);

    return {
        props: {
            posts,
        },
    };
};
