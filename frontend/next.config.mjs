/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://backend:8000/api/:path*"
            : "http://backend:8000/api/:path*",
      },
      {
        source: "/openapi.json",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://backend:8000/openapi.json"
            : "http://backend:8000/openapi.json",
      },
      {
        source: "/docs",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://backend:8000/docs"
            : "http://backend:8000/docs",
      },
    ];
  },
};

export default nextConfig;
