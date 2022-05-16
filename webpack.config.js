// eslint-disable-next-line no-undef
const path = require('path');
// eslint-disable-next-line no-undef
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line no-undef
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const CopyPlugin = require('copy-webpack-plugin');

class EmitDeclarationOnly {
  apply(compiler) {
    compiler.hooks.shouldEmit.tap('EmitDeclarationOnly', (compilation) =>
      this.handleHook(compiler, compilation),
    );
  }

  handleHook(compiler, compilation) {
    compilation.errors = compilation.errors.filter(
      (error) => !error.toString().includes('TypeScript emitted no output for'),
    );
  }
}

// eslint-disable-next-line no-undef
module.exports = (env = {}) => {
  // eslint-disable-next-line no-undef
  const { mode = process.env.NODE_ENV || 'development' } = env;

  const isProd = mode === 'production';

  const getPlugins = () => [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/assets/favicon.png'
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash:8].css',
    }),
    new CopyPlugin({
      patterns: [{ from: path.resolve(__dirname, 'src/sw.js') }],
    }),
  ];

  return {
    mode,
    entry: {
      index: './src/index.tsx',
    },
    target: ['web', 'es6'],
    output: {
      // eslint-disable-next-line no-undef
      path: path.join(__dirname, 'build'),
      publicPath: '/',
      filename: '[name]-[contenthash].js',
    },
    module: {
      rules: [
        // Loading TS
        {
          test: /\.(ts|tsx)$/,
          exclude: /(node_modules)/,
          resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
          },
          use: [
            // { loader: 'ts-loader' },
            { loader: 'babel-loader' },
          ],
        },
        {
          test: /\.(css)$/,
          use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
        },
        // Loading SCSS/SASS
        {
          test: /\.s[ac]ss$/i,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
          // use: [
          // // Creates `style` nodes from JS strings
          //   'style-loader',
          //   // Translates CSS into CommonJS
          //   'css-loader',
          //   // Compiles Sass to CSS
          //   'sass-loader',
          // ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images',
                name: '[name]-[sha1:hash:7].[ext]',
              },
            },
          ],
        },
        // Loading fonts
        {
          test: /\.(ttf|otf|eot|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'fonts',
                name: '[name].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins: getPlugins(),
    devServer: {
      historyApiFallback: true,
      proxy: {
        '/api': {
          changeOrigin: true,
          cookieDomainRewrite: 'localhost',
          target: 'http://localhost',
          onProxyReq: (proxyReq) => {
            if (proxyReq.getHeader('origin')) {
              proxyReq.setHeader('origin', 'http://localhost');
            }
          },
        },
        '/assets': {
          changeOrigin: true,
          cookieDomainRewrite: 'localhost',
          target: 'http://localhost',
          onProxyReq: (proxyReq) => {
            if (proxyReq.getHeader('origin')) {
              proxyReq.setHeader('origin', 'http://localhost');
            }
          },
        },
      },
    },
  };
};
