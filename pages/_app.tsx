import '@fontsource/sarabun/400.css';
import '@fontsource/sarabun/700.css';
import '@fontsource/sarabun/800.css';
import '@fontsource/lusitana/400.css';
import '@fontsource/lusitana/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/700.css';
import 'tailwindcss/tailwind.css';
import Layout from '#components/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
