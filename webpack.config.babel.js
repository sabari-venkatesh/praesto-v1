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
	filename: 'css/index.css',
});

const config = {
	stats: 'errors-only',
	context: path.resolve(__dirname, 'src'),
	//devtool: 'source-map',
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		inline: false,
		index: 'login.html',
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
				test: /\.(s*)css$/,
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
	// resolve: {
	// 	alias: {
	// 		'jquery-ui': 'jquery-ui/ui/widgets',
	// 		'jquery-ui-css': 'jquery-ui/themes/base'
	// 	}
	// },
	plugins: [
		extractStyles,
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			Util: 'exports-loader?Util!bootstrap/js/dist/util',
			Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
			Popper: ['popper.js', 'default'],
			//DataTable: 'exports-loader?DataTable!vanilla-datatables/dist/vanilla-dataTables.min',
			//Highcharts: 'exports-loader?Highcharts!highcharts/js/highcharts'
		}),
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'Login',
			bodyClass: 'page-login',
			filename: 'login.html', //Name of file in ./dist/
			template: 'templates/login.pug', //Name of template in ./src
		}),
		new HtmlWebpackPlugin({
			title: 'Forgot Password',
			bodyClass: 'page-forgot_pwd',
			filename: 'forgot-password.html',
			template: 'templates/forgot-password.pug',
		}),
		new HtmlWebpackPlugin({
			title: 'Reset Password',
			bodyClass: 'page-reset_pwd',
			filename: 'reset-password.html',
			template: 'templates/reset-password.pug',
		}),
		new HtmlWebpackPlugin({
			title: 'Settings',
			bodyClass: 'page-settings',
			filename: 'settings.html',
			template: 'templates/settings.pug',
			showSearchbar: false
		}),
		new HtmlWebpackPlugin({
			title: 'Overview',
			bodyClass: 'page-overview',
			filename: 'overview.html',
			template: 'templates/overview.pug',
			downloadFile: 'overview',
			showSearchbar: false
		}),
		new HtmlWebpackPlugin({
			title: 'Dashboard',
			filename: 'dashboard.html',
			bodyClass: 'page-dashboard',
			template: 'templates/dashboard.pug',
		}),
		new HtmlWebpackPlugin({
			title: 'Users',
			filename: 'users.html',
			bodyClass: 'page-users',
			template: 'templates/users.pug',
		}),
		new HtmlWebpackPlugin({
			title: 'Sales',
			bodyClass: 'page-sales',
			filename: 'sales.html',
			template: 'templates/sales.pug',
			downloadFile: 'sales',
			showSearchbar: true
		}),
		new HtmlWebpackPlugin({
			title: 'Inventory',
			bodyClass: 'page-inventory',
			filename: 'inventory.html',
			template: 'templates/inventory.pug',
			downloadFile: 'inventory',
			showSearchbar: true
		}),
		new HtmlWebpackPlugin({
			title: 'Exceptions',
			bodyClass: 'page-exceptions',
			filename: 'exceptions.html',
			template: 'templates/exceptions.pug',
			downloadFile: 'exceptions',
			showSearchbar: true
		}),
		new HtmlWebpackPlugin({
			title: 'Advertising',
			bodyClass: 'page-advertising',
			filename: 'advertising.html',
			template: 'templates/advertising.pug',
			downloadFile: 'advertising',
			showSearchbar: true
		}),
		new HtmlWebpackPlugin({
			title: 'Product Ranks',
			bodyClass: 'page-product_ranks',
			filename: 'product-ranks.html',
			template: 'templates/product-ranks.pug',
			downloadFile: 'product_rank',
			showSearchbar: true
		}),
		new HtmlWebpackPlugin({
			title: 'Keywords',
			bodyClass: 'page-keywords',
			filename: 'keywords.html',
			template: 'templates/keywords.pug',
			downloadFile: 'keywords',
			showSearchbar: true
		}),
		new HtmlWebpackPlugin({
			title: 'Buy-Box Reports',
			bodyClass: 'page-buy_box_reports',
			filename: 'buy-box-reports.html',
			template: 'templates/buy-box-reports.pug',
			downloadFile: 'buybox',
			showSearchbar: true
		}),
		new HtmlWebpackPlugin({
			title: 'MAP',
			bodyClass: 'page-map',
			filename: 'map.html',
			template: 'templates/map.pug',
			downloadFile: 'map',
			showSearchbar: true
		}),
		new HtmlWebpackPlugin({
			title: 'Reviews',
			bodyClass: 'page-reviews',
			filename: 'reviews.html',
			template: 'templates/reviews.pug',
			downloadFile: 'reviews',
			showSearchbar: true
		}),
		new HtmlWebpackPlugin({
			title: 'Chargebacks',
			bodyClass: 'page-chargebacks',
			filename: 'chargebacks.html',
			template: 'templates/chargebacks.pug',
			downloadFile: 'chargeback',
			showSearchbar: true
		}),
		new HtmlWebpackPlugin({
			title: 'Promotions',
			bodyClass: 'page-promotions',
			filename: 'promotions.html',
			template: 'templates/promotions.pug',
			downloadFile: 'promotions',
			showSearchbar: true
		}),
		new HtmlWebpackPlugin({
			title: 'Forecasting',
			bodyClass: 'page-forecasting',
			filename: 'forecasting.html',
			template: 'templates/forecasting.pug',
			downloadFile: 'forecasting',
			showSearchbar: true
		}),
		new CopyWebpackPlugin([{
			from: './data',
			to: './data'
		}]),
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
