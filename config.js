config = {
    mongoUrl: process.env.mongourl || "mongodb://10.0.0.100/",
    expressPort: process.env.port || 9001 ,
    url: process.env.url || "https://otf.nannal.com/"
}

module.exports = config
