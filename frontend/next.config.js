/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.vue$/,
      loader: "vue-loader",
    });
    return config;
  },
  // Configuración para Vercel
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  // Configuración de imágenes para Vercel
  images: {
    domains: ["localhost", "vercel.app"],
  },
  // Configuración de headers para seguridad
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
  // Configuración de redirecciones para Vercel
  async redirects() {
    return [
      // Redirecciones personalizadas aquí si las necesitas
    ];
  },
};

module.exports = nextConfig;
