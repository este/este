import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

export default class NotFound extends Component {

  static propTypes = {
    msg: PropTypes.object
  };

  render() {
    const {msg: {notFound: msg}} = this.props;

    return (
      <div className="notfound-page">
        <Helmet title={msg.title} />
        <h1>{msg.header}</h1>
        <p>{msg.message}</p>
        <Link to="/">{msg.continueMessage}</Link>
      </div>
    );
  }

}
