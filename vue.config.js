module.exports = {
  devServer: {
    host: 'localhost',
    port: 8000, 
    https: false,
    hotOnly: true,
    proxy: {
      '/vue': {
        target: 'http://localhost:8080',
        ws: false,
        changeOrigin: true
      }
    }
  }
}