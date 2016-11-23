import React, { PropTypes as RPT, PureComponent as Component } from 'react';
import OrderDetail from './OrderDetail';
import { connect } from 'react-redux';
import { onFieldChange, incrementSeats, decrementSeats, seatToggle } from '../../common/app/actions';
import { Input, Button, ButtonOutline, PageHeader } from 'rebass';
import { Link } from 'react-router';

@connect(state => ({
  email: state.app.getIn(['fields', 'email']),
  isLoggedIn: state.app.get('isLoggedIn')
}), { incrementSeats, decrementSeats, seatToggle, onFieldChange })
export default class Reservation extends Component {

  static propTypes = {
    email: RPT.string,
    isLoggedIn: RPT.bool,
    onFieldChange: RPT.func.isRequired
  }

  onFieldChange(e) {
    const { onFieldChange } = this.props;
    const { name, value } = e.target;
    onFieldChange(name, value);
  }

  render() {
    const { email, isLoggedIn } = this.props;
    return (
      <div style={style}>
        <PageHeader
          heading="Souhrn objednávky"
        />
        {isLoggedIn
          ? <p>Jste přihlášen jako XYZ</p>
          : (
            <div>
              <p>Máte u nás účet? <ButtonOutline><Link to="/login">Přihlásit se můžete zde</Link></ButtonOutline></p>
              <p>Nebo pro dokončení objednávky zadejte e-mail:</p>
              <Input name="email" onChange={(e) => this.onFieldChange(e)} label="E-mail:" value={email} />
            </div>
            )}
        <OrderDetail />
        <Button><Link to="/reservation/success">Rezervovat</Link></Button>
        <Button><Link to="/reservation/success">Kartou ihned</Link></Button>
      </div>
    );
  }
}

const style = {
};
