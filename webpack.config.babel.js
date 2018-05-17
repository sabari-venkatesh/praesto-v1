import webpack from 'webpack';
import path from 'path';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const isProd = process.env.APP_ENV === 'prod';

let extractStyles = new ExtractTextPlugin({
  filename: "css/index.css",
});

//let extractHtml = new ExtractTextPlugin('[name].html');

module.exports = {
  stats: "errors-only",
  context: path.resolve(__dirname, 'src'),
  devtool: (isProd ? 'source-map' : 'eval-source-map'),
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    hotOnly: true,
    port: 8008,
    watchContentBase: true,
  },
  entry: {
    app: './index.js'
  },
  module: {
    rules: [
      // {
      //   test: /\.html$/,
      //   use: [{
      //     loader: 'html-loader',
      //     options: {
      //       minimize: true,
      //       removeComments: false,
      //       collapseWhitespace: false
      //     }
      //   }],
      // },
      {
        test: /\.pug$/,
        exclude: ['/node_modules/'],
        //use: ['html-loader', 'pug-html-loader?pretty=true'] // refer html-loader config above
        use: ['pug-loader?pretty=true']
      },
      {
        test: /\.js$/,
        exclude: ['/node_modules/', './scripts/main.js'],
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          }
        }]
      },
      {
        test: /\.(sass|scss)$/,
        exclude: /node_modules/,
        use: extractStyles.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "postcss-loader",
            options: {
              plugins: function() { // post css plugins, can be exported to postcss.config.js
                return [
                  require('autoprefixer')
                ];
              }
            }
          }, {
            loader: "sass-loader"
          }],
          // use style-loader in development
          fallback: "style-loader",
          publicPath: '../'
        })
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: extractStyles.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
          },
          publicPath: '../'
        }),
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=5000&name=images/[name].[ext]',
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'fonts/[name]/[name].[ext]',
            publicPath: '../',
            limit: 8192
          }
        }]
      }
    ]
  },
  output: {
    filename: 'scripts/[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '' // provide a cdn url if you are hosting your assets there
  },
  plugins: [
    extractStyles,
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.ProvidePlugin({
      Popper: 'popper.js'
    }),
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      {
        from: './scripts/main.js',
        to: './scripts/'
      }
    ]),
    new HtmlWebpackPlugin({
      title: 'Praesto',
      filename: 'login.html', //Name of file in ./dist/
      template: 'templates/login.pug', //Name of template in ./src
    }),
    new HtmlWebpackPlugin({
      title: 'Praesto Dashboard',
      filename: 'dashboard.html',
      template: 'templates/dashboard.pug',
    }),
    new HtmlWebpackPlugin({
      title: 'Praesto Users',
      filename: 'users.html',
      template: 'templates/users.pug',
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:8008/',
    }, {
      reload: true
    })
  ]
}
