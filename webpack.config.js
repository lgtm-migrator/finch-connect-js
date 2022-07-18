const path = require('path');
const webpack = require('webpack');
const packageJson = require('./package.json');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    globalObject: 'this',
    library: {
      name: 'FinchConnect',
      type: 'umd',
      export: 'default'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      SDK_VERSION: JSON.stringify(packageJson.version),
    }),
  ],
};