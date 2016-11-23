import React, { PropTypes as RPT, PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { incrementSeats, decrementSeats, seatToggle } from '../../common/app/actions';
import { Map } from 'immutable';

@connect(state => ({
  selectedSeats: state.app.get('selectedSeats'),
  isLoggedIn: state.app.get('isLoggedIn')
}), { incrementSeats, decrementSeats, seatToggle })
export default class Reservation extends Component {

  static propTypes = {
    selectedSeats: RPT.object
  }

  render() {
    // TODO: make dynamic
    const { selectedSeats } = this.props;
    const filteredSeats = selectedSeats
        .reduce((prev, row, key) => prev.set(key, row.filter(s => s && s !== 'taken')), new Map())
        .filter(r => r.size > 0);
    const seats = filteredSeats.reduce((prev, r, key) => `${prev} ${String.fromCharCode(97 + parseInt(key, 10)).toUpperCase()}${r.reduce((prev2, s, key2) => s === 'taken' ? prev2 : `${prev2} ${key2}`, '')}`, '');
    return (
      <div style={style}>
        <ul>
          <li>Film: Název filmu</li>
          <li>Kino: CineStar Anděl</li>
          <li>Datum: 11.12.2016</li>
          <li>Sedadla: {seats}</li>
        </ul>
      </div>
    );
  }
}

const style = {
};
