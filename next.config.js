/** @type {import("next").NextConfig} */
module.exports = {
    reactStrictMode: true,
    swcMinify: true,

    webpack(config) {
        const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });
        fileLoaderRule.exclude = /\.svg$/i;
        return config;
    },
};
