// @flow
import * as React from 'react';
import ThemeProvider from '../ThemeProvider';
import { browserThemeDark } from '../../themes/browserTheme';
import AppError from '../AppError';
import EditorMenu, { menuPadding, type SectionName } from './EditorMenu';
import EditorPage from './EditorPage';
import { webFixture } from './EditorFixtures';
import PropTypes from 'prop-types';
import draftCss from './draftCss';
import logReducer from '../../lib/logReducer';
// import XRay from 'react-x-ray';

type EditorProps = {|
  name: string,
|};

type Typography = {|
  fontFamily: string,
  fontSize: number,
  fontSizeScale: number,
  lineHeight: number,
|};

export type Theme = {|
  colors: {
    background: string,
    foreground: string,
  },
  typography: Typography,
|};

export type Path = Array<number>;

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

type Page = {|
  createdAt: number,
  updatedAt: number,
  elements: Array<Element>,
|};

// TODO: JSON schema. Import typography, Box, Text, etc. from their modules.
export type Web = {|
  theme: Theme,
  pages: {
    [pageName: string]: Page,
    index: Page,
  },
|};

type EditorState = {|
  activePath: Path,
  activeSection: SectionName,
  menuHeight: number,
  web: Web,
|};

type EditorAction =
  | { type: 'SET_ACTIVE_PATH', path: Path }
  | { type: 'SET_ACTIVE_SECTION', section: SectionName }
  | { type: 'SET_MENU_HEIGHT', height: number }
  | { type: 'SET_WEB_THEME_TYPOGRAPHY', typography: Typography };

export type EditorDispatch = (
  action: EditorAction,
  callback?: () => void,
) => void;

// Escape hatch for scroll measurement. Only browsers need it.
export const activeElementProp = 'data-active-element';

// Hard coded, because we can't compute menu height on the server nor we can
// hack it on the client because JavaScript is async loaded.
// This is special case which can't be solved with plain CSS as far I know.
// TODO: Breadcrumbs and sections should not wrap. It should be horizontally
// scrollable instead.
const initialMenuHeight = lineHeight =>
  2 * lineHeight + 6 * lineHeight * menuPadding;

class Editor extends React.PureComponent<EditorProps, EditorState> {
  static childContextTypes = {
    dispatch: PropTypes.func,
  };

  static reducer = (state: EditorState, action: EditorAction) => {
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
      case 'SET_WEB_THEME_TYPOGRAPHY':
        return {
          ...state,
          web: {
            ...state.web,
            theme: { ...state.web.theme, typography: action.typography },
          },
        };
      default:
        // eslint-disable-next-line no-unused-expressions
        (action: empty);
        return state;
    }
  };

  state = {
    activePath: [], // Maybe consider using context for that.
    activeSection: 'web',
    menuHeight: initialMenuHeight(browserThemeDark.typography.lineHeight),
    web: webFixture,
  };

  getChildContext() {
    return { dispatch: this.dispatch };
  }

  dispatch: EditorDispatch = (action, callback) => {
    this.setState(
      prevState => logReducer(Editor.reducer)(prevState, action),
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
        {/* <XRay
          grid={web.theme.typography.fontSize * web.theme.typography.lineHeight}
        > */}
        <AppError />
        <EditorPage
          activePath={activePath}
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
