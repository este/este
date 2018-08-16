// @flow
import * as React from 'react';
import A from './core/A';
import withTheme, { type Theme } from './core/withTheme';

const preventDefault = (event: Event) => {
  event.preventDefault();
};

type EditorMenuLinkPreviewProps = {|
  href: string,
  theme: Theme,
|};

class EditorMenuLinkPreview extends React.PureComponent<
  EditorMenuLinkPreviewProps,
> {
  render() {
    const { href, theme } = this.props;
    return (
      <A
        href={href}
        style={theme.styles.editorMenuLink}
        size={-1}
        color="white"
        onMouseDown={preventDefault}
        target="_blank"
      >
        {href}
      </A>
    );
  }
}

export default withTheme(EditorMenuLinkPreview);
