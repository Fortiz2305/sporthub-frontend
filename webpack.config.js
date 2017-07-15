const path = require('path');

module.exports = {
  // entry file for the bundle
  entry: path.join(__dirname, '/src/app.jsx'),

  // bundle file we will get as result
  output: {
    path: path.join(__dirname, '/dist/js'),
    filename: 'app.js',
  },

  module: {
    // apply loaders to files that meet given conditions
    loaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, '/src'),
      loader: 'babel',
      query: {
        presets: ["react", "es2015"]
      }
    }],
  },

};
