import Link from 'next/link';
import GithubIcon from '#components/Icons/GithubIcon';
import TelegramIcon from '#components/Icons/TelegramIcon';

export default function Navbar() {
  return (
    <nav className="fixed min-h-16 top-0 left-0 right-0 bg-white backdrop-blur-full backdrop-brightness-90 z-20 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-center py-5 container mx-auto px-8 sm:px-16 md:px-32 lg:px-40 xl:px-56 2xl:px-72 h-full">
        <div className="flex-1">
          {['home', 'blog', 'about'].map((route, idx) => (
            <Link href={`/${route === 'home' ? '' : route}`} key={`${idx}-${route}`}>
              <a className="flex-inline pr-8 uppercase text-center md:text-left text-base text-gray-700 hover:text-primary-600 hover:font-bold">
                {route}
              </a>
            </Link>
          ))}
        </div>
        <div className="flex-2 lg:flex-1 text-center text-3xl">
          <Link href="/">
            <a className="font-black">Teknologi Umum</a>
          </Link>
        </div>
        <div className="flex-1 text-right text-lg">
          <div className="flex flex-row items-center justify-end">
            <div className="flex-initial pr-4 hover:text-primary-600 opacity-60 hover:opacity-100">
              <a href="https://github.com/teknologi-umum">
                <GithubIcon width="1.5rem" height="1.5rem" />
              </a>
            </div>
            <div className="flex-initial hover:text-primary-600 opacity-60 hover:opacity-100">
              <a href="https://t.me/teknologi_umum">
                <TelegramIcon width="2rem" height="2rem" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
