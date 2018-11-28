// @flow
import React, { useState, useMemo } from 'react';
import { View, TextInput, ScrollView } from 'react-native';
import useEscapeFix from '../../hooks/useEscapeFix';
import useTheme from '../../hooks/useTheme';
import {
  useEditorDispatch,
  stylesSorter,
  type EditorStyleSheets,
} from './Editor';
import { EditorMenuButton } from './EditorMenu';
import useKeyArrows from '../../hooks/useKeyArrows';

export default function EditorMenuStylesView({
  styleSheets,
  blocks,
  onClose,
  selection,
}: {
  styleSheets: EditorStyleSheets,
  blocks: Object,
  onClose: () => void,
  selection: Object,
}) {
  const dispatch = useEditorDispatch();
  const [escapeFixHandleFocus, escapeFixHandleBlur] = useEscapeFix(onClose);
  const theme = useTheme();
  const [textInputValue, setTextInputValue] = useState('');
  const styles = useMemo(
    () => {
      return Object.keys(styleSheets)
        .filter(id => styleSheets[id].isText)
        .map(id => {
          const { name } = styleSheets[id];
          return { id, name };
        })
        .sort(stylesSorter);
    },
    [styleSheets],
  );
  const handleKeyArrowsFocus = useKeyArrows([textInputValue]);

  const filteredStyles = styles.filter(style => {
    if (textInputValue.length === 0) return true;
    return style.name.startsWith(textInputValue);
  });

  function setTextStyle(styleId) {
    dispatch({ type: 'setTextStyle', styleId });
    // Key navigation is must, but it steals focus from the selection,
    // so we can't update position. But closing after key action actually
    // makes a sense.
    if (selection.isBlurred) dispatch({ type: 'moveToAnchor' });
  }

  function handleSubmitEditing() {
    if (filteredStyles.length !== 1) return;
    setTextStyle(filteredStyles[0].id);
  }

  return (
    <View onFocus={handleKeyArrowsFocus}>
      <TextInput
        autoFocus
        value={textInputValue}
        onFocus={escapeFixHandleFocus}
        onBlur={escapeFixHandleBlur}
        style={theme.styles.editorMenuTextInput}
        onChangeText={setTextInputValue}
        onSubmitEditing={handleSubmitEditing}
        placeholder="style name"
        blurOnSubmit={false}
      />
      <ScrollView
        style={theme.styles.editorMenuStylesScrollView}
        contentContainerStyle={theme.styles.editorMenuStylesContentContainer}
      >
        {filteredStyles.map(style => {
          return (
            <EditorMenuButton
              onFocus={escapeFixHandleFocus}
              onBlur={escapeFixHandleBlur}
              isActive={blocks.some(node => {
                const props = node.data.get('props');
                return props.style?.valueStyle?.id === style.id;
              })}
              onPress={() => setTextStyle(style.id)}
              key={style.id}
            >
              {style.name}
            </EditorMenuButton>
          );
        })}
      </ScrollView>
    </View>
  );
}
