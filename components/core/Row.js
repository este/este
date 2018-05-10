// @flow
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import ThemeContext from './ThemeContext';

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
      <ThemeContext.Consumer>
        {theme => {
          const { noSpacer, children } = this.props;
          if (noSpacer === true) {
            return <View style={styles.view}>{children}</View>;
          }

          const count = React.Children.count(children);
          return (
            <View style={styles.view}>
              {React.Children.map(children, (child, index) => {
                return (
                  <>
                    {child}
                    {index !== count - 1 && (
                      <View
                        style={theme.styles.rowSpacer}
                        key={`spacer-${index}`}
                      />
                    )}
                  </>
                );
              })}
            </View>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

export default Row;
