import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import { connect } from 'react-redux';

class Footer extends Component {

  static propTypes = {
    msg: PropTypes.object.isRequired
  };

  render() {
    const { msg } = this.props;

    return (
      <footer>
        <p>
          <FormattedHTMLMessage defaultMessage={msg.madeByHtml} />
        </p>
      </footer>
    );
  }

}

export default connect(state => ({
  msg: state.intl.msg.app.footer
}))(Footer);
