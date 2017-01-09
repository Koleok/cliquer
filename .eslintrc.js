module.exports = {
   extends: 'airbnb',
   rules: {
     'import/no-extraneous-dependencies': 0,
     'comma-dangle': ['error', 'always-multiline'],
     'keyword-spacing': ['error'],
   },
   env: {
     jest: true,
     node: true,
   },
   parserOptions: {
     ecmaFeatures: {
       experimentalObjectRestSpread: true,
     },
   },
 }
