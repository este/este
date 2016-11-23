import React, { PropTypes as RPT, PureComponent as Component } from 'react';
import OrderDetail from './OrderDetail';
import { connect } from 'react-redux';
import { incrementSeats, decrementSeats, seatToggle } from '../../common/app/actions';
import { PageHeader } from 'rebass';

@connect(state => ({
  isLoggedIn: state.app.get('isLoggedIn'),
  email: state.app.getIn(['fields', 'email'])
}), { incrementSeats, decrementSeats, seatToggle })
export default class Reservation extends Component {

  static propTypes = {
    email: RPT.string,
    isLoggedIn: RPT.bool
  }

  render() {
    const { email, isLoggedIn } = this.props;
    return (
      <div style={style}>
        <PageHeader
          heading="Objednávka dokončena"
        />
        <p>Objednávka č. 234232342 byla úspěšně dokončena. Na Váš e-mail ({email}) Vám byly odeslány všechny informace, které uvidíte níže. V e-mailu navíc najdete odkazy pro úpravu či zrušení objednávky.</p>
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
