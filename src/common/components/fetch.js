import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';

// TODO: Add example for isomorphic data fetching.
export default function fetch(action) {

  return Wrapped => class Fetch extends Component {

    static propTypes = {
      dispatch: PropTypes.func,
      location: PropTypes.object,
      params: PropTypes.object
    }

    // This allows server fetching.
    static fetchAction = action;

    componentDidMount() {
      const {dispatch, location, params} = this.props;
      dispatch(action({location, params}));
    }

    // // TODO: Fetch if last location pathname has changed.
    // componentWillReceiveProps(nextProps) {
    // }

    render() {
      return <Wrapped {...this.props} />;
    }

  };

}
