import React, { PropTypes as RPT, PureComponent as Component } from 'react';
import { fetchUser, fetchReservations } from '../../common/api/actions';
import { connect } from 'react-redux';

@connect(state => ({
  user: state.api.getIn(['user', 'data']),
  reservations: state.api.getIn(['reservations', 'data']),
}), { fetchUser, fetchReservations })
export default class Profile extends Component {
  static propTypes = {
    fetchReservations: RPT.func.isRequired,
    fetchUser: RPT.func.isRequired,
    reservations: RPT.object,
    user: RPT.object
  }

  componentDidMount() {
    const { fetchUser, fetchReservations } = this.props;
    fetchUser();
    fetchReservations();
  }

  renderReservation(r) {
    return (<div>
      Rezervace č. {r.orderNumber} - {r.isPaid ? 'Zaplacena' : 'Nezaplacena'}
    </div>);
  }

  render() {
    const { user, reservations } = this.props;
    if (!user || !reservations) return null;

    return (
      <div style={style}>
        Moje rezervace
        <div>
          {user.get('name')} ({user.get('email')})
        </div>
        <div>
          {reservations.map(r => this.renderReservation(r))}
        </div>
      </div>
    );
  }
}

const style = {
};
