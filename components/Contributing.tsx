import GithubIcon from '#components/Icons/GithubIcon';

export interface Contributor {
  id: number;
  login: string;
  contribution: number;
  html_url: string;
  avatar_url: string;
}

const Contributing = ({ contributors }: { contributors: Contributor[] }) => {
  return (
    <>
      <div className="md:-mx-12 mt-24 bg-primary-900 py-12 md:px-14 px-2 md:px-16 grid gap-12 grid-cols-1 md:grid-cols-2">
        <div>
          <h1 className="text-white md:text-4xl font-bold text-2xl">Feeling like contributing?</h1>
          <p className="mt-6 mb-4 text-white md:text-lg text-sm">
            Blog writers, code contributors, proofreaders... anything you could do is always welcome!
          </p>
          <a
            href="https://github.com/teknologi-umum/blog"
            className="text-black bg-white md:p-1.5 md:px-6  inline-flex md:items-center font-bold whitespace-wrap sm:p-1 sm:px-1  px-1"
          >
            <GithubIcon width="25px" height="25px" />
            <span className="ml-2 md:text-left">BROWSE THE REPOSITORY</span>
          </a>
        </div>
        <div className="flex flex-wrap -mb-4 -mr-4">
          {contributors.map((contributor) => (
            <a href={contributor.html_url} key={contributor.id} className="mr-4 mb-4 inline-block">
              <img
                src={contributor.avatar_url}
                className="md:w-10 w-6 h-auto rounded-full mx-auto"
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
};

export default Contributing;
