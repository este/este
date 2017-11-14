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

export type Typography = {|
  fontFamily: string,
  fontSize: number,
  fontSizeScale: number,
  lineHeight: number,
|};

type EditorState = {|
  page: {|
    backgroundColor: string,
    typography: Typography,
    element: Element,
  |},
|};

const initialState = {
  page: {
    backgroundColor: '#eee',
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
    element: {
      type: 'Box',
      props: {
        style: {
          // marginLeft: 1,
          // backgroundColor: 'green',
        },
        children: [
          {
            type: 'Text',
            props: { children: ['Ahoj '] },
          },
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
                'te',
              ],
            },
          },
        ],
      },
    },
  },
};

class Editor extends React.Component<EditorProps, EditorState> {
  state = initialState;

  // TODO: Validate page.element JSON schema via Ajv before render.

  render() {
    const { page } = this.state;
    return (
      <ThemeProvider theme={browserTheme}>
        <Head>
          <title>{this.props.name}</title>
          <meta
            name="viewport"
            // https://bitsofco.de/ios-safari-and-shrink-to-fit
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
        </Head>
        <PageStyle backgroundColor={page.backgroundColor} />
        <AppError />
        <EditorElement element={page.element} typography={page.typography} />
        {/* <Controls? /> */}
      </ThemeProvider>
    );
  }
}

export default Editor;
