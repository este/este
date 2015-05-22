import Component from '../components/component.react';
import React from 'react';
import {Link} from 'react-router';
import {FormattedHTMLMessage} from 'react-intl';
import {msg, msgArray} from '../intl/store';

class ToCheckItem extends Component {

  render() {
    return (
      <li>
        <FormattedHTMLMessage message={this.props.message} />
      </li>
    );
  }

}

ToCheckItem.propTypes = {
  message: React.PropTypes.string.isRequired
};

class ToCheck extends Component {

  render() {
    return (
      <div className="tocheck">
        <h3>
          {msg('toCheck.header')}
        </h3>
        <ul>
          {msgArray('toCheck.items').map(
            (item) => <ToCheckItem key={item.key} message={item.message} />
          )}
          <li>
            {msg('toCheck.isomorphicPage')} <Link to="/this-is-not-the-web-page-you-are-looking-for">404</Link>.
          </li>
          <li>
            {msg('toCheck.andMuchMore')}
          </li>
        </ul>
      </div>
    );
  }

}

export default ToCheck;
