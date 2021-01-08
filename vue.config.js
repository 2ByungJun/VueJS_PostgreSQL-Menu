module.exports = {
  devServer: {
    host: 'localhost',
    port: 8000, 
    https: false,
    hotOnly: true,
    proxy: {
      '/': {
        target: 'http://localhost:8080/',
        ws: false,
        changeOrigin: true
      }
    }
  }
}