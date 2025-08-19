module.exports = {
  presets: [
    '@zeit/next-typescript/babel',
    [
      'next/babel',
      {
        'styled-jsx': {
          plugins: ['styled-jsx-plugin-postcss', 'styled-jsx-plugin-sass'],
        },
      },
    ],
  ],
  plugins: ['@babel/plugin-proposal-optional-chaining'],
  env: {
    test: {
      presets: [
        '@zeit/next-typescript/babel',
        [
          'next/babel',
          {
            'styled-jsx': {
              plugins: ['styled-jsx-plugin-sass'],
            },
          },
        ],
      ],
      plugins: [
        'styled-jsx/babel-test',
        [
          'module-resolver',
          {
            root: ['./'],
            alias: {
              '@components': './components',
            },
          },
        ],
      ],
    },
  },
};
