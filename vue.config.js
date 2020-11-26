const path = require('path')
console.log('-------runing---vue---config')

module.exports = {
  runtimeCompiler: true,
  css: {
    requireModuleExtension: true
  },
  devServer: {
    disableHostCheck: true
  },
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      extensions: ['.js', '.vue', '.json']
    }
  },
  // chainWebpack: config => {
  //   config.module
  //     .rule('vue')
  //     .use('vue-loader')
  //     .loader('vue-loader')
  //     .tap(options => {
  //       // modify the options...
  //       return {
  //         ...options,
  //         title: 'Website Name'
  //       }
  //     })

  //   config.module
  //     .rule('images')
  //     .test(/\.(png|jpe?g|gif|ico)(\?.*)?$/)
  //     .use('url-loader')
  //     .loader('url-loader')
  //     .tap(options => ({ ...options, ...{ limit: 8192 } }))
  // },
  // assetsDir: '/assets'
}
