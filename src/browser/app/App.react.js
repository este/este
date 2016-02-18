import './App.scss';
import Component from 'react-pure-render/component';
import Footer from './Footer.react';
import Header from './Header.react';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {onAppComponentDidMount} from '../../common/app/actions';

class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
  };

  // Note pattern how actions related to app start are dispatched.
  // componentDidMount is not called in ReactDOMServer.renderToString, so it's
  // the right place to dispatch client only (e.g. Firebase) actions.
  // Firebase can be used on the server as well, but it's over of this example.
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(onAppComponentDidMount());
  }

  render() {
    const {children, location} = this.props;

    return (
      // Pass data-pathname to allow route specific styling.
      <div className="page" data-pathname={location.pathname}>
        <Helmet
          link={[
            {rel: 'shortcut icon', href: require('./favicon.ico')}
          ]}
          meta={[{
            name: 'description',
            content: 'Dev stack and starter kit for functional and universal React web apps'
          }]}
          titleTemplate="%s - Este.js"
        />
        <Header
          // TODO: Use react-router-redux, then connect location.
          pathname={location.pathname}
        />
        {children}
        <Footer />
      </div>
    );
  }

}

// Just inject dispatch and don't listen to store.
export default connect()(App);
