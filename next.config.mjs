/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Important: Enables static HTML export

  // REQUIRED FOR GITHUB PROJECT PAGES (like adrian-dean.github.io/beta/)
  // Set basePath to your repository name
  basePath: '/beta', // Your repository name
  assetPrefix: '/beta/', // Your repository name with a trailing slash

  images: {
    unoptimized: true, // Required for static export with next/image
  },
};

export default nextConfig;
