module.exports = function(api) {
  api.cache(true);

  const presets = ['next/babel', '@zeit/next-typescript/babel'];

  const plugins = [
    ['relay', { artifactDirectory: './generated' }],
    // https://github.com/zeit/next.js/issues/5989
    [
      'module-resolver',
      {
        alias: {
          '^react-native$': 'react-native-web',
        },
      },
    ],
  ];

  return { plugins, presets };
};
