// @flow
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './core/Text';
import EditorDataString from './EditorDataString';
// import getFocusableNodes from '../client/getFocusableNodes';

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
  },
});

type EditorDataItemProps = {|
  itemKey: string,
  itemValue: mixed,
  onChange: (key: string, value: string) => void,
|};

class EditorDataItem extends React.PureComponent<EditorDataItemProps> {
  handleLabelPress = () => {
    // const els = getFocusableNodes(this);
    // console.log(els);
  };

  renderValueEditor() {
    const { itemKey, itemValue } = this.props;
    if (typeof itemValue === 'string' || typeof itemValue === 'number')
      return (
        <EditorDataString
          defaultValue={itemValue.toString()}
          dataKey={itemKey}
          onChange={this.props.onChange}
        />
      );
    return null;
  }

  render() {
    const ValueEditor = this.renderValueEditor();
    if (ValueEditor == null) return null;
    const { itemKey } = this.props;
    return (
      // Enforce nowrap for key value pair.
      <View style={styles.view}>
        <Text
          // accessibilityRole="label"
          color="gray"
          // onPress={this.handleLabelPress}
        >{`${itemKey}: `}</Text>
        {ValueEditor}
        <Text color="gray">; </Text>
      </View>
    );
  }
}

export default EditorDataItem;
