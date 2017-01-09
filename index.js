/* eslint-disable */
const curry = require('lodash.curry')
const assign = require('object-assign')

module.exports = curry(function clique(namer, maker, xs) {
  return xs.reduce(function(result, x) {
    result[namer(x)] = maker(x), {}
  }))
})
