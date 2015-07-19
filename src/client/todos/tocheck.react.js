import Component from '../components/component.react';
import React from 'react';
import {FormattedHTMLMessage} from 'react-intl';
import {Link} from 'react-router';

export default class ToCheck extends Component {

  static propTypes = {
    msg: React.PropTypes.object.isRequired
  }

  render() {
    const {msg} = this.props;

    return (
      <div className="tocheck">
        <h3>{msg.header}</h3>
        <ul>
          {msg.itemListHtml.map(item =>
            <li key={item.key}>
              <FormattedHTMLMessage message={item.txt} />
            </li>
          )}
          <li>
            {msg.isomorphicPage}{' '}
            <Link to="/this-is-not-the-web-page-you-are-looking-for">404</Link>.
          </li>
          <li>
            {msg.andMuchMore}
          </li>
        </ul>
      </div>
    );
  }

}
