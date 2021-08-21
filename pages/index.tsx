import siteData from 'data/site';
import { NextSeo } from 'next-seo';

export default function Home() {
  return (
    <>
      <NextSeo
        title={siteData.siteName}
        description={siteData.description}
        openGraph={{
          title: siteData.siteName,
          description: siteData.description,
          url: process.env.NEXT_PUBLIC_SERVER_URL,
          site_name: siteData.siteName,
        }}
      />

      <div className="mx-auto px-4 max-w-screen-lg">
        <h1 className="text-center text-4xl font-bold my-8">Teknologi Umum</h1>
        <p className="text-lg text-gray-700 leading-loose">
          Consectetur veniam repellat placeat iure eveniet nobis Soluta neque ipsam aliquam veritatis reprehenderit!
          Fuga porro ipsam itaque illo libero quas ut fugit Delectus ducimus odio optio aliquid hic. Placeat odit
          eveniet veritatis tempore recusandae In perferendis corrupti inventore eos eum.
        </p>
      </div>
    </>
  );
}
