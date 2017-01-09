import R from 'ramda';
import S from 'sanctuary';
import familyMap from './';

// Takes a list of strings, and returns an object where a nullary returner
// function is attached to each key of the same name (rslt.a() //=> 'a')
//    consts :: [String] -> Object
const consts = familyMap(S.I, R.always);

// Takes a list of strings, and returns an object where a equlity tester
// is attached to each key of the same name
//    equalities :: [String] -> Object
const equalities = familyMap(S.I, R.equals);

// Takes a list of strings, and returns an object where a R.lensPath lens
// is attached to each key of the same name
//    lenses :: [String] -> Object
const lenses = familyMap(S.I, S.compose(
  R.lensPath,
  R.of
));

const obj = {
  a: 1,
  b: NaN,
  c: 'wonderful',
};

const keys = ['one', 'two'];

const E = equalities(keys);
const L = lenses(keys);

it('should make a constant map', () => {
  const C = consts(keys);

  expect(C.a('a')).toBe(true);
});
