/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const withBundleStats = require('next-plugin-bundle-stats');

const prod = process.env.NODE_ENV === 'production';

module.exports = withPlugins(
  [
    withPWA,
    withBundleStats,
    {
      outDir: '../artifacts',
    },
  ],
  {
    pwa: {
      disable: prod ? false : true,
      dest: 'public',
    },
    webpack: (config, { dev, isServer }) => {
      // Replace React with PReact only in client production build
      if (!dev && !isServer) {
        Object.assign(config.resolve.alias, {
          react: 'preact/compat',
          'react-dom/test-utils': 'preact/test-utils',
          'react-dom': 'preact/compat',
        });
      }

      return config;
    },
  }
);
