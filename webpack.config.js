const path = require('path');
const webpack =require('webpack');
const HtmlWebpackPlugin =require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OpenBrowser =require("open-browser-webpack-plugin");

module.exports = {
    entry: './src/js/app.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        //打包后html就会从localhost:8088/dist开始引用文件，如果不配置的话使用webpack-dev-server打开会从localhost:8088/css那层目录开始，只从js那层路径中开始引用文件
        publicPath:'/dist/',
        filename: 'js/app.jsx'
        
       
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env','react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader","sass-loader"]
                })
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            //文件大于8K才单独成一个文件
                            limit: 8192,
                            name:'resource/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name:'resource/[name].[ext]'
                        }
                      
                    }
                ]
            }
        ]
    },

    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        //这里会找到main.css这个样式文件进行分离
        new ExtractTextPlugin("css/[name].css"),
        //将文件分离
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            //提取出公共代码的路径 和源文件名字不能一致
            filename:'js/[name].jsx'
        }),
        new OpenBrowser({url:"http://localhost:8088/dist/index.html"})      
    ],
    devServer: {
        //防止被别软件例如apache端口冲突 这里设置端口
        port:8088
    }
}