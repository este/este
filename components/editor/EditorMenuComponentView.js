// @flow
import React, { type Node, useState } from 'react';
import useTheme from '../../hooks/useTheme';
import { TextInput } from 'react-native';
import { useEscapeFix } from './EditorMenu';
import { type Components } from './Editor';

export default function ComponentView({
  components,
  componentId,
  onClose,
}: {|
  components: Components,
  componentId: string,
  onClose: () => void,
|}): Node {
  const theme = useTheme();
  const [escapeFixHandleFocus, escapeFixHandleBlur] = useEscapeFix(onClose);
  const [state, setState] = useState({});

  const component = components.find(c => c.id === componentId);
  if (component == null || component.props == null) return null;
  let textInputFocused = false;

  return component.props.map(prop => {
    switch (prop.type) {
      case 'BOOLEAN':
        throw Error('Not implemented yet.');
      case 'NUMBER':
        throw Error('Not implemented yet.');
      case 'STRING':
        throw Error('Not implemented yet.');
      case 'VIEW_STYLE':
        throw Error('Not implemented yet.');
      case 'TEXT_STYLE':
        return null;
      case 'URL': {
        let autoFocus = false;
        if (!textInputFocused) {
          textInputFocused = true;
          autoFocus = true;
        }
        return (
          <TextInput
            onFocus={escapeFixHandleFocus}
            onBlur={escapeFixHandleBlur}
            keyboardType="url"
            autoFocus={autoFocus}
            style={[
              theme.styles.editorMenuTextInput,
              theme.typography.fontSizeWithLineHeight(0),
            ]}
            onChangeText={text => setState({ ...state, [prop.name]: text })}
            value={state[prop.name] || ''}
            // onSubmitEditing={() => {
            //   console.log('sdf');
            // }}
            placeholder="example.com"
            blurOnSubmit={false}
            key={prop.id}
          />
        );
      }
      default:
        // eslint-disable-next-line no-unused-expressions
        (prop.type: empty);
        return null;
    }
  });
}
