/** @type {import('next').NextConfig} */
const nextConfig = {

  
 
  webpack(config, { isServer }) { 
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));
    if (fileLoaderRule) {
        fileLoaderRule.exclude = /\.svg$/i;
    }
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    });
    return config;
  },

 
  turbopack: {
    rules: {
     
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js', 
      },
    },
    
  },
};

module.exports = nextConfig;