import Component from '../components/component.react';
import React from 'react';
import {FormattedHTMLMessage} from 'react-intl';

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

export default ToCheckItem;
