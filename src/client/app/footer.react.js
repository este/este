import Component from '../components/component.react';
import React from 'react';
import {FormattedHTMLMessage} from 'react-intl';

export default class Footer extends Component {

  static propTypes = {
    msg: React.PropTypes.object.isRequired
  }

  render() {
    const {msg: {app: {footer}}} = this.props;

    return (
      <footer>
        <p>
          <FormattedHTMLMessage message={footer.madeByHtml} />
        </p>
      </footer>
    );
  }

}
