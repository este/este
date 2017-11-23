// @flow
import * as React from 'react';
import ThemeProvider from './ThemeProvider';
import { browserThemeDark } from '../themes/browserTheme';
import AppError from './AppError';
import type { Element } from './EditorElement';
import EditorMenu from './EditorMenu';
import EditorPage from './EditorPage';
import { pageIndexFixture, themeFixture } from './EditorFixtures';
// import { assocPath } from 'ramda';
// import XRay from 'react-x-ray';

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

export type Path = Array<number>;

type EditorState = {|
  web: Web,
  activePath: Path,
|};

type EditorAction = {| type: 'SET_ACTIVE_PATH', path: Path |};

export type Dispatch = (action: EditorAction) => void;

const initialState = {
  web: {
    theme: themeFixture,
    // fragmentsOrElementsOrTypesOrComponents: {
    //   Heading
    //   MainNav
    // }
    pages: { index: pageIndexFixture },
  },
  activePath: [],
};

const computeEditorMenuStyle = lineHeight => {
  const paddingVertical = 0.5;
  const defaultHeight = lineHeight + 2 * (paddingVertical * lineHeight);
  return { paddingVertical, defaultHeight };
};

const editorReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_PATH':
      return { ...state, activePath: action.path };
    default:
      // eslint-disable-next-line no-unused-expressions
      (action: empty);
      return state;
  }
};

class Editor extends React.Component<EditorProps, EditorState> {
  state = initialState;

  dispatch: Dispatch = action => {
    const dev = process.env.NODE_ENV !== 'production';
    /* eslint-disable no-console */
    this.setState(prevState => {
      if (dev) {
        console.groupCollapsed(`action ${action.type}`);
        console.log('prev state', prevState);
        console.log('action', action);
      }
      const nextState = editorReducer(prevState, action);
      if (dev) {
        console.log('next state', nextState);
        console.groupEnd();
      }
      return nextState;
    });
    /* eslint-enable no-console */
  };

  render() {
    const { web, activePath } = this.state;
    const webName = this.props.name;
    const pageName = 'index';
    const editorMenuStyle = computeEditorMenuStyle(
      browserThemeDark.typography.lineHeight,
    );

    return (
      <ThemeProvider theme={browserThemeDark}>
        {/* <XRay grid={web.theme.typography.lineHeight}> */}
        <AppError />
        <style jsx global>{`
          @keyframes activated {
            0% {
              opacity: 0.5;
            }
          }
        `}</style>
        <EditorPage
          web={web}
          webName={webName}
          pageName={pageName}
          paddingBottomPx={editorMenuStyle.defaultHeight}
          dispatch={this.dispatch}
          activePath={activePath}
        />
        <EditorMenu
          // web={web}
          webName={webName}
          pageName={pageName}
          paddingVertical={editorMenuStyle.paddingVertical}
        />
        {/* </XRay> */}
      </ThemeProvider>
    );
  }
}

export default Editor;
