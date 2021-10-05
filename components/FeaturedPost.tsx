import Link from 'next/link';

const FeaturedPost = () => {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 items-center mt-12 md:-mx-12 lg:gap-x-20 gap-y-10 lg:gap-y-0">
      <div className="lg:text-left text-center">
        <p className="text-black font-medium">FEATURED</p>
        <h1 className="sm:text-5xl text-4xl mb-4 mt-2 font-bold text-black">Modern C++ on Arduino</h1>
        <a className="group inline-block" href={`https://github.com/`}>
          <div className="flex space-x-2 items-center justify-start">
            <img
              className="rounded-full shadow-md"
              src={`https://avatars.githubusercontent.com/u/1024025?v=4`}
              width="32"
              height="32"
              alt="author"
            />
            <span className="text-sm text-left text-gray-700 group-hover:text-primary-600">Simon Al Kamina</span>
          </div>
        </a>
        <p className="mt-4 leading-relaxed font-serif text-gray-500">
          Embedded programming is always different with regular high-level programming with humanlike APIs--they tend to
          be closer to the metal, and less easy for humans to read.
        </p>
        <Link href="/blog">
          <a className="bg-primary-900 text-white py-1.5 px-10 inline-block mt-4">READ MORE</a>
        </Link>
      </div>
      <div className="w-5/6 lg:w-full mx-auto lg:mx-0">
        <div className="aspect-w-16 aspect-h-13 w-full">
          <img
            className="w-full object-cover object-center"
            src="https://picsum.photos/500"
            alt="Modern C++ on Arduino"
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
