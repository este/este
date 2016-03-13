import './App.scss';
import Component from 'react-pure-render/component';
import Footer from './Footer.react';
import Header from './Header.react';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import start from '../../common/app/start';

class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  render() {
    const { children, location } = this.props;

    return (
      <div className="page">
        <Helmet
          link={[
            { rel: 'shortcut icon', href: require('./favicon.ico') }
          ]}
          meta={[{
            name: 'description',
            content: 'Dev stack and starter kit for functional and universal React web apps'
          }]}
          titleTemplate="%s - Este.js"
        />
        {/* Pass location to ensure header active links are updated. */}
        <Header location={location} />
        {children}
        <Footer />
      </div>
    );
  }

}

export default start(App);
