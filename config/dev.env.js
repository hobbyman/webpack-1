var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SERVER: "http://alpha.in.dynetics.com/lance_test/pic/api",
  BASE_URL: "http://alpha.in.dynetics.com/lance_test/pic/api"
})
