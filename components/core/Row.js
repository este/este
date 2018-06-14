// @flow
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import withTheme, { type Theme } from './withTheme';

type Props = {|
  noSpacer?: boolean,
  children: React.Node,
  theme: Theme,
|};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
  },
});

class Row extends React.PureComponent<Props> {
  render() {
    const { noSpacer, children, theme } = this.props;
    if (noSpacer === true) {
      return <View style={styles.view}>{children}</View>;
    }

    // https://reactjs.org/docs/jsx-in-depth.html#booleans-null-and-undefined-are-ignored
    const isIgnored = value => value == null || typeof value === 'boolean';

    const visibleChildren = React.Children.toArray(children)
      .filter(child => !isIgnored(child))
      .map((child, index, array) => {
        const hasNextSibling = index !== array.length - 1;
        return (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={index}>
            {child}
            {hasNextSibling && <View style={theme.styles.rowSpacer} />}
          </React.Fragment>
        );
      });

    return <View style={styles.view}>{visibleChildren}</View>;
  }
}

export default withTheme(Row);
