import { type ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import siteData from "~/data/site";
import { useDebounce } from "~/hooks/use-debounce";
import type { PostField, PostFieldName } from "~/types/post";
import { PostCard } from "~/components/PostCard";
import { filterPostsByKeywords, getAllPosts } from "~/services";
import clsx from "clsx";
import { isMobile, isStandalone } from "~/utils/helpers";

type SearchProps = {
    posts: PostField[];
};

export default function Search({ posts }: SearchProps) {
    const router = useRouter();
    const filter = useMemo<PostFieldName[]>(() => ["author", "title", "categories", "desc"], []);
    const [filteredPosts, setFilteredPosts] = useState<PostField[]>(posts);
    const [keywords, setKeywords] = useState("");
    const [selectedFields, setSelectedTags] = useState<PostFieldName[]>([]);

    const inputRef = useRef<HTMLInputElement>(null);
    const initialEffectsRun = useRef(false);

    const debouncedKeywords = useDebounce<typeof keywords>(keywords);

    const isNotEmpty = (str: string) => str.replace(/\s/g, "").length > 0;

    const hasHoverEvent = !isMobile() && !isStandalone();

    useEffect(() => {
        if (!router.isReady) return;
        if ("q" in router.query && inputRef.current !== null) {
            const q = router.query.q as string;
            setKeywords(q);
            inputRef.current.value = q;
            setFilteredPosts(() => filterPostsByKeywords(posts, q));
        }
    }, [router.isReady]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (!initialEffectsRun.current) {
            //  on page load, let all useEffects run first to avoid flickering
            setTimeout(() => (initialEffectsRun.current = true), 0);
            return;
        }

        if (isNotEmpty(debouncedKeywords)) {
            router.replace({ query: { q: debouncedKeywords } });
            setFilteredPosts(() => filterPostsByKeywords(posts, debouncedKeywords, selectedFields));
            return;
        }

        router.replace({});
        setFilteredPosts(posts);
    }, [debouncedKeywords, selectedFields]); // eslint-disable-line react-hooks/exhaustive-deps

    const activeClassFor = (field: PostFieldName): string => {
        if (selectedFields.includes(field)) return "text-white bg-black dark:text-black dark:bg-white hover:bg-black";
        if (hasHoverEvent) return "hover:bg-black/60 hover:text-white dark:hover:bg-neutral-600";
        return "";
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target;
        setKeywords(value);
    };

    const toggleSelectedField = (fieldName: PostFieldName) => {
        // check if items already exists in selectedFields
        // if so, remove it
        if (selectedFields.includes(fieldName)) {
            setSelectedTags((prev) => prev.filter((v) => v !== fieldName));
            return;
        }

        setSelectedTags((prev) => [...prev, fieldName]);
    };

    return (
        <>
            <NextSeo
                title={"Search - " + siteData.siteName}
                description={siteData.description}
                openGraph={{
                    type: "website",
                    title: "Search - " + siteData.siteName,
                    description: siteData.description,
                    url: process.env.NEXT_PUBLIC_SERVER_URL,
                    site_name: siteData.siteName,
                }}
            />
            <div className="my-8">
                <input
                    ref={inputRef}
                    className="w-full h-12 leading-tight border-0 border-b border-gray-400 focus:border-gray-600 dark:bg-transparent dark:text-white text-2xl focus:outline-none"
                    type="text"
                    placeholder="Dukun Teknologi Umum"
                    onChange={handleChange}
                />

                <div className="mt-4 flex flex-wrap gap-3">
                    {filter.map((tag, idx) => (
                        <div
                            key={idx}
                            className={clsx(
                                "border border-black dark:border-white dark:text-neutral-100 cursor-pointer px-2 py-1 transition duration-300",
                                activeClassFor(tag),
                            )}
                            onClick={() => toggleSelectedField(tag)}
                        >
                            <span className="text-base capitalize select-none">{tag}</span>
                        </div>
                    ))}
                </div>
            </div>

            {filteredPosts.length > 0 && (
                <div className="posts grid lg:grid-cols-3 gap-4">
                    {filteredPosts.map((post: PostField, idx: number) => (
                        <PostCard {...post} key={idx} />
                    ))}
                </div>
            )}
        </>
    );
}

export const getStaticProps = async () => {
    const posts = await getAllPosts(["title", "slug", "cover", "desc", "date", "categories", "author", "github"]);
    return {
        props: {
            posts,
        },
    };
};
