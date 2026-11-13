import type { NextConfig } from "next";

// Runs as a Node app (needed for the admin API, login and image uploads).
// Deploy on a Node host (e.g. Plesk Node.js): `npm run build` then `npm start`.
const nextConfig: NextConfig = {
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
