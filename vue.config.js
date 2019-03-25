module.exports = {
  baseUrl: '/',

  devServer: {
    host: 'localhost',
    proxy: {
      '/api': {
        // 目标 API 地址
        target: 'http://localhost:30233/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  productionSourceMap: false
}
