// @flow
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Theme from './Theme';

// Exact type, because it forces us to create well tailored components.
type Props = {|
  children?: React.Node,
|};

// Structural styles. Will be merged with theme styles.
const styles = StyleSheet.create({
  pageContainer: {
    margin: 'auto',
    height: '100%',
  },
});

// Always PureComponent.
class PageContainer extends React.PureComponent<Props> {
  render() {
    return (
      <Theme>
        {theme => (
          <View style={[styles.pageContainer, theme.styles.page.container]}>
            {this.props.children}
          </View>
        )}
      </Theme>
    );
  }
}

export default PageContainer;
