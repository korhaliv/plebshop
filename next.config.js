module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    BUGSNAG_API_KEY: process.env.BUGSNAG_SERVER_API_KEY,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    BUGSNAG_API_KEY: process.env.BUGSNAG_BROWSER_API_KEY,
    GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID,
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};
