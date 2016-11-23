import React, { PropTypes as RPT, PureComponent as Component } from 'react';
import SeatPicker from './SeatPicker';
import { connect } from 'react-redux';
import { incrementSeats, decrementSeats, seatToggle } from '../../common/app/actions';
import { Button, ButtonOutline, PageHeader } from 'rebass';
import { Map } from 'immutable';
import { Link } from 'react-router';

@connect(state => ({
  maxSeats: state.app.get('maxSeats'),
  selectedSeats: state.app.get('selectedSeats')
}), { incrementSeats, decrementSeats, seatToggle })
export default class Reservation extends Component {

  static propTypes = {
    incrementSeats: RPT.func.isRequired,
    decrementSeats: RPT.func.isRequired,
    maxSeats: RPT.number,
    seatToggle: RPT.func.isRequired,
    selectedSeats: RPT.object
  }

  getSelectedSeatsCount() {
    const { selectedSeats } = this.props;
    return selectedSeats.reduce((prev, row) => prev + row.filter(s => s && s !== 'taken').size, 0);
  }

  declinate(seats) {
    if (seats === 1) return 'místo';
    if (seats < 5) return 'místa';
    return 'míst';
  }

  decrementSeat() {
    const { decrementSeats, seatToggle, selectedSeats, maxSeats } = this.props;
    const selectedCount = this.getSelectedSeatsCount();
    if (maxSeats > 1 && maxSeats - 1 < selectedCount) {
      const filteredSeats = selectedSeats
        .reduce((prev, row, key) => prev.set(key, row.filter(s => s && s !== 'taken')), new Map())
        .filter(r => r.size > 0);

      const selectedRow = filteredSeats.keySeq().first();
      const selectedSeat = filteredSeats.get(selectedRow.toString()).keySeq().first();
      seatToggle(selectedRow, selectedSeat);
    }
    decrementSeats();
  }

  render() {
    const { maxSeats, incrementSeats } = this.props;
    return (
      <div style={style}>
        <PageHeader
          description="Název filmu atd."
          heading="Rezervace"
        />
        <div>
          Vyberte si {maxSeats} {this.declinate(maxSeats)}
        </div>
        <div>
          <ButtonOutline onClick={() => incrementSeats()}>Přidat lístek</ButtonOutline>
          <ButtonOutline onClick={() => this.decrementSeat()}>Odebrat lístek</ButtonOutline>
        </div>
        <div>
          <SeatPicker />
        </div>
        <div>
          <Button><Link to="/reservation/confirm">Pokračovat</Link></Button>
        </div>
      </div>
    );
  }
}

const style = {
};
