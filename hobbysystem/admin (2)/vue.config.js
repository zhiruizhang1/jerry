const url = 'http://localhost:8000'
module.exports = {
	runtimeCompiler: true,
  lintOnSave: false,//禁用eslint检查
  devServer: {
    disableHostCheck: true,
    port: 8080,
    proxy: {
      '/': {
        target: url,
        pathRewrite: {
          '^/': '/'
        }
      }
    },
  }
      
}