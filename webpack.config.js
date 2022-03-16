const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env = {}) => {
  const { mode = process.env.NODE_ENV || 'development' } = env;

  const isProd = mode === 'production';

  const getPlugins = () => [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash:8].css',
    }),
  ];

  return {
    mode,
    entry: {
      index: './src/index.jsx',
    },
    target: ['web', 'es6'],
    output: {
      path: path.join(__dirname, 'build'),
      publicPath: '/',
      filename: '[name]-[contenthash].js',
    },
    module: {
      rules: [
        // Loading JS
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
              engine: path.resolve(__dirname, 'src/modules/Engine/engine'),
            },
          },
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [
                ['@babel/plugin-transform-react-jsx',
                  { pragma: 'createElement', pragmaFrag: "'fragment'" }],
              ],
            },
          },
        },
        {
          test: /\.(css)$/,
          use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
        },
        // Loading SCSS/SASS
        {
          test: /\.s[ac]ss$/i,
          use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
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
          use: [{
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              name: '[name]-[sha1:hash:7].[ext]',
            },
          }],
        },
        // Loading fonts
        {
          test: /\.(ttf|otf|eot|woff2)$/,
          use: [{
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
              name: '[name].[ext]',
            },
          }],
        },
      ],
    },
    plugins: getPlugins(),
    devServer: {
      // the historyAPIFallback allows react-router to work
      historyApiFallback: true,
      proxy: {
        // when a requst to /api is done, we want to apply a proxy
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
      },
    },
  };
};
