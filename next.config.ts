import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // This creates the 'out' folder for GitHub Pages
  images: {
    unoptimized: true, // Required for static export to show your dog photos
  },
  // If your GitHub repo is NOT named [yourusername].github.io (e.g., it's /ranger)
  // uncomment the line below and replace 'ranger' with your repo name:
  // basePath: '/ranger', 
};

export default nextConfig;