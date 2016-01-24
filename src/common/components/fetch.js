import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';

export default function fetch(...actions) {
  return Wrapped => class Fetch extends Component {

    static propTypes = {
      dispatch: PropTypes.func,
      location: PropTypes.object,
      params: PropTypes.object
    };

    // For server side fetching. Check src/server/frontend/render.js.
    static fetchActions = actions;

    componentDidMount() {
      const {dispatch, location, params} = this.props;

      actions.forEach(action =>
        dispatch(action({location, params}))
      );
    }

    // // TODO: Fetch if last location pathname has changed.
    // key?
    // componentWillReceiveProps(nextProps) {
    // }

    render() {
      return <Wrapped {...this.props} />;
    }

  };
}
