const dotenv = require('dotenv')
// Importing webpack dependencies
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PrettierPlugin = require('prettier-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const { ProvidePlugin, DefinePlugin } = require("webpack");

const paths = require('./paths')

/**
 * Parses environment variables into a format acceptable by the webpack DefinePlugin
 * @param {object} configs Object literal containing configuration variables to
 * parse before sending them to react
 */
const parseConfigs = (configs) =>
  Object.keys(configs || {}).reduce(
    (acc, val) => ({ ...acc, [val]: JSON.stringify(configs[val]) }),
    {},
  )

// fetch system environment variables
const systemVariables = parseConfigs(process.env)

// fetch environment variables from the dotenv file
const { parsed: dotenvConfigs } = dotenv.config()

// process the environment variables from the dotenv file
const processedDotenvConfigs = parseConfigs(dotenvConfigs)

module.exports = {
  // Where webpack looks to start building the bundle
  entry: [`${paths.src}/index.tsx`],
  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
    clean: true
  },
  // Customize the webpack build process
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin({
      dry: true,
      verbose: true,
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: true,
    }),
    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'public',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      title: 'almond',
      favicon: `${paths.public}/favicon.ico`,
      template: `${paths.public}/template.html`, // template file
      filename: 'index.html', // output file
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    // ESLint configuration
    new ESLintPlugin({
      files: ['.', 'src', 'config'],
      formatter: 'table',
    }),
    // Prettier configuration
    new PrettierPlugin(),
    // Provider plugin for node
    new ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
      // _stream_duplex: 'readable-stream/duplex',
    }),
    // Load environment variables
    new DefinePlugin({
      'process.env': { ...processedDotenvConfigs, ...systemVariables },
    })
  ],
  // Determine how modules within the project are treated
  module: {
    rules: [
      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },
      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
      // typescript
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: paths.src,
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
        },
      },
      // javascript
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@views': `${paths.src}/views/`,
      '@components': `${paths.src}/components/`,
      '@modules': `${paths.src}/store/modules`,
      '@utils': `${paths.src}/utils`,
      '@context': `${paths.src}/context`,
      '@hooks': `${paths.src}/hooks`,
    },
  },
}
