// @flow
import * as React from 'react';
import ThemeProvider from './ThemeProvider';
import { browserTheme } from '../themes/browserTheme';
import Head from 'next/head';
import PageStyle from './PageStyle';
import AppError from './AppError';
import EditorContent, { type Content } from './EditorContent';

type EditorProps = {|
  name: string,
|};

type EditorState = {|
  page: {|
    backgroundColor: string,
    typography: {
      fontFamily: string,
      fontSize: number,
      fontSizeScale: number,
      lineHeight: number,
    },
    content: Content,
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
    content: {
      type: 'View',
      props: {
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

  render() {
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
        <PageStyle backgroundColor={this.state.page.backgroundColor} />
        <AppError />
        <EditorContent content={this.state.page.content} />
      </ThemeProvider>
    );
  }
}

export default Editor;
