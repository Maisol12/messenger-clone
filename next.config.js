/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    swcPlugins: [["next-superjson-plugin", {}]]
  },
  images: {
    domains: [
      'res.cloudinary.com', 
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com'
    ]
  }
}
webpack: (config) => {
  let modularizeImports = null;
  config.module.rules.some((rule) =>
    rule.oneOf?.some((oneOf) => {
      modularizeImports =
        oneOf?.use?.options?.nextConfig?.modularizeImports;
      return modularizeImports;
    }),
  );
  if (modularizeImports?.["@headlessui/react"])
    delete modularizeImports["@headlessui/react"];
  return config;
},

module.exports = nextConfig
