// @flow
import * as React from 'react';
import type { Path, Web } from './Editor';
import type { SectionName } from './EditorMenu';
import EditorDispatch from './EditorDispatch';

import EditorMenuSectionHamburger from './EditorMenuSectionHamburger';
import EditorMenuSectionWeb from './EditorMenuSectionWeb';
import EditorMenuSectionPage from './EditorMenuSectionPage';
import EditorMenuSectionElement from './EditorMenuSectionElement';
import EditorMenuSectionTheme from './EditorMenuSectionTheme';
import EditorMenuSectionTypography from './EditorMenuSectionTypography';
import EditorMenuSectionAdd from './EditorMenuSectionAdd';

type ActiveSectionProps = {
  activeSection: SectionName,
  activePath: Path,
  web: Web,
};

// class? imho jo

class EditorMenuActiveSection extends React.PureComponent<ActiveSectionProps> {
  render() {
    const { activeSection, activePath, web } = this.props;
    return (
      <EditorDispatch>
        {dispatch => {
          switch (activeSection) {
            case 'hamburger':
              return <EditorMenuSectionHamburger />;
            case 'web':
              return <EditorMenuSectionWeb />;
            case 'page':
              return <EditorMenuSectionPage />;
            case 'element':
              return (
                <EditorMenuSectionElement
                  activePath={activePath}
                  dispatch={dispatch}
                />
              );
            case 'theme':
              return <EditorMenuSectionTheme />;
            case 'typography':
              return (
                <EditorMenuSectionTypography web={web} dispatch={dispatch} />
              );
            case 'add':
              return <EditorMenuSectionAdd activePath={activePath} />;
            default:
              // eslint-disable-next-line no-unused-expressions
              (activeSection: empty);
              return null;
          }
        }}
      </EditorDispatch>
    );
  }
}

export default EditorMenuActiveSection;
