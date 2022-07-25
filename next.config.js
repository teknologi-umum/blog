/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        'next-swc-loader',
        {
          loader: '@svgr/webpack',
          options: { babel: false },
        },
      ],
    });
    config.resolve.fallback = {
      fs: false,
      path: false,
    };

    return config;
  },
};
