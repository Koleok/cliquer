module.exports = {
   extends: 'airbnb',
   rules: {
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
