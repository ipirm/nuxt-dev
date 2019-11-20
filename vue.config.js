// const PreloadWebpackPlugin = require('preload-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    runtimeCompiler: true,
    devServer: {
        // setting host should not be necessary
         host: 'villa.ua',
        // public: 'villa-ua.loc',
         port:443,
         https: true,
         // disableHostCheck: true,
    },
    // configureWebpack: {
    //     plugins: [
    //         new HtmlWebpackPlugin(),
    //         new PreloadWebpackPlugin({
    //             rel: 'preload',
    //             as(entry) {
    //               if (/\.woff$/.test(entry)) return 'font';
    //               return 'script';
    //             }
    //         })
    //     ]
    // }
}
