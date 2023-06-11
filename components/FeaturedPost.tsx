import Link from "next/link";

export function FeaturedPost({ post }) {
    return (
        <div className="grid lg:grid-cols-2 grid-cols-1 items-center mt-12 md:-mx-12 lg:gap-x-20 gap-y-10 lg:gap-y-0">
            <div className="lg:text-left text-center">
                <p className="text-black dark:text-neutral-100 font-medium">FEATURED</p>
                <Link href={`/posts/${post.slug}`}>
                    <a>
                        <h1 className="sm:text-5xl text-3xl mb-4 mt-2 font-bold text-black dark:text-neutral-100">
                            {post.title}
                        </h1>
                    </a>
                </Link>
                <a className="group inline-block" href={`https://github.com/${post.github}`}>
                    <div className="flex space-x-2 items-center justify-start">
                        <img
                            className="rounded-full shadow-md"
                            src={`https://github.com/${post.github}.png`}
                            width="32"
                            height="32"
                            alt={post.github}
                        />
                        <span className="text-sm text-left text-gray-700 group-hover:text-primary-600 dark:text-neutral-100 dark:group-hover:text-primary-200">
                            {post.author}
                        </span>
                    </div>
                </a>
                <p className="mt-4 leading-relaxed font-serif text-gray-500 dark:text-gray-100">{post.desc}</p>
                <Link href={`/posts/${post.slug}`}>
                    <a className="bg-primary-900 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-300 inline-block text-white dark:hover:text-black mt-4 py-1.5 px-10 transition duration-300 print:hidden">
                        READ MORE
                    </a>
                </Link>
            </div>
            <div className="w-5/6 lg:w-full mx-auto lg:mx-0">
                <div className="aspect-w-16 aspect-h-13 w-full">
                    <img
                        className="w-full object-cover object-center"
                        src={post.cover || "/image/sample.jpg"}
                        alt={post.title}
                    />
                </div>
            </div>
        </div>
    );
}
