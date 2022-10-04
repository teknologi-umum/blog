import { Navbar } from '~/components/Navbar';
import { Footer } from '~/components/Footer';
import { BackToTop } from '~/components/BackToTop';

export function Layout({ children }) {
  return (
    <div className="bg-white dark:bg-neutral-900 ">
      <BackToTop />
      <Navbar />
      <div className="container mx-auto pt-10 lg:pt-2 w-full font-sans print:pt-0">
        <main className="flex flex-col pt-16 px-8 sm:px-16 md:px-32 lg:px-40 xl:px-56 2xl:px-72 print:pt-0">
          <div className="flex-1 h-full min-h-screen mt-8 md:mt-0">{children}</div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
