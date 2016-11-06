import React, { PropTypes as RPT, PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'rebass';
import { login } from '../../common/app/actions';

@connect(null, { login })
export default class Login extends Component {

  static propTypes = {
    login: RPT.func.isRequired,
    toggleMenu: RPT.func.isRequired
  }

  static contextTypes = {
    router: RPT.object
  }

  login() {
    const { login } = this.props;
    const { router } = this.context;
    login();
    router.transitionTo('/');
  }

  render() {
    return (
      <div style={style}>
        <Input label="E-mail:" />
        <Input label="Heslo:" />
        <Button onClick={() => this.login()}>Přihlásit se</Button>
      </div>
    );
  }
}

const style = {
};
