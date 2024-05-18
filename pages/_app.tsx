import "@fontsource/rubik/400.css";
import "@fontsource/rubik/700.css";
import "@fontsource/rubik/800.css";
import "@fontsource/lusitana/400.css";
import "@fontsource/lusitana/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/700.css";
import "tailwindcss/tailwind.css";
import { Layout } from "~/components/Layout";
import "../styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
    return (
        <Layout>
            <Head>
                <script
                    async
                    src="https://analytics.teknologiumum.com/script.js"
                    data-website-id="86735db8-4270-486a-8db9-b79b91aa9470"
                ></script>
            </Head>
            <Component {...pageProps} />
        </Layout>
    );
}
