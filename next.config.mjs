/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: "/portifolio",
  assetPrefix: "/portifolio/"
};

export default nextConfig;
