import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-20 h-16 backdrop-blur-sm">
      <div className="flex items-center h-full max-w-screen-lg px-4 mx-auto">
        <Link href="/">
          <a className="flex-1 text-lg font-bold">Teknologi Umum</a>
        </Link>
        <div className="flex gap-4">
          <Link href="/" key="home">
            <a className="flex-1 text-lg text-gray-700 capitalize hover:text-blue-600 hover:underline">Home</a>
          </Link>

          <Link href="/explores/blogs" key="blogs">
            <a className="flex-1 text-lg text-gray-700 capitalize hover:text-blue-600 hover:underline">Blogs</a>
          </Link>

          <Link href="/explores/news" key="news">
            <a className="flex-1 text-lg text-gray-700 capitalize hover:text-blue-600 hover:underline">News</a>
          </Link>

          <Link href="/about" key="about">
            <a className="flex-1 text-lg text-gray-700 capitalize hover:text-blue-600 hover:underline">About</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
