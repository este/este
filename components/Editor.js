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

// Escape hatch for scroll measurement. Only browsers need it.
export const activeElementProp = 'data-active-element';

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

export type EditorDispatch = (
  action: EditorAction,
  callback?: () => void,
) => void;

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

  dispatch: EditorDispatch = (action, callback) => {
    this.setState(
      prevState => logReducer(editorReducer)(prevState, action),
      callback,
    );
  };

  handleEditorMenuHeightChange = (menu: HTMLElement) => {
    const height = menu.offsetHeight;
    const maybeScrollByToEnsureActiveElementVisibility = () => {
      const activeElement = window.document.querySelector(
        `[${activeElementProp}]`,
      );
      if (!activeElement) return;
      const activeElementBottom = activeElement.getBoundingClientRect().bottom;
      const menuTop = menu.getBoundingClientRect().top;
      const scrollBy = activeElementBottom - menuTop;
      if (scrollBy <= 0) return;
      window.scrollBy({ top: scrollBy, left: 0, behavior: 'smooth' });
    };
    this.dispatch(
      { type: 'SET_MENU_HEIGHT', height },
      maybeScrollByToEnsureActiveElementVisibility,
    );
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
          activePath={activePath}
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
