// @flow
import * as React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Text from './core/Text';
import SlatePlainSerializer from 'slate-plain-serializer';

type EditorDataStringProps = {|
  defaultValue: string,
  onChange: (key: string, value: string) => void,
  dataKey: string,
|};

type EditorDataStringState = {|
  editorValue: Object,
|};

class EditorDataString extends React.PureComponent<
  EditorDataStringProps,
  EditorDataStringState,
> {
  state = {
    editorValue: Value.fromJSON({
      document: {
        nodes: [
          {
            object: 'block',
            type: 'line',
            nodes: [
              {
                object: 'text',
                leaves: [
                  {
                    text: this.props.defaultValue,
                  },
                ],
              },
            ],
          },
        ],
      },
    }),
  };

  renderNode = (props: Object) => {
    const { attributes, node, children } = props;
    const type = node.type;
    switch (type) {
      case 'line': {
        return (
          <Text {...attributes} color="gray">
            {children}
          </Text>
        );
      }
    }
  };

  handleEditorChange = ({ value }: { value: Object }) => {
    this.setState({ editorValue: value });
    const documentChanged = value.document !== this.state.editorValue.document;
    if (documentChanged) {
      // because SlatePlainSerializer adds \n
      const text = SlatePlainSerializer.serialize(value).replace(/\n/g, '');
      this.props.onChange(this.props.dataKey, text);
    }
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

  render() {
    return (
      <Editor
        // placeholder="Enter some plain text..."
        autoCorrect={false}
        spellCheck={false}
        value={this.state.editorValue}
        renderNode={this.renderNode}
        onChange={this.handleEditorChange}
        onFocus={this.handleEditorFocus}
        onKeyDown={this.handleEditorKeyDown}
      />
    );
  }
}

export default EditorDataString;
