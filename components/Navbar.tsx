import Link from 'next/link';
import GithubIcon from '#components/Icons/GithubIcon';
import TelegramIcon from '#components/Icons/TelegramIcon';
import { useRouter } from 'next/router';
import SearchIcon from '@material-ui/icons/Search';

export default function Navbar() {
  const router = useRouter();

  const active = (route: string, isBasePath: boolean): string => {
    if (router.route === '/' && isBasePath) return 'active';

    return router.route === `/${route}` ? 'active' : '';
  };
  return (
    <nav className="fixed min-h-16 top-0 inset-x-0 bg-white/80 backdrop-filter backdrop-blur-lg z-20 font-sans">
      <div className="container flex flex-col md:flex-row justify-between items-center space-y-1 mx-auto py-5 px-8 sm:px-16 md:px-32 lg:px-40 xl:px-56 2xl:px-72 h-full">
        <div className="flex-1 space-x-6">
          {['home', 'blog', 'about'].map((route, idx) => (
            <Link href={`/${route === 'home' ? '' : route}`} key={`${idx}-${route}`}>
              <a
                className={`flex-inline uppercase text-center text-gray-700 hover:text-primary-600 hover:font-bold ${active(
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
        <div className="flex-1 text-right text-lg">
          <div className="flex flex-row items-center justify-end space-x-4">
            <div className="flex-initial opacity-60 hover:text-primary-600/100">
              <Link href="/search">
                <a>
                  <SearchIcon fontSize="medium" />
                </a>
              </Link>
            </div>

            <div className="flex-initial opacity-60 hover:text-primary-600/100">
              <a href="https://github.com/teknologi-umum">
                <GithubIcon width="1.5rem" height="1.5rem" />
              </a>
            </div>
            <div className="flex-initial opacity-60 hover:text-primary-600/100">
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
