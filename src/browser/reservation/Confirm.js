import React, { PropTypes as RPT, PureComponent as Component } from 'react';
import OrderDetail from './OrderDetail';
import { connect } from 'react-redux';
import { incrementSeats, decrementSeats, seatToggle } from '../../common/app/actions';
import { Input, Button, ButtonOutline, PageHeader } from 'rebass';
import { Map } from 'immutable';
import { Link } from 'react-router';

@connect(state => ({
  selectedSeats: state.app.get('selectedSeats'),
  isLoggedIn: state.app.get('isLoggedIn')
}), { incrementSeats, decrementSeats, seatToggle })
export default class Reservation extends Component {

  static propTypes = {
    selectedSeats: RPT.object
  }

  render() {
    const { selectedSeats, isLoggedIn } = this.props;
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
              <Input label="E-mail:" />
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
