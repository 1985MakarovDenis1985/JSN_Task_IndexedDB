const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {                        //// вход
        app: "./src/index.js",
        // app: "./src/main.js"
    },
    output:{                        //// выход
        filename: 'app.js',
        path: path.resolve(__dirname, './dist'),  // resolve - соединяет полный путь (--dirname) с папкой в которой будет файл
        // publicPath: '/',
        // publicPath: '/dist/'         //// что бы не добавлять этот путь в картиках нужно отключить и вкл в dev ser contentBase: path.join(__dirname, "dist")
    },
    module: {
        rules:[{
            test: /\.js$/,              //// берем все js и с помощью     $ - символизирует конец строки
            loader: "babel-loader",     //// него конвертирует для всех браузеров
            exclude: "/node-modules/"   //// исключает
        }, {
            test: /\.(png|jpg|gif|svg|jpeg)$/,
            use: [
                {
                    loader: "file-loader",
                    options: {
                        outputPath: 'img',
                        name: '[name].[ext]',
                        useRelativePath: true
                    }
                },{
                    loader: "image-webpack-loader",
                    options: {
                        mozjpeg:{
                            quality: 70,
                            progressive: true
                        },
                        optipng:{
                            optimizationLevel: 2
                        }
                    }
                }
            ]
        }, {
            test: /\.(eot|svg|ttf|woff|otf|woff2)$/,
            loader: 'file-loader',
            options: {
                outputPath:'fonts',
                name:'[name].[ext]'
            }
        }, {
            test: /\.scss$/,
            use: [
                "style-loader",
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {sourceMap: true}
                },
                {
                    loader: "postcss-loader",
                    options: {sourceMap: true, config:{ path: 'src/postcss.config.js'}}

                },
                {
                    loader: "sass-loader",
                    options: {sourceMap: true}
                },
            ]
        }]
    },
    devServer:{
        overlay: true,                                 //// выводит ошибки в черном окне
        contentBase: path.join(__dirname, "src/"),     //// в какой папке читать html
        compress: true,
        host: '0.0.0.0',
        useLocalIp: true,
        port: 3030, //// порт
        historyApiFallback: true /// для правильной работы роутера в React
    },
    plugins: [                      //// регестрируем плагины => смотр. на оф сфйтах
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
    ],
};
