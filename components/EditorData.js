// @flow
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import EditorBreadcrumbButton from './EditorBreadcrumbButton';
import Text from './core/Text';

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
  },
});

// const stylesSchema = {
//   backgroundColor: {
//     values: [], // TODO: global constants
//     validator: () => true,
//   },
//   flex: {
//     values: [1],
//     validator: value => value === 1,
//   },
// };

type EditorDataProps = {|
  data: ?Object,
|};

class EditorData extends React.PureComponent<EditorDataProps> {
  render() {
    const { data } = this.props;
    const items =
      data != null
        ? Object.keys(data).map(key => {
            const value = data[key];
            return (
              // Enforce nowrap for key value pair.
              <View style={styles.view} key={key}>
                <EditorBreadcrumbButton>{key}</EditorBreadcrumbButton>
                <Text color="gray">: </Text>
                <EditorBreadcrumbButton>{value}</EditorBreadcrumbButton>
                <Text color="gray">; </Text>
              </View>
            );
          })
        : null;
    // Do not wrap unless manual flexWrap: wrap; test on small screen.
    // https://file-yvlyntknne.now.sh
    return items;
  }
}

export default EditorData;
