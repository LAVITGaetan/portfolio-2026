import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Collaborator avatars, derived from their GitHub username.
    remotePatterns: [{ protocol: "https", hostname: "avatars.githubusercontent.com" }],
  },
};

export default nextConfig;
