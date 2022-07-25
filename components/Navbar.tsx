import Link from 'next/link';
import { useRouter } from 'next/router';
import { GithubIcon, TelegramIcon, SearchIcon } from '~/icons';

export function Navbar() {
  const router = useRouter();

  const getActiveClass = (route: string, isBasePath: boolean): string => {
    if ((router.route === '/' && isBasePath) || router.route === `/${route}`) {
      return 'active';
    }
    return '';
  };

  return (
    <nav className="fixed min-h-16 top-0 inset-x-0 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg z-20 font-sans print:static">
      <div className="container flex flex-col md:flex-row justify-between items-center space-y-1 mx-auto py-5 px-8 sm:px-16 md:px-32 lg:px-40 xl:px-56 2xl:px-72 h-full">
        <div className="flex-1 space-x-6 print:hidden">
          {['home', 'blog', 'about'].map((route, idx) => (
            <Link href={`/${route === 'home' ? '' : route}`} key={`${idx}-${route}`}>
              <a
                className={`flex-inline uppercase text-center hover:text-primary-600 transition duration-300 ${getActiveClass(
                  route,
                  route === 'home',
                )}`}
              >
                {route}
              </a>
            </Link>
          ))}
        </div>
        <div className="flex-2 lg:flex-1 text-center text-3xl mb-2 lg:mb-0">
          <Link href="/">
            <a className="font-black">Teknologi Umum</a>
          </Link>
        </div>
        <div className="flex-1 text-right text-lg print:hidden">
          <div className="flex flex-row items-center justify-end space-x-4">
            <div className="flex-initial opacity-60 hover:text-primary-600/100 transition duration-300">
              <Link href="/search">
                <a>
                  <SearchIcon width="1.5rem" height="1.5rem" />
                </a>
              </Link>
            </div>

            <div className="flex-initial opacity-60 hover:text-primary-600/100 transition duration-300">
              <a href="https://github.com/teknologi-umum">
                <GithubIcon width="1.5rem" height="1.5rem" />
              </a>
            </div>
            <div className="flex-initial opacity-60 hover:text-primary-600/100 transition duration-300">
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
