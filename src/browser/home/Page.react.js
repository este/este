import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';
import {FormattedHTMLMessage} from 'react-intl';
import {Link} from 'react-router';
import {connect} from 'react-redux';

class Page extends Component {

  static propTypes = {
    msg: PropTypes.object.isRequired
  };

  render() {
    const {msg} = this.props;

    return (
      <div className="home-page">
        <Helmet title={msg.title} />
        <p>
          <FormattedHTMLMessage defaultMessage={msg.infoHtml} />
        </p>
        <div className="tocheck">
          <h2>{msg.toCheck.h2}</h2>
          {/* Note require usage for image source. Very useful for CDN. */}
          <img alt="50x50 placeholder" src={require('./50x50.png')} />
          <ul>
            {msg.toCheck.list.map(({key, text}) =>
              <li key={key}>
                <FormattedHTMLMessage defaultMessage={text} />
              </li>
            )}
            <li>
              {msg.toCheck.isomorphicPage}{' '}
              <Link to="/this-is-not-the-web-page-you-are-looking-for">404</Link>
            </li>
            <li>
              {msg.toCheck.andMuchMore}
            </li>
          </ul>
        </div>
      </div>
    );
  }

}

Page = connect(state => ({
  msg: state.intl.msg.home
}))(Page);

export default Page;
