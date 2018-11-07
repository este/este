// @flow
// $FlowFixMe
import React, { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import useTheme from '../core/useTheme';
import Button from '../core/Button';
import Row from '../core/Row';
import withRovingTabIndex from '../core/withRovingTabIndex';
import EditorBreadcrumbOutline from './EditorBreadcrumbOutline';

function EditorBreadcrumbButton({
  onPress,
  label,
  isActive,
}: {|
  onPress: () => void,
  label: string,
  isActive?: boolean,
|}) {
  return (
    <Button onPress={onPress} color={isActive === true ? 'primary' : 'gray'}>
      {label}
    </Button>
  );
}

const styles = StyleSheet.create({
  breadcrumb: {
    // RNW does not support position fixed style, because it's a workaround.
    // https://github.com/este/este/issues/1584
    // $FlowFixMe
    position: 'fixed',
  },
  bottom: { bottom: 0 },
  top: { top: 0 },
});

function EditorBreadcrumb({
  value,
  stylesById,
}: {|
  value: Object,
  stylesById: Object,
|}) {
  const theme = useTheme();
  const [kebabMenuVisible, setKebabMenuVisible] = useState(false);
  const [breadcrumbPosition, setBreadcrumbPosition] = useState('bottom');
  const [activeIndex, setActiveIndex] = useState(null);
  const ancestors = useMemo(
    () =>
      value.document
        .getAncestors(value.selection.focus.path)
        // Remove first item (Slate document). We don't use it.
        .shift(),
    [value.document, value.selection.focus.path],
  );
  const row = useMemo(
    () => (
      <Row rhythm={0.5} wrap>
        <EditorBreadcrumbButton
          label="⋮"
          isActive={kebabMenuVisible}
          onPress={() => setKebabMenuVisible(!kebabMenuVisible)}
        />
        {kebabMenuVisible ? (
          <EditorBreadcrumbButton
            label={breadcrumbPosition === 'bottom' ? '↑' : '↓'}
            onPress={() =>
              setBreadcrumbPosition(
                breadcrumbPosition === 'bottom' ? 'top' : 'bottom',
              )
            }
          />
        ) : (
          ancestors.map((node, index) => {
            return (
              <EditorBreadcrumbButton
                key={node.key}
                label={stylesById[node.type].name}
                isActive={activeIndex === index}
                onPress={() => {
                  setActiveIndex(activeIndex === index ? null : index);
                }}
              />
            );
          })
        )}
      </Row>
    ),
    [
      kebabMenuVisible,
      breadcrumbPosition,
      activeIndex,
      // ancestors,
      ancestors.map(({ key, type }) => `${key}-${type}`).join(),
    ],
  );
  const activeAncestor = ancestors.get(activeIndex);

  return (
    <View
      style={[
        theme.styles.editorBreadcrumb,
        styles.breadcrumb,
        styles[breadcrumbPosition],
      ]}
    >
      {row}
      {activeAncestor && <EditorBreadcrumbOutline node={activeAncestor} />}
    </View>
  );
}

export default withRovingTabIndex(EditorBreadcrumb);
