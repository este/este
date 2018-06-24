// @flow
import * as React from 'react';
import { View } from 'react-native';
import Spacer from './core/Spacer';
import A from './core/A';
import { titles } from './app/sitemap';
import { FormattedMessage } from 'react-intl';
import withTheme, { type Theme } from './core/withTheme';

type EditMainNavProps = {|
  theme: Theme,
  webId: string,
  webName: string,
|};

class EditMainNav extends React.PureComponent<EditMainNavProps> {
  render() {
    const { theme, webId, webName } = this.props;
    return (
      <View style={theme.styles.appPageMainNav}>
        <Spacer>
          <A href={{ pathname: '/' }} prefetch>
            <FormattedMessage {...titles.index} />
          </A>
          <A href={{ pathname: '/web', query: { id: webId } }} prefetch>
            {webName.trim()}
          </A>
        </Spacer>
      </View>
    );
  }
}

export default withTheme(EditMainNav);
