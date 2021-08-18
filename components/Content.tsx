import { MDXRemote } from 'next-mdx-remote';
import { NextSeo } from 'next-seo';
import AuthorCard from './AuthorCard';

export default function Content({ meta: { title, description, date, author, twitter, github }, html }) {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title: title,
          description: description,
          url: process.env.NEXT_PUBLIC_SERVER_URL,
          site_name: process.env.NEXT_PUBLIC_SITE_NAME,
        }}
      />
      <header className="w-full px-4 pt-32 pb-20 mb-8 -mt-16 text-center bg-gray-100 md:text-left">
        <div className="max-w-screen-lg mx-auto">
          <h1 className="mb-2 text-4xl font-bold text-gray-800 capitalize font-heading">{title}</h1>
          <p className="mb-4 text-xl leading-loose text-gray-600">{description}</p>
          <p className="mb-12 text-sm text-gray-600">Posted in {new Date(date).toLocaleDateString('en-GB')}</p>
          <AuthorCard author={author} github={github} twitter={twitter} />
        </div>
      </header>
      <div className="max-w-screen-md px-4 mx-auto prose xl:prose-lg">
        <MDXRemote {...html} />
      </div>
    </>
  );
}
