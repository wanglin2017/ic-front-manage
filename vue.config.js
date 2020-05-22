const path = require('path')
const resolve = function (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    host: '127.0.0.1',
    port: '63342',
    hot: true,
    open: true,
    overlay: {
      warning: false,
      error: true
    }
  }
}