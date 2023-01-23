// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const config = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'src/front', to: 'front' },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: [
          '/node_modules/',
          '/dist/',
          '/__tests__/',
        ],
      },
    ],
  },
  resolve: {
    extensions: [
      '.ts',
      '.js',
    ],
  },
  target: 'node',
};

module.exports = () => {
  return config;
};
