import R from 'ramda';
import S from 'sanctuary';
import { clique } from './';

const keys = ['one', 'two'];


/**
 * Takes a list of strings, and returns an object where a nullary returner
 * function is attached to each key of the same name  (rslt.a() //=> 'a')
 *
 * consts :: [String] -> Object
 */
const consts = clique(S.I, R.always);

it('should make a constant map', () => {
  const C = consts(keys);
  expect(R.keys(C)).toEqual(keys);
  expect(R.values(C).map(x => x())).toEqual(keys);
});

/**
 * Takes a list of strings, and returns an object where a equlity tester is
 * attached to each key of the same name
 *
 * equalities :: [String] -> Object
 */
const equalities = clique(S.I, R.equals);

it('should make an equality map', () => {
  const E = equalities(keys);
  expect(R.mapObjIndexed(R.call, E)).toEqual({ one: true, two: true });
});

/**
 * Takes a list of strings, and returns an object where a R.lensPath lens is
 * attached to each key of the same name
 *
 * lenses :: [String] -> Object
 */
const lenses = clique(S.I, S.compose(
  R.lensPath,
  R.of
));

it('should make a lens map', () => {
  const L = lenses(keys);
  const obj = { one: { two: 'here I am' } };
  const two = 'I win';
  const lens = R.compose(L.one, L.two);
  expect(R.view(lens, obj)).toBe(obj.one.two);
  expect(R.set(lens, two, obj)).toEqual({ one: { two } });
});
