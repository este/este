// @flow
import * as React from 'react';
import ThemeProvider from './ThemeProvider';
import { browserThemeDark } from '../themes/browserTheme';
import AppError from './AppError';
import type { Element } from './EditorElement';
import EditorMenu from './EditorMenu';
import EditorPage from './EditorPage';

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
                    ...Array.from({ length: 20 }).map(() => ({
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
      ],
    },
  },
};

const computeMenuStyle = lineHeight => {
  const paddingVertical = 0.5;
  const defaultHeight = lineHeight + 2 * (paddingVertical * lineHeight);
  return { paddingVertical, defaultHeight };
};

class Editor extends React.Component<EditorProps, EditorState> {
  state = initialState;

  render() {
    const { web } = this.state;
    const webName = this.props.name;
    const pageName = 'index';
    const menuStyle = computeMenuStyle(browserThemeDark.typography.lineHeight);

    return (
      <ThemeProvider theme={browserThemeDark}>
        <AppError />
        <EditorPage
          web={web}
          webName={webName}
          pageName={pageName}
          paddingBottomPx={menuStyle.defaultHeight}
        />
        <EditorMenu
          web={web}
          webName={webName}
          pageName={pageName}
          paddingVertical={menuStyle.paddingVertical}
        />
      </ThemeProvider>
    );
  }
}

export default Editor;
