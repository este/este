import Component from '../components/component.react';
import React from 'react';
import {FormattedHTMLMessage} from 'react-intl';

class ToCheckItem extends Component {

  render() {
    return (
      <li>
        <FormattedHTMLMessage message={this.props.item.get('txt')} />
      </li>
    );
  }

}

ToCheckItem.propTypes = {
  item: React.PropTypes.object.isRequired
};

export default ToCheckItem;
