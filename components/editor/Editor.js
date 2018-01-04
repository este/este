// @flow
import * as React from 'react';
import ThemeProvider from '../ThemeProvider';
import { browserThemeDark } from '../../themes/browserTheme';
import AppError from '../AppError';
import EditorMenu, { menuPadding, type SectionName } from './EditorMenu';
import EditorPage from './EditorPage';
import { webFixture } from './EditorFixtures';
import arrayEqual from 'array-equal';
import PropTypes from 'prop-types';
import draftCss from './draftCss';
// import XRay from 'react-x-ray';

type EditorProps = {|
  name: string,
|};

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

export type ElementType = 'Box' | 'Text';

// TODO: JSON schema.
export type Element = {|
  type: ElementType,
  props: {|
    children: Array<Element | string>,
    style?: Object,
    // browserStyle?: string,
    // iosStyle?: Object,
    // androidStyle?: Object,
  |},
|};

// TODO: JSON schema. Import typography, Box, Text, etc. from their modules.
export type Web = {|
  theme: Theme,
  pages: {
    [pageName: string]: [Element],
    index: [Element],
  },
|};

export type Path = Array<number>;

type EditorState = {|
  activePath: Path,
  activeSection: SectionName,
  menuHeight: number,
  web: Web,
|};

type EditorAction =
  | { type: 'SET_ACTIVE_PATH', path: Path }
  | { type: 'SET_ACTIVE_SECTION', section: SectionName }
  | { type: 'SET_MENU_HEIGHT', height: number };

export type EditorDispatch = (
  action: EditorAction,
  callback?: () => void,
) => void;

// Escape hatch for scroll measurement. Only browsers need it.
export const activeElementProp = 'data-active-element';

export const pathEqual = (path1: Path, path2: Path) => arrayEqual(path1, path2);

// Hard coded, because we can't compute menu height on the server nor we can
// hack it on the client because JavaScript is async loaded.
// This is special case which can't be solved with plain CSS as far I know.
// TODO: Breadcrumbs and sections should not wrap. It should be horizontally
// scrollable instead.
const initialMenuHeight = lineHeight =>
  2 * lineHeight + 6 * lineHeight * menuPadding;

const initialState = {
  activePath: [], // Maybe consider using context for that.
  activeSection: 'web',
  menuHeight: initialMenuHeight(browserThemeDark.typography.lineHeight),
  web: webFixture,
};

const editorReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_PATH':
      return { ...state, activePath: action.path, activeSection: 'element' };
    case 'SET_ACTIVE_SECTION':
      return {
        ...state,
        activeSection: action.section,
        ...(action.section === 'page' ? { activePath: [] } : null),
      };
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

class Editor extends React.PureComponent<EditorProps, EditorState> {
  static childContextTypes = {
    dispatch: PropTypes.func,
  };

  state = initialState;

  getChildContext() {
    return { dispatch: this.dispatch };
  }

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
    const { activePath, activeSection, web } = this.state;
    const webName = this.props.name;
    const pageName = 'index';

    return (
      <ThemeProvider theme={browserThemeDark}>
        <style jsx global>
          {draftCss}
        </style>
        {/* <XRay grid={web.theme.typography.lineHeight}> */}
        <AppError />
        <EditorPage
          activePath={activePath}
          dispatch={this.dispatch}
          paddingBottomPx={this.state.menuHeight}
          pageName={pageName}
          web={web}
          webName={webName}
        />
        <EditorMenu
          activePath={activePath}
          activeSection={activeSection}
          onHeightChange={this.handleEditorMenuHeightChange}
          pageName={pageName}
          web={web}
          webName={webName}
        />
        {/* </XRay> */}
      </ThemeProvider>
    );
  }
}

export default Editor;
