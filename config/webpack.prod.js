const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ClosureCompilerPlugin = require('closure-webpack-plugin');

const { merge } = require('webpack-merge')

const paths = require('./paths')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    path: paths.build,
    publicPath: '/',
    filename: 'js/[name].[contenthash].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
              modules: true,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    // Extracts CSS into separate files
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
    //   new ClosureCompilerPlugin({
    //     mode: 'STANDARD', // a little misleading -- the actual compilation level is below
    //     childCompilations: true
    //   }, {
    //     languageOut: 'ECMASCRIPT5',
    //     compilation_level: 'ADVANCED'
    // })
    ],
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      minSize: 0
      // chunks: 'all',
      // maxInitialRequests: Infinity,
      // minSize: 0,
      // minChunks: 1,
      // maxAsyncRequests: 6,
      // automaticNameDelimiter: '~',
      // cacheGroups: {
      //   commons: {
      //     test: /[\\/]node_modules[\\/]/,
      //     // cacheGroupKey here is `commons` as the key of the cacheGroup
      //     name(module, chunks, cacheGroupKey) {
      //       const moduleFileName = module
      //         .identifier()
      //         .split('/')
      //         .reduceRight((item) => item);
      //       const allChunksNames = chunks.map((item) => item.name).join('~');
      //       return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
      //     },
      //     chunks: 'all',
      //   },
      // },
    },
    // splitChunks: {
    //   chunks: 'all',
    //   maxInitialRequests: Infinity,
    //   minSize: 0,
    //   minChunks: 1,
    //   maxAsyncRequests: 6,
    //   automaticNameDelimiter: '~',
    //   cacheGroups: {
    //     vendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       reuseExistingChunk: true,
    //       name(module, chunks, cacheGroupKey) {
    //         const moduleFileName = module.identifier().split('/').reduceRight(item => item).replace('@', '');
    //         const allChunksNames = chunks.map((item) => item.name).join('~');
    //         return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
    //       },
    //       name(module) {
    //         // get the name. E.g. node_modules/packageName/not/this/part.js
    //         // or node_modules/packageName
    //         const packageName = module.context.match(
    //           /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
    //         )[1]
    //         // npm package names are URL-safe, but some servers don't like @ symbols
    //         return `${packageName.replace('@', '')}`
    //       },
    //     },
    //     // Split code common to all chunks to its own chunk
    //     commons: {
    //       name: 'commons', // The name of the chunk containing all common code
    //       chunks: 'initial',
    //       minChunks: 2, // This is the number of modules
    //     },
    //   },
    // },
    usedExports: true,
    concatenateModules: true,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  stats: {
    errorDetails: true
  }
})
