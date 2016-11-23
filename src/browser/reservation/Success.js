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
          heading="Objednávka dokončena"
        />
        <p>Objednávka č. 234232342 byla úspěšně dokončena. Na zadaný e-mail Vám byly odeslány všechny informace, které uvidíte níže. V e-mailu navíc najdete odkazy pro úpravu či zrušení objednávky.</p>
        <div>
          <OrderDetail />
          QR kód níže funguje jako Vaše vstupenka. Mějte jej prosím připravený při vstupu do kina.
          <div style={style.qrcode} />
        </div>
        {!isLoggedIn && <p>Protože u nás ještě nemáte založený účet, v zadaném e-mailu naleznete odkaz, přes který se můžete jedním kliknutím zaregistrovat. Na Vašem profilu pak uvidíte všechny své objednávky a stanete se členy bonusového klubu.</p>}
      </div>
    );
  }
}

const style = {
  qrcode: {
    width: '300px',
    height: '300px',
    backgroundImage: 'url(/assets/img/qrcode.jpg)',
    backgroundSize: 'cover',
    margin: '0 auto',
    clear: 'both'
  }
};
