module.exports = api => {
  api.cache(true);

  const presets = ['next/babel', '@zeit/next-typescript/babel'];

  const plugins = [
    ['relay', { artifactDirectory: '../../packages/relay/generated' }],
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
