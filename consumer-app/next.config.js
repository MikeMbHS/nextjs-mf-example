const path = require('path');
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './')
    }
  },
  webpack(config, options) {

    const {
      isServer,
      webpack
    } = options;

    config.experiments = {
      topLevelAwait: true
    };

    if (isServer) {

      // ignore it on SSR, realistically you probably wont be SSRing Fmodules, without paid support from @ScriptedAlchemy
      Object.assign(config.resolve.alias, {
        // microfrontendreact: false,
        microfrontendnextjs: false
      });

    } else {
      
      config.plugins.push(
        new webpack.container.ModuleFederationPlugin({
          remoteType: "var",
          remotes: {
            // microfrontendreact: "microfrontendreact",
            microfrontendnextjs: "microfrontendnextjs"
          },
          shared: {
            react: {
              singleton: true,
              eager: true,
              requiredVersion: false,
            },
            // we have to share something to ensure share scope is initialized
            "@module-federation/nextjs-mf/lib/noop": {
              eager: false,
            },
          },
        })
      );
    }


    // we attach next internals to share scope at runtime
    config.module.rules.push({
      test: /pages\/_app.[jt]sx?/,
      loader: "@module-federation/nextjs-mf/lib/federation-loader.js",
    });

    return config;
  },
}

module.exports = nextConfig