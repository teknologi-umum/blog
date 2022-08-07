export function Footer() {
  return (
    <footer className="mt-12 px-4 py-10 text-center border-t-2 border-gray-200 font-serif bg-white print:hidden">
      <p className="text-base pb-2">&copy; {new Date().getFullYear()} Teknologi Umum</p>
      <p className="text-xs">
        Blog posts are licensed under{' '}
        <a
          href="https://github.com/teknologi-umum/blog/blob/master/LICENSE.CC-BY-SA-4.0"
          className="text-primary-600 hover:underline"
        >
          Creative Commons Attribution Share Alike 4.0 International
        </a>
        .
      </p>
      <p className="text-xs">
        Source code are licensed under{' '}
        <a
          href="https://github.com/teknologi-umum/blog/blob/master/LICENSE.GPL-3.0"
          className="text-primary-600 hover:underline"
        >
          GNU General Public License v3.0
        </a>
        .
      </p>
    </footer>
  );
}
