import Link from 'next/link';

export default function PostCard({ slug, title, desc, categories, author, github }) {
  return (
    <div className="flex flex-col shadow-lg rounded-md overflow-hidden">
      <img
        className="h-[10rem] object-cover"
        src="https://images.unsplash.com/photo-1549880181-56a44cf4a9a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
        width="400"
        height="200"
        alt={slug}
      />
      <div className="p-4">
        <div className="flex gap-1 mb-2">
          {categories.map((category: string, idx: number) => (
            <span
              className="text-xs px-2 rounded-sm bg-gray-200 text-gray-700 uppercase font-semibold"
              key={`${idx}-${category}`}
            >
              {category}
            </span>
          ))}
        </div>
        <Link href={`/posts/${slug}`}>
          <a className="text-lg font-bold capitalize font-display text-gray-800 hover:text-blue-600 hover:underline">
            {title}
          </a>
        </Link>
        <p className="text-sm leading-relaxed text-gray-500 mb-2">{desc}</p>
        <a className="group" href={`https://github.com/${github}`}>
          <div className="flex gap-2 items-center justify-start">
            <img
              className="rounded-full shadow-md"
              src={`https://github.com/${github}.png`}
              width="32"
              height="32"
              alt="author"
            />
            <span className="text-sm text-left text-gray-700 group-hover:text-blue-600 group-hover:underline">
              {author}
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}
