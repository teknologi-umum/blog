import { NextSeo } from 'next-seo';

export default function Home() {
  return (
    <>
      <NextSeo
        title={process.env.NEXT_PUBLIC_SITE_NAME}
        description={process.env.NEXT_PUBLIC_SITE_DESCRIPTION}
        openGraph={{
          title: process.env.NEXT_PUBLIC_SITE_NAME,
          description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
          url: process.env.NEXT_PUBLIC_SERVER_URL,
          site_name: process.env.NEXT_PUBLIC_SITE_NAME,
        }}
      />

      <div className="max-w-screen-lg px-4 mx-auto">
        <h1 className="my-8 text-4xl font-bold text-center">Teknologi Umum</h1>
        <p className="text-lg leading-loose text-gray-700">
          Consectetur veniam repellat placeat iure eveniet nobis Soluta neque ipsam aliquam veritatis reprehenderit!
          Fuga porro ipsam itaque illo libero quas ut fugit Delectus ducimus odio optio aliquid hic. Placeat odit
          eveniet veritatis tempore recusandae In perferendis corrupti inventore eos eum.
        </p>
      </div>
    </>
  );
}
