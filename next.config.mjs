/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Important: Enables static HTML export

  // Optional: If you deploy to a subpath (e.g., yourusername.github.io/my-portfolio/)
  // Uncomment and adjust these if your GitHub Pages URL includes a repository name
  // For a user/organization page (yourusername.github.io), these are usually NOT needed.
  // basePath: '/my-portfolio-site',
  // assetPrefix: '/my-portfolio-site/',

  images: {
    unoptimized: true, // Required for static export with next/image
  },
};

export default nextConfig;
