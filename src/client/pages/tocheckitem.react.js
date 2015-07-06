import Component from '../components/component.react';
import React from 'react';
import {FormattedHTMLMessage} from 'react-intl';

class ToCheckItem extends Component {

  static propTypes = {
    item: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <li>
        <FormattedHTMLMessage message={this.props.item.get('txt')} />
      </li>
    );
  }

}

export default ToCheckItem;
