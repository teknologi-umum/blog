/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
};

const target = String(process.env.NODE_ENV) === 'production' ? { target: 'serverless' } : undefined;

module.exports = {
  ...config,
  ...target,
};
