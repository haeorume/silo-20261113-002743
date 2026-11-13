import type { NextConfig } from "next";

const basePath = process.env.PAGES_BASE || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
