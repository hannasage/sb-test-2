const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(
        proxy("/forecast", {
            target: "https://api.darksky.net",
            changeOrigin: true
        })
    )
}