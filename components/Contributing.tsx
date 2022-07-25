import { GithubIcon } from '~/icons';

export type Contributor = {
  id: number;
  login: string;
  contribution: number;
  html_url: string;
  avatar_url: string;
};

type ContributingProps = {
  contributors: Contributor[];
};

export function Contributing(props: ContributingProps) {
  return (
    <>
      <div className="md:-mx-12 mt-24 bg-primary-900 py-12 px-12 md:px-16 grid gap-12 grid-cols-1 md:grid-cols-2 items-start print:py-3">
        <div>
          <h1 className="text-white text-3xl md:text-4xl font-bold print:text-black">Feeling like contributing?</h1>
          <p className="mt-6 mb-4 text-white text-md md:text-lg print:text-black">
            Blog writers, code contributors, proofreaders... anything you could do is always welcome!
          </p>
          <a
            href="https://github.com/teknologi-umum/blog"
            className="text-black bg-white p-1.5 px-2 w-full sm:w-auto md:px-4 lg:px-6 inline-flex items-center justify-center font-bold whitespace-nowrap"
          >
            <div className="flex items-center justify-center print:pr-2">
              <GithubIcon className="w-5 h-5" />
            </div>
            <span className="ml-2 text-sm lg:text-base print:hidden">BROWSE THE REPOSITORY</span>
            <span className="hidden print:block">https://github.com/teknologi-umum/blog</span>
          </a>
        </div>
        <div className="flex flex-wrap justify-start -mb-4 -mr-4">
          {props.contributors.map((contributor) => (
            <a href={contributor.html_url} key={contributor.id} className="mr-4 mb-4 inline-block">
              <img
                src={contributor.avatar_url}
                className="w-10 h-auto rounded-full mx-auto"
                loading="lazy"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                alt={contributor.login}
              />
            </a>
          ))}
          <a
            href="https://github.com/teknologi-umum/blog"
            className="bg-gray-300 mr-4 mb-4 rounded-full hover:scale-110 w-10 h-10 inline-flex items-center justify-center text-sm font-semibold"
          >
            You?
          </a>
        </div>
      </div>
    </>
  );
}
