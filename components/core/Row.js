// @flow
import * as React from 'react';
import { View } from 'react-native';
import Theme from './Theme';

type Props = {|
  children: React.Node,
|};

class Row extends React.PureComponent<Props> {
  render() {
    return (
      <Theme>
        {theme => (
          <View style={theme.styles.row.view}>{this.props.children}</View>
        )}
      </Theme>
    );
  }
}

export default Row;
