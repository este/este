import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import styles from '../styles';
import { Text } from 'react-native';

// React Native Text component preserves spaces. This solves problem with string
// defined via ES6 template strings. It normalizes '\n    ' stuff.
const normalizeMultilineString = message => message.replace(/ +/g, ' ').trim();

export default class AppText extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    style: Text.propTypes.style,
  };

  render() {
    const { children, style } = this.props;
    return (
      <Text {...this.props} style={[styles.text, style]}>
        {typeof children === 'string'
          ? normalizeMultilineString(children)
          : children
        }
      </Text>
    );
  }

}
