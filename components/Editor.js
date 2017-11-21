// @flow
import * as React from 'react';
import ThemeProvider from './ThemeProvider';
import { browserThemeDark } from '../themes/browserTheme';
import Head from 'next/head';
import PageStyle from './PageStyle';
import AppError from './AppError';
import EditorElement, { type Element } from './EditorElement';
import Box from './Box';
import EditorMenu from './EditorMenu';

type EditorProps = {|
  name: string,
|};

// TODO: Generate JSON schema.
export type Theme = {|
  colors: {
    background: string,
    foreground: string,
  },
  typography: {|
    fontFamily: string,
    fontSize: number,
    fontSizeScale: number,
    lineHeight: number,
  |},
|};

export type Web = {|
  theme: Theme,
  pages: {
    [pageName: string]: [Element],
    index: [Element],
  },
|};

type EditorState = {|
  web: Web,
|};

const initialState = {
  web: {
    theme: {
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
    },
    // fragmentsOrElementsOrTypesOrComponents: {
    //   Heading
    //   MainNav
    // }
    pages: {
      index: [
        // {
        //   type: 'Title',
        //   props: 'Home',
        // },
        {
          type: 'Box',
          props: {
            style: {
              // marginLeft: 1,
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
                        style: {
                          fontSize: 1,
                          color: '#fff',
                        },
                        children: ['Test'],
                      },
                    },
                  ],
                },
              },
              {
                type: 'Text',
                props: {
                  style: { fontSize: 2 },
                  children: ['Jo!'],
                },
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
      ],
    },
  },
};

const EditorPage = ({ web, webName, pageName }) => (
  <Box>
    <Head>
      <title>{webName}</title>
      <meta
        name="viewport"
        // https://bitsofco.de/ios-safari-and-shrink-to-fit
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
    </Head>
    <PageStyle backgroundColor={web.theme.colors.background} />
    {React.createElement(
      Box,
      null,
      ...web.pages[pageName].map(element => (
        <EditorElement element={element} theme={web.theme} />
      )),
    )}
  </Box>
);

class Editor extends React.Component<EditorProps, EditorState> {
  state = initialState;

  render() {
    const { web } = this.state;
    const webName = this.props.name;
    const pageName = 'index';

    return (
      <ThemeProvider theme={browserThemeDark}>
        <AppError />
        <EditorPage web={web} webName={webName} pageName={pageName} />
        <EditorMenu web={web} webName={webName} pageName={pageName} />
      </ThemeProvider>
    );
  }
}

export default Editor;
