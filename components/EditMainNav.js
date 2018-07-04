// @flow
import * as React from 'react';
import { View } from 'react-native';
import Spacer from './core/Spacer';
import A from './core/A';
import { titles } from './app/sitemap';
import { FormattedMessage } from 'react-intl';
import withTheme, { type Theme } from './core/withTheme';

const PostParents = ({ postParents }) => {
  // Local mutation is fine. Also, type refinement works with forEach. Note it
  // does not work with Array filter method.
  // https://github.com/facebook/flow/issues/6516
  const items = [];
  postParents.forEach(({ id, name }) => {
    if (name == null) return;
    items.push(
      <A href={{ pathname: '/post', query: { id } }} key={id}>
        {name}
      </A>,
    );
  });
  return <Spacer>{items}</Spacer>;
};

type EditMainNavProps = {|
  theme: Theme,
  web: {
    +id: string,
    +name: string,
  },
  postParents?: ?$ReadOnlyArray<{|
    +id: string,
    +name: ?string,
  |}>,
|};

class EditMainNav extends React.PureComponent<EditMainNavProps> {
  render() {
    const { theme, web, postParents } = this.props;
    return (
      <View style={theme.styles.appPageMainNav}>
        <Spacer>
          <A href={{ pathname: '/' }} prefetch>
            <FormattedMessage {...titles.index} />
          </A>
          <A href={{ pathname: '/web', query: { id: web.id } }} prefetch>
            {web.name.trim()}
          </A>
          {postParents && <PostParents postParents={postParents} />}
        </Spacer>
      </View>
    );
  }
}

export default withTheme(EditMainNav);
