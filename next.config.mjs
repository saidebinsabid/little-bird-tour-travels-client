/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Whitelist the remote image hosts your app loads from.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  async rewrites() {
    // Frontend calls same-origin /api/* — proxy it to the backend.
    // Backend origin is configurable per environment.
    const apiHost = process.env.BACKEND_URL || "http://localhost:5000";
    return [
      {
        source: "/api/:path*",
        destination: `${apiHost}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
