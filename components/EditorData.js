// @flow
import * as React from 'react';
import isNumeric from 'validator/lib/isNumeric';
import EditorDataItem from './EditorDataItem';

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
  handleEditorDataItemChange = (key: string, value: string) => {
    // TODO: Consider EditorDataNumber with constants etc.
    const maybeEnforcedNumber = isNumeric(value) ? Number(value) : value;
    const data = { ...this.props.data, [key]: maybeEnforcedNumber };
    this.props.onChange(data);
  };

  render() {
    const { data } = this.props;
    if (data == null) return null;
    // If wrap, test it on the small screen.
    // https://file-yvlyntknne.now.sh
    return Object.keys(data).map(key => {
      const value = data[key];
      return (
        <EditorDataItem
          key={key}
          itemKey={key}
          itemValue={value}
          onChange={this.handleEditorDataItemChange}
        />
      );
    });
  }
}

export default EditorData;
