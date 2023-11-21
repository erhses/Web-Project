const currentTask = process.env.npm_lifecycle_event;
const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const { chunk } = require("lodash");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fse = require("fs-extra");

const postcssPlugins = [
    require("postcss-import"), 
    require("postcss-mixins"),
    require("postcss-simple-vars"), 
    require("postcss-nested"), 
    require("autoprefixer"),
    require("postcss-hexrgba")
];

class RunAfterCompile {
    apply(compiler) {
        compiler.hooks.done.tap("Copy images", function() {
            fse.copySync("./docs/assets/images", "./app/assets/images");
        });
    }
}

let pages = fse.readdirSync("./docs")
.filter(function(file) {
    return file.endsWith(".html");
    }).map(function(page) {
        return new HtmlWebpackPlugin({
            filename: page, 
            template: `./docs/${page}`
        });
    });

let cssConfig = {
    test: /\.css$/i,
    use: [
        "css-loader", 
        {loader: "postcss-loader", 
        options: {postcssOptions: {plugins: postcssPlugins}}}],
};

let config = {
    entry: "./docs/assets/scripts/App.js",
    plugins: pages,
    module: {
        rules: [
            cssConfig,
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    }
}

if(currentTask == 'dev'){
    cssConfig.use.unshift("style-loader");
        config.output = {
            filename: "bundled.js",
            path: path.resolve(__dirname, 'docs')
    },
    config.devServer = {
        watchFiles: ('./docs/**/*.html'),
        static: {
            directory: path.join(__dirname, "./docs")
          },
        hot: true,
        host: '0.0.0.0',
        port: 3500
    },
    config.mode = "development"
}

if(currentTask == "build"){

    cssConfig.use.unshift(MiniCssExtractPlugin.loader);
    postcssPlugins.push(require("cssnano"));
    (config.output = {
        filename: "[name].[chunkhash].js",
        chunkFilename: "[name].[chunkhash].js",
        path: path.resolve(__dirname, "app")
    }),
    (config.mode = "production");
    config.optimization = {
        splitChunks: {chunks: "all" }
    },
    config.plugins.push(
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({filename: "styles.[chunkhash].css"}),
        new RunAfterCompile()
        )
}

module.exports = config;