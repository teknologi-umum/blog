import Link from 'next/link';

export default function ContentPreview({ contentType, slug, title, description, categories, author, github }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-md shadow-lg">
      <img
        className="h-[10rem] object-cover"
        src="https://images.unsplash.com/photo-1549880181-56a44cf4a9a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
        width="400"
        height="200"
        alt={slug}
      />
      <div className="p-4">
        <div className="flex gap-1 mb-2">
          {categories &&
            categories.map((category: string, idx: number) => (
              <span
                className="px-2 text-xs font-semibold text-gray-700 uppercase bg-gray-200 rounded-sm"
                key={`${idx}-${category}`}
              >
                {category}
              </span>
            ))}
        </div>
        <Link href={`/${contentType}/${slug}`}>
          <a className="text-lg font-bold text-gray-800 capitalize font-display hover:text-blue-600 hover:underline">
            {title}
          </a>
        </Link>
        <p className="mb-2 text-sm leading-relaxed text-gray-500">{description}</p>
        <a className="group" href={`https://github.com/${github}`}>
          <div className="flex items-center justify-start gap-2">
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
