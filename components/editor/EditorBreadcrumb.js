// @flow
// $FlowFixMe
import React, { useState, useMemo, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import useTheme from '../../hooks/useTheme';
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
  ancestors,
  stylesById,
  componentsById,
}: {|
  ancestors: Object,
  // TODO: Type it somehow. Probably import types from Editor.
  stylesById: Object,
  componentsById: Object,
|}) {
  const theme = useTheme();
  const [kebabMenuVisible, setKebabMenuVisible] = useState(false);
  const [breadcrumbPosition, setBreadcrumbPosition] = useState('bottom');
  const [activeIndex, setActiveIndex] = useState(null);
  const row = useMemo(
    () => {
      return (
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
              const { name } = componentsById[node.type];
              function getLabel() {
                if (name !== 'View' && name !== 'Text') return name;
                const componentProps = node.data.get('props');
                const style = stylesById[componentProps.style.valueStyle.id];
                return style.name;
              }
              return (
                <EditorBreadcrumbButton
                  key={node.key}
                  label={getLabel()}
                  isActive={activeIndex === index}
                  onPress={() => {
                    setActiveIndex(activeIndex === index ? null : index);
                  }}
                />
              );
            })
          )}
        </Row>
      );
    },
    [
      kebabMenuVisible,
      breadcrumbPosition,
      activeIndex,
      // It's probably faster to render breadcrumb then check via toJSON()
      // ancestors.toJSON()
      ancestors,
      stylesById,
      componentsById,
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

export default withRovingTabIndex(memo(EditorBreadcrumb));
