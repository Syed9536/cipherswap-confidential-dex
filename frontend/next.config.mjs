/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // FORCE WEBPACK MODE — this kills turbopack
  webpack: (config) => {
    config.experiments = {
      ...(config.experiments || {}),
      asyncWebAssembly: true, // required for fhevmjs
    };
    return config;
  },

  // This disables Turbopack requirement
  turbopack: {}
};

export default nextConfig;
