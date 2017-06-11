module.exports = {
  extends: ['airbnb'],
  parser: 'babel-eslint',
  globals: {
    APP_NAME: true,
    APP_VERSION: true,
    GRAPHQL_ENDPOINT: true,
    window: true,
    // Flow
    $Exact: true,
    $Keys: true,
    Event: true,
    EventHandler: true,
    KeyboardEvent: true,
    ReactClass: true,
  },
  // AirBnb is great, but very strict. Feel free to add anything.
  rules: {
    'arrow-parens': 0, // Does not work with Flow generic types.
    'comma-dangle': 0, // Because some files are still in ES5.
    'default-case': 0, // We don't need it with Flow.
    'import/first': 0, // Este sorts by atom/sort lines natural order.
    'import/prefer-default-export': 0, // Actions can have just one action.
    'no-confusing-arrow': 0, // This rule is confusing.
    'no-mixed-operators': 0, // Prettier.
    'no-nested-ternary': 0, // Buggy for functional componenents.
    'no-param-reassign': 0, // We love param reassignment. Naming is hard.
    'no-shadow': 0, // Shadowing is a nice language feature. Naming is hard.
    'no-underscore-dangle': 0, // Control freaky.
    'react/jsx-boolean-value': 0, // Control freaky.
    'react/jsx-closing-bracket-location': 0, // Prettier.
    'react/jsx-filename-extension': 0, // JSX belongs to .js files.
    'react/jsx-indent': 0, // Prettier.
    'react/jsx-indent-props': 0, // Prettier.
    'react/jsx-wrap-multilines': 0, // Prettier.
    'react/no-danger': 0, // Control freaky.
    'react/no-unescaped-entities': 0, // Prettier.
    'react/no-unused-prop-types': 0, // Buggy and we don't need it with Flow.
    'react/prop-types': 0, // We don't need it with Flow.
    'react/react-in-jsx-scope': 0, // Next.js injects it. Should be default.
    'react/require-default-props': 0, // We don't need it with Flow.
    'template-curly-spacing': 0, // Prettier.
    curly: 0, // Prettier.
    indent: 0, // Prettier.
  },
};
