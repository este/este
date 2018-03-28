// @flow
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Theme from './Theme';
import { intersperse } from 'ramda';

type Props = {|
  noSpacer?: boolean,
  children: React.Node,
|};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
  },
});

class Row extends React.PureComponent<Props> {
  render() {
    return (
      <Theme>
        {theme => {
          let { children } = this.props;
          if (this.props.noSpacer !== true) {
            children = intersperse(
              <View style={theme.styles.row.spacer} key="spacer" />,
              React.Children.toArray(this.props.children),
            );
          }
          return <View style={styles.view}>{children}</View>;
        }}
      </Theme>
    );
  }
}

export default Row;
