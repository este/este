// @flow
import * as React from 'react';
import ThemeProvider from './ThemeProvider';
import { browserTheme } from '../themes/browserTheme';
import Head from 'next/head';
import PageStyle from './PageStyle';
import AppError from './AppError';
import EditorElement, { type Element } from './EditorElement';

type EditorProps = {|
  name: string,
|};

export type Theme = {|
  backgroundColor: string,
  color: string,
  typography: {|
    fontFamily: string,
    fontSize: number,
    fontSizeScale: number,
    lineHeight: number,
  |},
|};

type EditorState = {|
  web: {|
    theme: Theme,
    pages: {
      [pageName: string]: [Element],
      index: [Element],
    },
  |},
|};

const initialState = {
  web: {
    theme: {
      backgroundColor: '#eee',
      color: '#333',
      typography: {
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontSize: 16,
        fontSizeScale: 0.75,
        lineHeight: 24,
      },
      // colors: {
      //   brand1: 'blue'
      // },
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

class Editor extends React.Component<EditorProps, EditorState> {
  state = initialState;

  render() {
    const { web } = this.state;
    return (
      <ThemeProvider theme={browserTheme}>
        <Head>
          {/* <title>{this.props.name}</title> */}
          <meta
            name="viewport"
            // https://bitsofco.de/ios-safari-and-shrink-to-fit
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
        </Head>
        <PageStyle backgroundColor={web.theme.backgroundColor} />
        <AppError />
        {web.pages.index.map(element => (
          <EditorElement
            element={element}
            theme={web.theme}
            key={JSON.stringify(element)}
          />
        ))}
        {/* <Controls? /> */}
      </ThemeProvider>
    );
  }
}

export default Editor;
