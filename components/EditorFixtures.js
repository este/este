// @flow

// TODO: Load from DB.

export const themeFixture = {
  colors: {
    background: '#F9FAFB',
    foreground: '#333',
    // brand1: 'blue'
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: 16,
    fontSizeScale: 0.75,
    lineHeight: 24,
  },
};

export const pageIndexFixture = [
  // {
  //   type: 'Title',
  //   props: 'Home',
  // },
  {
    type: 'Box',
    props: {
      style: {
        // marginLeft: 1,
        flex: 1, // Flex 1 to make footer sticky.
      },
      children: [
        {
          type: 'Box',
          props: {
            style: {
              backgroundColor: '#643ab7',
              paddingBottom: 0.5,
              paddingLeft: 0.5,
              paddingRight: 0.5,
              paddingTop: 0.5,
            },
            children: [
              {
                type: 'Text',
                props: {
                  style: { fontSize: 1, color: '#fff' },
                  children: ['Test'],
                },
              },
            ],
          },
        },
        {
          type: 'Box',
          props: {
            style: { flex: 1 },
            children: [
              ...Array.from({ length: 2 }).map(() => ({
                type: 'Text',
                props: { style: { fontSize: 2 }, children: ['Jo!'] },
              })),
              {
                type: 'Text',
                props: { style: { fontSize: 2 }, children: ['Jo!'] },
              },
              {
                type: 'Text',
                props: {
                  children: [
                    'Ahoj ',
                    {
                      type: 'Text',
                      props: {
                        style: { fontStyle: 'italic' },
                        children: [
                          'sv',
                          {
                            type: 'Text',
                            props: {
                              style: { fontWeight: 'bold' },
                              children: ['ě'],
                            },
                          },
                          'te.',
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          type: 'Box',
          props: {
            style: {
              paddingBottom: 0.5,
              paddingLeft: 0.5,
              paddingRight: 0.5,
              paddingTop: 0.5,
            },
            children: [
              {
                type: 'Text',
                props: {
                  style: { fontSize: -1, color: '#333' },
                  children: ['footer'],
                },
              },
            ],
          },
        },
      ],
    },
  },
];
