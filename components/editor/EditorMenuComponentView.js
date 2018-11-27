// @flow
import React, { type Node, useState, useMemo } from 'react';
import useTheme from '../../hooks/useTheme';
import { TextInput, View, StyleSheet } from 'react-native';
import useEscapeFix from '../../hooks/useEscapeFix';
import { type Components } from './Editor';
import * as validate from '../../validate';
import ErrorMessage from '../core/ErrorMessage';
import { update } from 'ramda';

const styles = StyleSheet.create({
  view: {
    flexDirection: 'column',
  },
});

export default function EditorMenuComponentView({
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
  // It would be better to pass just one component, but we don't have generated
  // type for item, only for array, and I don't want to manually write it.
  // Maybe it's possible to extract type Component via Flow utility types. Idk.
  const component = useMemo(() => components.find(c => c.id === componentId), [
    components,
    componentId,
  ]);
  const [state, setState] = useState(() => {
    if (!component || !component.props) return null;
    // TODO: Use current node prop for initial values.
    return component.props.map(prop => {
      return { ...prop, value: '', error: null };
    });
  });

  if (!state) return null;

  function validateProp(prop) {
    switch (prop.type) {
      case 'BOOLEAN':
        return null;
      case 'NUMBER':
        return null;
      case 'STRING':
        return null;
      case 'VIEW_STYLE':
        return null;
      case 'TEXT_STYLE':
        return null;
      case 'URL': {
        return validate.url(prop.value);
      }
      default:
        // eslint-disable-next-line no-unused-expressions
        (prop.type: empty);
        return null;
    }
  }

  function handleSubmitEditing() {
    let hasError = false;
    const newState = state.map(prop => {
      const error = validateProp(prop);
      if (error != null) hasError = true;
      return { ...prop, error };
    });
    setState(newState);
    // eslint-disable-next-line no-useless-return
    if (hasError) return;
  }

  let textInputFocused = false;

  return (
    <View style={styles.view}>
      {state.map((prop, index) => {
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
              <React.Fragment key={prop.id}>
                <TextInput
                  autoFocus={autoFocus}
                  onFocus={escapeFixHandleFocus}
                  onBlur={escapeFixHandleBlur}
                  keyboardType="url"
                  style={theme.styles.editorMenuTextInput}
                  onChangeText={text => {
                    setState(update(index, { ...prop, value: text }, state));
                  }}
                  value={prop.value}
                  onSubmitEditing={handleSubmitEditing}
                  placeholder={`${prop.name}`}
                  blurOnSubmit={false}
                  key={prop.id}
                />
                <View style={theme.styles.editorMenuError}>
                  <ErrorMessage size={-1} error={prop.error} />
                </View>
              </React.Fragment>
            );
          }
          default:
            // eslint-disable-next-line no-unused-expressions
            (prop.type: empty);
            return null;
        }
      })}
    </View>
  );
}
