// @flow
import * as React from 'react';
import ThemeProvider from './ThemeProvider';
import { browserThemeDark } from '../themes/browserTheme';
import AppError from './AppError';
import type { Element } from './EditorElement';
import EditorMenu, { getDefaultMenuHeight } from './EditorMenu';
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
  menuHeight: ?number,
|};

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
  menuHeight: null,
};

type EditorAction =
  | { type: 'SET_ACTIVE_PATH', path: Path }
  | { type: 'SET_MENU_HEIGHT', height: number };

export type EditorDispatch = (action: EditorAction) => void;

const editorReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_PATH':
      return { ...state, activePath: action.path };
    case 'SET_MENU_HEIGHT':
      return { ...state, menuHeight: action.height };
    default:
      // eslint-disable-next-line no-unused-expressions
      (action: empty);
      return state;
  }
};

// I don't know how to Flow type this shit out of this module without losing
// types. PR anyone?
const logReducer =
  process.env.NODE_ENV === 'production'
    ? reducer => reducer
    : reducer => (prevState, action) => {
        /* eslint-disable no-console */
        console.groupCollapsed(`action ${action.type}`);
        console.log('prev state', prevState);
        console.log('action', action);
        const nextState = reducer(prevState, action);
        console.log('next state', nextState);
        console.groupEnd();
        return nextState;
        /* eslint-enable no-console */
      };

class Editor extends React.Component<EditorProps, EditorState> {
  state = initialState;

  dispatch: EditorDispatch = action => {
    this.setState(prevState => logReducer(editorReducer)(prevState, action));
  };

  handleEditorMenuHeightChange = (height: number) => {
    this.dispatch({ type: 'SET_MENU_HEIGHT', height });
  };

  render() {
    const { web, activePath } = this.state;
    const webName = this.props.name;
    const pageName = 'index';
    const menuHeight =
      this.state.menuHeight ||
      getDefaultMenuHeight(browserThemeDark.typography.lineHeight);

    return (
      <ThemeProvider theme={browserThemeDark}>
        {/* <XRay grid={web.theme.typography.lineHeight}> */}
        <AppError />
        <EditorPage
          web={web}
          webName={webName}
          pageName={pageName}
          paddingBottomPx={menuHeight}
          dispatch={this.dispatch}
        />
        <EditorMenu
          web={web}
          webName={webName}
          pageName={pageName}
          onHeightChange={this.handleEditorMenuHeightChange}
          activePath={activePath}
        />
        {/* </XRay> */}
      </ThemeProvider>
    );
  }
}

export default Editor;
