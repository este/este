// @flow
import * as React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Text from './core/Text';
import SlatePlainSerializer from 'slate-plain-serializer';
import isNumeric from 'validator/lib/isNumeric';

type EditorDataProps = {|
  defaultData: ?Object,
  onChange: (data: Object) => void,
|};

type EditorDataState = {|
  editorValue: Object,
|};

class EditorData extends React.PureComponent<EditorDataProps, EditorDataState> {
  static mapDataToEditorValue(data: Object) {
    const text = Object.keys(data)
      .map(key => {
        const value = data[key];
        return `${key}: ${value}`;
      })
      .join(', ');
    // TODO: Consider keys and values model. Plain text is ok for now.
    return Value.fromJSON({
      document: {
        nodes: [
          {
            object: 'block',
            type: 'line',
            nodes: [{ object: 'text', leaves: [{ text }] }],
          },
        ],
      },
    });
  }

  state = {
    editorValue: EditorData.mapDataToEditorValue(this.props.defaultData || {}),
  };

  handleEditorFocus = (event: any, change: Object) => {
    // https://github.com/ianstormtaylor/slate/issues/1989
    change.focus();
  };

  handleEditorKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      // Do nothing on enter. It's line.
      event.preventDefault();
      return true;
    }
  };

  handleEditorChange = ({ value }: { value: Object }) => {
    this.setState({ editorValue: value });
    const documentChanged = value.document !== this.state.editorValue.document;
    if (documentChanged) {
      const data = SlatePlainSerializer.serialize(value)
        // Because SlatePlainSerializer adds \n
        .replace(/\n/g, '')
        .split(',')
        .map(keyValue => {
          const [key, value] = keyValue.split(':').map(s => s.trim());
          const isEmpty = v => v == null || v === '';
          if (isEmpty(key) || isEmpty(value)) return null;
          return { key, value };
        })
        .filter(item => item != null)
        .map(item => {
          if (isNumeric(item.value))
            return { ...item, value: Number(item.value) };
          return item;
        })
        .reduce((data, current) => {
          return {
            ...data,
            [current.key]: current.value,
          };
        }, {});
      this.props.onChange(data);
    }
  };

  handleRenderNode = (props: Object) => {
    const { node, attributes, children } = props;
    switch (node.type) {
      case 'line': {
        return (
          <Text {...attributes} color="gray">
            {children}
          </Text>
        );
      }
    }
  };

  render() {
    return (
      <Editor
        // autoFocus is must, because placeholder is not clickable and we need
        // to indicate editable content somehow.
        autoFocus
        autoCorrect={false}
        spellCheck={false}
        value={this.state.editorValue}
        onFocus={this.handleEditorFocus}
        onKeyDown={this.handleEditorKeyDown}
        onChange={this.handleEditorChange}
        renderNode={this.handleRenderNode}
      />
    );
  }
}

export default EditorData;
