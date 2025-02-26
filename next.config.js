/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Deshabilitar ESLint durante la construcción
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Deshabilitar TypeScript durante la construcción
    ignoreBuildErrors: true,
  },
  // Otras configuraciones
  reactStrictMode: true,
};

module.exports = nextConfig; 