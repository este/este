import * as reactIntl from 'react-intl';
import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import Text from './Text.react';

// Create react-intl component which work in the React Native.
// It replaces the browser span with the styleable native View.
// github.com/yahoo/react-intl/issues/119
const native = WrappedComponent =>
  class Native extends Component {

    static propTypes = {
      children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
      style: Text.propTypes.style,
    };

    render() {
      const { children, style, ...wrappedComponentProps } = this.props;
      const childrenAsFunction = typeof children === 'function';

      return (
        <WrappedComponent {...wrappedComponentProps}>
          {message => childrenAsFunction
            ? children(message)
            : <Text style={style}>{message}</Text>
          }
        </WrappedComponent>
      );
    }

  };

export const FormattedDate = native(reactIntl.FormattedDate);
export const FormattedMessage = native(reactIntl.FormattedMessage);
export const FormattedNumber = native(reactIntl.FormattedNumber);
export const FormattedPlural = native(reactIntl.FormattedPlural);
export const FormattedRelative = native(reactIntl.FormattedRelative);
export const FormattedTime = native(reactIntl.FormattedTime);
