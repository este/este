// @flow
import * as React from 'react';
import A from './core/A';
import withTheme, { type Theme } from './core/withTheme';
import { pipe } from 'ramda';

const preventDefault = event => {
  event.preventDefault();
};

type PostTextActionsLinkPreviewProps = {|
  href: string,
  theme: Theme,
|};

class PostTextActionsLinkPreview extends React.PureComponent<
  PostTextActionsLinkPreviewProps,
> {
  render() {
    const { href, theme } = this.props;
    return (
      <A
        href={href}
        style={theme.styles.postTextActionsLink}
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

export default pipe(withTheme)(PostTextActionsLinkPreview);
