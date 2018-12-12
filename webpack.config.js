//1.在不使用webpack.config.js的时候，我们可以通过指令的方式进行编译打包

//2.指令的方式：node_module/.bin/webpack [--entry] 入口文件地址 --output 出口文件地址

/**
3.在配置webpack.config.js之后我们可以通过webpack.json中的scripts定义我们的指令集用于编译打包应用,如果是start,
直接执行npm start就好，如果是其他的指令就需要npm run [自定义的指令名称]
*/

/**
 * 4.如果想让浏览器监听你的代码的修改与变动，并自动刷新显示修改后的结果，需要一个本地开发的服务器，这里提供的是webpack-dev-server
 * 安装指令：npm install --save-dev webpack-dev-server
 * 
 * 简单的参数配置
 * contentBase  //服务启动的根目录文件夹，默认是项目的根目录
 * port         //服务监听的端口，默认是8080的端口
 * inline       //设置为true，当资源文件改变时会自动刷新界面
 * historyApiFallback   //在开发单页应用的时候非常的有用，它依赖与HTML5 history API, 如果为true，所有的转跳都指向index.html
 */

 /**
  * Loaders加载器，用于调用其他脚本或者工具，便于文件格式的处理。
  * 简单配置信息：
  * test: 用以正则匹配文件扩展名的文件，进行加载处理 (必须的)
  * loader: loader的名称 (必须的)
  * include/exclude: 手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）
  * query: 为loader提供额外的设置选项
  */


const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');   //自动根据模板生成index.html页面
const MiniCssExtractPlugin = require("mini-css-extract-plugin");    //css的分离操作
const CleanWebpackPlugin = require("clean-webpack-plugin"); //清除残留的打包文件

module.exports = {
    devtool: 'eval-source-map',  //解决打包后的调试问题，四种方式：source-map、cheap-module-source-map、evel-source-map、cheap-module-evel-source-map
    entry: __dirname + '/app/main.js',  //入口文件，可以看成树的顶端
    output: {   //出口，打包后内容的所在地点
        path: path.resolve(__dirname, 'dist'),    //文件所在的目录
        filename: "bundle-[hash].js"   //打包后的文件是什么,这里我们采用hash合理地进行缓存操作（以免用户的文件在编译后存在缓存，这里使用了hash只缓存最新的编译文件）
    },

    devServer: {    //本地服务配置
        contentBase: 'public',
        port: 8080,
        historyApiFallback: true,
        inline: true,
        hot: true
    },

    optimization: {
        minimize: true
    },

    module: {   //  loader加载器的配置
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ]
                    }
                },
                exclude: /node_module/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './public/dist/css'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true, // 指定启用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),//   添加编译打包后的声明文字
        new htmlWebpackPlugin({ //  自动生成html页面
            template: __dirname + '/app/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),    //添加热加载模块，，它与inline的区别是它只更新变动的模块，inline直接刷新浏览器
        // new webpack.optimize.OccurrenceOrderPlugin(),
        new MiniCssExtractPlugin({  //分离css文件的操作
            filename: "styles.css"
        }),
        new CleanWebpackPlugin('dist/*.*', {
            root: __dirname,
            verbose: true,
            dry: false
        })
    ],
    mode: 'development' //打包的模式，两种选择：production线上环境、development生产环境
}