import './App.scss';
import Component from 'react-pure-render/component';
import Footer from './Footer.react';
import Header from './Header.react';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';

export default class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

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
          // TODO: Use Redux router, then connect location.
          pathname={location.pathname}
        />
        {children}
        <Footer />
      </div>
    );
  }

}
