import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/past_gigs",
        destination: "/past-gigs",
      },
    ];
  },
};

export default nextConfig;
