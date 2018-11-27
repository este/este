// @flow
import React from 'react';
import { View } from 'react-native';
import useEscapeFix from '../../hooks/useEscapeFix';
import { useEditorDispatch, stylesSorter } from './Editor';
import { EditorMenuButton } from './EditorMenu';

export default function EditorMenuStylesView({
  styleSheet,
  blocks,
  onClose,
  selection,
}: {
  styleSheet: Object,
  blocks: Object,
  onClose: () => void,
  selection: Object,
}) {
  const dispatch = useEditorDispatch();
  const [escapeFixHandleFocus, escapeFixHandleBlur] = useEscapeFix(onClose);
  const styles = Object.keys(styleSheet)
    .filter(id => styleSheet[id].isText)
    .map(id => {
      const { name } = styleSheet[id];
      return { id, name };
    })
    .sort(stylesSorter);
  return (
    <View>
      <input autoFocus />
      {styles.map(style => {
        return (
          <EditorMenuButton
            onFocus={escapeFixHandleFocus}
            onBlur={escapeFixHandleBlur}
            isActive={blocks.some(node => {
              const props = node.data.get('props');
              return props.style?.valueStyle?.id === style.id;
            })}
            onPress={() => {
              dispatch({ type: 'setTextStyle', styleId: style.id });
              // Key navigation is must, but it steals focus from the selection, so we can't
              // update position. But closing after key action actually makes a sense.
              if (selection.isBlurred) dispatch({ type: 'moveToAnchor' });
            }}
            key={style.id}
          >
            {style.name}
          </EditorMenuButton>
        );
      })}
    </View>
  );
}
