import siteData from 'data/site';
import { NextSeo } from 'next-seo';

export default function Home() {
  return (
    <>
      <NextSeo
        title={siteData.siteName}
        description={siteData.description}
        openGraph={{
          type: 'website',
          title: siteData.siteName,
          description: siteData.description,
          url: process.env.NEXT_PUBLIC_SERVER_URL,
          site_name: siteData.siteName,
        }}
      />
      <h1 className="text-2xl uppercase font-bold py-8">Teknologi Umum</h1>
      <p className="font-serif text-lg text-gray-700">
        Consectetur veniam repellat placeat iure eveniet nobis Soluta neque ipsam aliquam veritatis reprehenderit!
        Fuga porro ipsam itaque illo libero quas ut fugit Delectus ducimus odio optio aliquid hic. Placeat odit
        eveniet veritatis tempore recusandae In perferendis corrupti inventore eos eum.
      </p>
    </>
  );
}
