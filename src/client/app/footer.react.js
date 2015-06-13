import Component from '../components/component.react';
import React from 'react';
import {FormattedHTMLMessage} from 'react-intl';
import {msg} from '../intl/store';

class Footer extends Component {

  render() {
    return (
      <footer>
        <p>
          <FormattedHTMLMessage message={msg('app.madeByHtml')} />
        </p>
      </footer>
    );
  }

}

export default Footer;
