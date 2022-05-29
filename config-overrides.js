const { paths } = require('react-app-rewired')
const path = require('path')

module.exports = {
  webpack: function (config) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          stores: path.resolve(__dirname, `${paths.appSrc}/stores`),
          components: path.resolve(__dirname, `${paths.appSrc}/components`),
          hooks: path.resolve(__dirname, `${paths.appSrc}/hooks`),
          views: path.resolve(__dirname, `${paths.appSrc}/views`),
          utils: path.resolve(__dirname, `${paths.appSrc}/utils`),
          styles: path.resolve(__dirname, `${paths.appSrc}/styles`),
          pages: path.resolve(__dirname, `${paths.appSrc}/pages`),
          icons: path.resolve(__dirname, `${paths.appSrc}/icons`),
          enums: path.resolve(__dirname, `${paths.appSrc}/enums`),
          constants: path.resolve(__dirname, `${paths.appSrc}/constants`),
        },
      },
      output: {
        ...config.output,
        filename: 'static/js/[name].[hash:8].js',
        chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
      },
      optimization: {
        ...config.optimization,
        runtimeChunk: 'single',
      },
    }
  },
}
