# cliquer

Creates a group of related functions from a naming function and an array of some primitive value.

# What does it do again? Why Am I here?

This was originally inspired by a utility in [drboolean's lenses](https://github.com/DrBoolean/lenses) library called [`makeLenses`](https://github.com/DrBoolean/lenses/blob/master/src/lenses.js#L70) which takes an array of strings and returns an object of named lenses:

```javascript
const { lensProp } = require('ramda')
const { makeLenses, view } = require('lenses')

const obj = {
  foe: { name: 'marley' },
  friend: { name: 'me' },
}

// makeLenses allows a DRY-er approach like
const L = makeLenses(['friend', 'name'])

// instead of
const friend = lensProp('friend')
const name = lensProp('name')

const friendName = compose(L.friend, L.name)
view(friendName, obj) // => 'me'
```

This got me thinking about how many things in javascript would benefit from a similar shortcut. So a simple curried factory function that took two functions, one to generate the key name, and one to define the function, quickly became a useful pattern for creating utility groups.

```javascript
const R = require('ramda')

const keys = ['beer', 'me']

// Pass an identity function so each key is named literally
const simpleClique = clique(x => x)

// Simple equality checks
const eqs = simpleClique(R.equals)
const E = eqs(keys)

E.beer('beer') //=> true
E.me('beer') //=> false


// Constant generators
const consts = simpleClique(R.always)
const C = consts(keys)

C.beer() //=> 'beer'


// Regex group
const firstChars = simpleClique(x => new RegExp(`^${x}`))
const F = firstChars(['a', 'b'])

R.test(F.a, 'abc') //=> true
R.test(F.b, 'abc') //=> false


/* Even more complex things! */

// Pass a function that names each key by appending `bird`
const fetchClique = clique(x => x.concat('bird'))

const url =
  'https://isthisbirdathing.com/api/birds'

const birdFetchers =
  fetchClique(x => fetch(`${url}/${x}`).then(x => x.json()) )

const B = birdFetchers(['blue', 'shoe', 'fackle'])

B.facklebird()
  .then(console.log) //=> { isAThing: 'um.. no' }

B.bluebird()
  .then(console.log) //=> { isAThing: 'of course idiot' }
```

Get the picture? If not submit a PR to help me explain this better or to add more imaginative/hilarious examples 💖

## What are you waiting for? Start some cliques 🍻
