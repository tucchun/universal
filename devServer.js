const express = require('express')

const webpack = require('webpack')
const webpacMiddleware = require('webpack-dev-server')

const config = require('./webpack.config')
const app = express()

const compiler = webpack(config)
const watching = compiler.watch({
  aggregateTimeout: 300,
}, (err, stats) =>  {
  // 
  console.log(stats)
})

watching.close(() => {
  console.log('webpack close')
})
app.use(
  webpacMiddleware(compiler, {
    // webpack-dev-middleware options
  })
);


// app.use(new webpacMiddleware(compiler))
app.listen(3000)
