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
    'consistent-return': 0, // Flow.
    'import/first': 0, // Too strict.
    'no-plusplus': 0, // Prettier ensures it can't happen.
    'react/jsx-filename-extension': 0, // Too strict.
    'react/prop-types': 0, // Flow.
    'react/self-closing-comp': 0, // <Text> </Text> is fine.
    'spaced-comment': 0, // Too strict.
    'react/no-multi-comp': 0, // Too strict.
    'react/prefer-stateless-function': 0, // PureComponent FTW.
    'arrow-body-style': 0, // Too strict.
    'prefer-destructuring': 0, // Flow casting can need it.
    'import/extensions': 0, // Flow checks it.
    'no-alert': 0, // // Too strict.
    'no-unused-expressions': 0, // For Flow casting, e.g. (field: empty);
    'react/require-default-props': 0, // WTF? Not needed when we pass props.
  },
};
