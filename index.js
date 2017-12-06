/* eslint-disable */
var curry = require('lodash.curry')
var assign = require('object-assign')

var clique = curry(function clique(namer, maker, xs) {
  return xs.reduce(function(result, x) {
    var pair = {}
    pair[namer(x)] = maker(x)
    return assign({}, result, pair)
  }, {})
})

var simpleClique =
  clique(function(x) { return x })

module.exports = {
  clique: clique,
  simpleClique: simpleClique,
}
