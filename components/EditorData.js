// @flow
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './core/Text';
import EditorDataString from './EditorDataString';
import isNumeric from 'validator/lib/isNumeric';

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
  onChange: (data: Object) => void,
|};

class EditorData extends React.PureComponent<EditorDataProps> {
  handleEditorDataChange = (key: string, value: string) => {
    // TODO: Consider EditorDataNumber with constants etc.
    const maybeEnforcedNumber = isNumeric(value) ? Number(value) : value;
    const data = { ...this.props.data, [key]: maybeEnforcedNumber };
    this.props.onChange(data);
  };

  renderValueEditor(key: string, value: mixed) {
    if (typeof value === 'string' || typeof value === 'number')
      return (
        <EditorDataString
          defaultValue={value.toString()}
          dataKey={key}
          onChange={this.handleEditorDataChange}
        />
      );
    return null;
  }

  render() {
    const { data } = this.props;
    const items =
      data != null
        ? Object.keys(data).map(key => {
            const value = data[key];
            const ValueEditor = this.renderValueEditor(key, value);
            if (ValueEditor == null) return null;
            return (
              // Enforce nowrap for key value pair.
              <View style={styles.view} key={key}>
                <Text color="gray">{`${key}: `}</Text>
                {ValueEditor}
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
