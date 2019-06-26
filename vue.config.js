module.exports = {
  publicPath: '/',
  devServer: {
    disableHostCheck: true,
    host: 'localhost',
    proxy: {
      '/api': {
        // 目标 API 地址
        target: 'https://coin.zhenly.cn/test/',
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
