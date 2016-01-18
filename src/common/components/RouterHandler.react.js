import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';

// RouterHandler is back since suggested solution via React.cloneElement sucks.
// https://github.com/rackt/react-router/blob/master/UPGRADE_GUIDE.md#routehandler
// This is just syntax sugar for react-router 1.0.0 filtering children in props.
// https://github.com/este/este/issues/535
// Note React does not validate propTypes that are specified via cloneElement.
// It is recommended to make such propTypes optional.
// https://github.com/facebook/react/issues/4494#issuecomment-125068868
export default class RouterHandler extends Component {

  static propTypes = {
    children: PropTypes.object
  };

  render() {
    const {children} = this.props;
    // No children means nothing to render.
    if (!children) return null;

    // That makes nested routes working.
    const propsForChildren = {...this.props};
    delete propsForChildren.children;

    // Delete route to prevent overwrite of correct value.
    delete propsForChildren.route;

    return React.cloneElement(children, propsForChildren);
  }

}
