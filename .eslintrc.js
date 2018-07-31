module.exports = {
  extends: [
    'airbnb',
    'plugin:flowtype/recommended',
    'prettier',
    'prettier/flowtype',
    'prettier/react',
  ],
  parser: 'babel-eslint',
  plugins: ['flowtype', 'relay'],
  // Some rules can be too strict. Feel free to relax them. Explain.
  rules: {
    'import/first': 0, // Too strict.
    'no-shadow': 0, // // Shadow is nice language feature.
    'react/jsx-filename-extension': 0, // JavaScript belong to .js
    'react/prop-types': 0, // Flow checks it.
    'react/self-closing-comp': 0, // <Text> </Text> is fine.s
    'react/prefer-stateless-function': 0, // PureComponents ftw.
    'arrow-body-style': 0, // Too strict.
    'prefer-destructuring': 0, // Flow casting can need it.
    'import/extensions': 0, // Flow checks it.
    'no-alert': 0, // Too strict.
    'react/require-default-props': 0, // Flow checks it.
    'react/destructuring-assignment': 0, // Too strict.
    'import/order': 0, // Too strict.
    'lines-between-class-members': 0, // Too strict.
    'import/no-cycle': 0, // Too strict.
    'spaced-comment': ['error', 'always', { markers: ['::', ':'] }], // Flow comments.
    'consistent-return': 0, // Flow checks it.
    'default-case': 0, // Flow checks it.
    'react/no-unused-prop-types': 0, // Too brittle.
    // Must be explicitly enabled.
    'relay/graphql-syntax': 'error',
    'relay/compat-uses-vars': 'error',
    'relay/graphql-naming': 'error',
    'relay/generated-flow-types': 'error',
    'relay/unused-fields': 'error',
    'relay/no-future-added-value': 'error',
    'react/no-did-update-set-state': 0, // Perfectly valid. https://github.com/yannickcr/eslint-plugin-react/issues/1754
    'no-nested-ternary': 0, // That's fine.
    'react/no-multi-comp': 0, // That's fine.
  },
};
