module.exports = {
  extends: [
    'airbnb',
    'plugin:flowtype/recommended',
    'prettier',
    'prettier/flowtype',
    'prettier/react',
  ],
  parser: 'babel-eslint',
  plugins: ['flowtype'],
  // Some rules can be too strict. Feel free to relax them. Explain.
  rules: {
    'import/first': 0, // Too strict.
    'no-shadow': 0, // // Shadow is nice language feature.
    'react/jsx-filename-extension': 0, // JavaScript belong to .js
    'react/prop-types': 0, // It's handled by Flow.
    'react/self-closing-comp': 0, // <Text> </Text> is fine.s
    'react/prefer-stateless-function': 0, // PureComponents ftw.
    'arrow-body-style': 0, // Too strict.
    'prefer-destructuring': 0, // Flow casting can need it.
    'import/extensions': 0, // Flow checks it.
    'no-alert': 0, // Too strict.
    'react/require-default-props': 0, // Not needed with Flow.
    'react/destructuring-assignment': 0, // Too strict.
    'import/order': 0, // Too strict.
    'lines-between-class-members': 0, // Too strict.
    'react/sort-comp': 0, // Too strict.
    'import/no-cycle': 0, // Too strict.
  },
};
