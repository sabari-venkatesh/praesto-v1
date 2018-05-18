import webpack from 'webpack';
import path from 'path';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const isProd = process.env.APP_ENV === 'prod';

let extractStyles = new ExtractTextPlugin({
  filename: 'css/index.css',
});

const config = {
  stats: 'errors-only',
  context: path.resolve(__dirname, 'src'),
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    inline: false,
    index: 'sales.html',
    open: false,
    port: 8008,
    watchContentBase: true
  },
  entry: {
    //vendor: ['jquery', 'popper.js', 'util', 'vanilla-datatables'],
    app: './scripts/main.js',
  },
  module: {
    rules: [{
        test: /\.pug$/,
        exclude: ['/node_modules/'],
        use: ['pug-loader?pretty=true']
      },
      {
        test: /\.js$/,
        exclude: ['/node_modules/'],
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
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: function() { // post css plugins, can be exported to postcss.config.js
                return [
                  require('autoprefixer')
                ];
              }
            }
          }, {
            loader: 'sass-loader'
          }],
          // use style-loader in development
          fallback: 'style-loader',
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
      jQuery: 'jquery',
      Util: 'exports-loader?Util!bootstrap/js/dist/util',
      Popper: ['popper.js', 'default'],
      DataTable: 'exports-loader?DataTable!vanilla-datatables/dist/vanilla-dataTables.min',
      HighCharts: 'exports-loader?HighCharts!highcharts/js/highcharts'
    }),
    new CleanWebpackPlugin(['dist']),
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
    new HtmlWebpackPlugin({
      title: 'Praesto Sales',
      filename: 'sales.html',
      template: 'templates/sales.pug',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'scripts/commons.js',
      minChunks: function(module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.includes("node_modules");
      }
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      //port: 3000,
      proxy: 'http://localhost:8008/',
    }, {
      reload: true
    })
  ]
}

module.exports = config;
