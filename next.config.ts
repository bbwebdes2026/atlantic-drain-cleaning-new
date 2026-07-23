import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Modern formats first; the image pipeline (step 2) also emits AVIF/WebP.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
