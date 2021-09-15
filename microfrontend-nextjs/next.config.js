// next.config.js
const {
  withFederatedSidecar
} = require("@module-federation/nextjs-mf");

module.exports = withFederatedSidecar({
  name: "microfrontendnextjs",
  filename: "static/chunks/remoteEntry.js",
  exposes: {
    "./Farewell": "./components/Farewell",
  },
  shared: {
    react: {
      // Notice shared are NOT eager here.
      requiredVersion: false,
      singleton: true,
    },
  },
})({
  webpack(config, options) {

    const {
      webpack,
      isServer
    } = options;

    config.experiments = {
      topLevelAwait: true
    };

    config.output.publicPath = "auto";


    if (!isServer) {
      config.output.publicPath = "auto";
      config.plugins.push(
        new webpack.container.ModuleFederationPlugin({
          shared: {
            react: {
              singleton: true,
              eager: true,
              requiredVersion: false,
            },
            "@module-federation/nextjs-mf/lib/noop": {
              eager: false,
            },
          },
        })
      );
    }

    // we attach next internals to share scope at runtime
    config.module.rules.push({
      test: /pages\/_app.tsx?/,
      loader: "@module-federation/nextjs-mf/lib/federation-loader.js",
    });

    return config;
  }
});