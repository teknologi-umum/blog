import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed h-16 top-0 left-0 right-0 backdrop-blur-sm z-20">
      <div className="flex items-center px-4 mx-auto max-w-screen-lg h-full">
        <Link href="/">
          <a className="flex-1 font-bold text-lg">Teknologi Umum</a>
        </Link>
        <div className="flex gap-4">
          {['home', 'blog', 'about'].map((route, idx) => (
            <Link href={`/${route === 'home' ? '' : route}`} key={`${idx}-${route}`}>
              <a className="flex-1 text-lg capitalize text-gray-700 hover:text-blue-600 hover:underline">{route}</a>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
