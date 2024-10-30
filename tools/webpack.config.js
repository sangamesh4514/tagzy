const path = require('path');

module.exports = {
  // Other configurations...
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Ensure TypeScript files are also resolved
  }
};
