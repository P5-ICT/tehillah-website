import type { NextConfig } from "next";

// Where the Node.js API lives. The website forwards every /api/... request there,
// so the browser only ever talks to one address and nothing needs CORS.
const API_URL = process.env.API_URL ?? "http://localhost:4000";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${API_URL}/api/:path*` }];
  },
};

export default nextConfig;
