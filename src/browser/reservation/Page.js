import React, { PropTypes as RPT, PureComponent as Component } from 'react';
import SeatPicker from './SeatPicker';
import { connect } from 'react-redux';
import { incrementSeats, decrementSeats } from '../../common/app/actions';
import { ButtonOutline, PageHeader } from 'rebass';

@connect(state => ({
  maxSeats: state.app.get('maxSeats')
}), { incrementSeats, decrementSeats })
export default class Reservation extends Component {

  static propTypes = {
    incrementSeats: RPT.func.isRequired,
    decrementSeats: RPT.func.isRequired,
    maxSeats: RPT.number
  }

  declinate(seats) {
    if (seats === 1) return 'místo';
    if (seats === 2 || seats === 3) return 'místa';
    return 'míst';
  }

  render() {
    const { maxSeats, incrementSeats, decrementSeats } = this.props;
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
          <ButtonOutline onClick={() => decrementSeats()}>Odebrat lístek</ButtonOutline>
        </div>
        <div>
          <SeatPicker />
        </div>
      </div>
    );
  }
}

const style = {
};
