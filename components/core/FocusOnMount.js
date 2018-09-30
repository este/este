// @flow
import * as React from 'react';
import { View } from 'react-native';

type FocusOnMountProps = {|
  children: React.Node,
|};

// https://medium.com/@robdel12/single-page-apps-routers-are-broken-255daa310cf
class FocusOnMount extends React.PureComponent<FocusOnMountProps> {
  ref = React.createRef();

  componentDidMount() {
    const { current } = this.ref;
    if (!current) return;
    // https://github.com/necolas/react-native-web/issues/1099
    current.setNativeProps({
      tabIndex: -1,
      style: { outline: 'none' },
    });
    current.focus();
  }

  render() {
    return <View ref={this.ref}>{this.props.children}</View>;
  }
}

export default FocusOnMount;
