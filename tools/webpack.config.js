const path = require('path');

module.exports = {
  // Other configurations...
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Ensure TypeScript files are also resolved
  }
};
