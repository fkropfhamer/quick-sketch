const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// use to exclude all node_modules from bundle
const nodeModules = {};
fs.readdirSync('node_modules')
  .filter((x) => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

module.exports = [
  {
    entry: './src/client/js/main.tsx',
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader'],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'client', 'index.html'),
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'],
    },
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'public'),
    },
  },
  {
    entry: './src/server/index.ts',
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },
    plugins: [new CleanWebpackPlugin()],
    resolve: {
      extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'],
    },
    target: 'node',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
    },
    externals: nodeModules,
  },
];
