module.exports = {
  extends: [
    'airbnb',
    // It removes global Flow types so we don’t have to.
    'plugin:flowtype/recommended',
    'prettier',
    'prettier/flowtype',
    'prettier/react',
  ],
  parser: 'babel-eslint',
  plugins: ['flowtype'],
  globals: {
    APP_NAME: true,
    APP_VERSION: true,
    DEFAULT_LOCALE: true,
    GRAPHQL_ENDPOINT: true,
    HOSTNAME: true,
    SENTRY_CLIENT_DNS: true,
    SENTRY_SERVER_DNS: true,
    window: true,
    HTMLElement: true,
  },
  // Airbnb is great but very strict. Feel free to relax any rule.
  rules: {
    camelcase: 0, // Foo_foo can be Relay compiler generated type.
    'consistent-return': 0, // Control freaky.
    'default-case': 0, // Control freaky.
    'guard-for-in': 0, // It's not a bug it's a feature.
    'import/first': 0, // Nobody cares about imports order.
    'import/prefer-default-export': 0, // Control freaky.
    'no-nested-ternary': 0, // Control freaky.
    'no-param-reassign': 0, // We love param reassignment. Naming is hard.
    'no-plusplus': 0, // Control freaky.
    'no-restricted-syntax': 0, // Not needed with modern browsers.
    'no-shadow': 0, // Shadowing is a nice language feature. Naming is hard.
    'no-underscore-dangle': 0, // Control freaky.
    'react/default-props-match-prop-types': 0, // Buggy.
    'react/forbid-prop-types': 0, // Control freaky.
    'react/jsx-boolean-value': 0, // Control freaky.
    'react/jsx-curly-brace-presence': 0, // styled-jsx
    'react/jsx-filename-extension': 0, // JSX belongs to .js files.
    'react/no-danger': 0, // Control freaky.
    'react/no-unused-prop-types': 0, // Flow.
    'react/prop-types': 0, // Flow.
    'react/require-default-props': 0, // Flow.
    'react/sort-comp': 0, // Control freaky.
    'spaced-comment': 0, // We don't care.
    // allow console and debugger in development
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  },
};
