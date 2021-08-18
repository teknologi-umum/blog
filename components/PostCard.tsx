import Link from 'next/link';

export default function PostCard({ slug, title, desc, categories, key }) {
  return (
    <div className="flex flex-col shadow-lg rounded-md" key={key}>
      <img
        src="https://images.unsplash.com/photo-1549880181-56a44cf4a9a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
        width="400"
        height="200"
      />
      <div className="p-4">
        <div className="flex gap-1 mb-2">
          {categories.map((category: string) => (
            <div className="text-sm px-4 rounded-full bg-blue-500 text-white">{category}</div>
          ))}
        </div>
        <Link href={`/posts/${slug}`}>
          <a className="text-lg font-bold capitalize font-display">{title}</a>
        </Link>
        <p>{desc}</p>
      </div>
    </div>
  );
}
