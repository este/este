export default function createFetch(React, Component) {

  return function fetch(...actions) {

    return Wrapped => class Fetch extends Component {

      static propTypes = {
        dispatch: React.PropTypes.func,
        location: React.PropTypes.object,
        params: React.PropTypes.object
      };

      // This enables server side fetching.
      // Check src/server/frontend/render.js fetchComponentData function.
      static fetchActions = actions;

      // This enables client side fetching, method is called only in browser.
      componentDidMount() {
        // Dispatch is injected by react-redux.
        // React router injects location and params for every routed component.
        const {dispatch, location, params} = this.props;

        actions.forEach(action =>
          dispatch(action({location, params}))
        );
      }

      // // TODO: Fetch if last location pathname has changed.
      // componentWillReceiveProps(nextProps) {
      // }

      render() {
        return <Wrapped {...this.props} />;
      }

    };

  };

}
