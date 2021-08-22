import Link from 'next/link';
import GithubIcon from '#components/Icons/GithubIcon';
import TelegramIcon from '#components/Icons/TelegramIcon';

export default function Navbar() {
  return (
    <nav className="fixed min-h-16 top-0 left-0 right-0 bg-white backdrop-blur-full backdrop-brightness-90 z-20 font-sans">
      <div className="flex items-center px-4 py-5 mx-auto max-w-screen-lg h-full">
        <div className="flex-1 text-left">
          {['home', 'blog', 'about'].map((route, idx) => (
            <Link href={`/${route === 'home' ? '' : route}`} key={`${idx}-${route}`}>
              <a className="flex-inline pr-8 uppercase text-base text-gray-700 hover:text-primary-600 hover:font-bold">
                {route}
              </a>
            </Link>
          ))}
        </div>
        <div className="flex-1 text-center text-3xl">
          <Link href="/">
            <a className="font-black">Teknologi Umum</a>
          </Link>
        </div>
        <div className="flex-1 text-right text-lg">
          <div className="inline-block pr-4 hover:text-primary-600 opacity-60 hover:opacity-100">
            <a href="https://github.com/teknologi-umum">
              <GithubIcon width="1.5rem" height="1.5rem" />
            </a>
          </div>
          <div className="inline-block hover:text-primary-600 opacity-60 hover:opacity-100">
            <a href="https://t.me/teknologi_umum">
              <TelegramIcon width="1.5rem" height="1.5rem" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
