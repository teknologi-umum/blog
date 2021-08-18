import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen pt-16">
        <div className="flex-1">{children}</div>
        <footer>foo bar</footer>
      </main>
    </>
  );
}
