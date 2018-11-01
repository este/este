// @flow
import * as React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Text from '../core/Text';
import SlatePlainSerializer from 'slate-plain-serializer';
import isNumeric from 'validator/lib/isNumeric';
import hotKey from '../../browser/hotKey';

type EditorDataProps = {|
  defaultData: ?Object,
  onChange: (data: Object) => void,
|};

type EditorDataState = {|
  editorValue: Object,
|};

const separator = ';';

class EditorData extends React.PureComponent<EditorDataProps, EditorDataState> {
  static mapDataToEditorValue(data: Object) {
    const text = Object.keys(data)
      .map(key => {
        const value = data[key];
        return `${key}: ${value}`;
      })
      .join(`${separator} `);
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

  getCaretPosition(): string {
    const { editorValue: value } = this.state;
    if (!value.selection.isCollapsed) return '';
    if (value.selection.focus.isAtStartOfNode(value.document)) return 'start';
    if (value.selection.focus.isAtEndOfNode(value.document)) return 'end';
    return '';
  }

  handleEditorFocus = (event: any, change: any) => {
    // https://github.com/ianstormtaylor/slate/issues/1989
    change.focus();
  };

  handleEditorKeyDown = (event: KeyboardEvent, change: any, next: any) => {
    const { mod, key } = hotKey(event);
    if (key === 'Enter') {
      // Just return. No need to call preventDefault for Slate anymore.
      return;
    }
    if (mod) {
      if (key === 'y' || key === 'z') {
        // Prevent default browser history action.
        event.preventDefault();
      } else if (key === 'ArrowLeft' || key === 'ArrowRight') {
        // Prevent default browser history navigation action.
        event.stopPropagation();
      }
    }
    // But we have to call next() to process key.
    return next();
  };

  handleEditorChange = ({ value }: { value: Object }) => {
    this.setState({ editorValue: value });
    const documentChanged = value.document !== this.state.editorValue.document;
    if (documentChanged) {
      const data = SlatePlainSerializer.serialize(value)
        // Because SlatePlainSerializer adds \n
        .replace(/\n/g, '')
        .split(separator)
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

  handleRenderNode = (props: Object, next: any) => {
    const { node, attributes, children } = props;
    switch (node.type) {
      case 'line': {
        return (
          <Text {...attributes} color="gray">
            {children}
          </Text>
        );
      }
      default:
        return next();
    }
  };

  render() {
    const caretPosition = this.getCaretPosition();
    return (
      <Editor
        autoCorrect={false}
        spellCheck={false}
        value={this.state.editorValue}
        onFocus={this.handleEditorFocus}
        onKeyDown={this.handleEditorKeyDown}
        onChange={this.handleEditorChange}
        renderNode={this.handleRenderNode}
        className={`caret-position caret-position-${caretPosition}`}
      />
    );
  }
}

export default EditorData;
