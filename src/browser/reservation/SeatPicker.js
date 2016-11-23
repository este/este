import React, { PropTypes as RPT, PureComponent as Component } from 'react';
import Seat from './Seat';
import { connect } from 'react-redux';
import { fetchCinema } from '../../common/api/actions';
import { seatToggle } from '../../common/app/actions';
import { PinchView } from '../lib/react-pinch-zoom-pan';
import { Range, Map } from 'immutable';

@connect(state => ({
  cinema: state.api.getIn(['cinema', 'data']),
  maxSeats: state.app.get('maxSeats'),
  selectedSeats: state.app.get('selectedSeats')
}), { fetchCinema, seatToggle })
export default class SeatPicker extends Component {

  static propTypes = {
    cinema: RPT.object,
    fetchCinema: RPT.func.isRequired,
    seatToggle: RPT.func.isRequired,
    selectedSeats: RPT.object,
    maxSeats: RPT.number
  }

  componentDidMount() {
    const { fetchCinema } = this.props;
    fetchCinema(0, 0, 0);
  }

  getSelectedSeatsCount() {
    const { selectedSeats } = this.props;
    return selectedSeats.reduce((prev, row) => prev + row.filter(s => s && s !== 'taken').size, 0);
  }

  toggleSeat(row, seat, isSelected) {
    const { seatToggle, selectedSeats, maxSeats } = this.props;
    const selectedSeatsCount = this.getSelectedSeatsCount();
    if (selectedSeatsCount === maxSeats && !isSelected) {
      const filteredSeats = selectedSeats
        .reduce((prev, row, key) => prev.set(key, row.filter(s => s && s !== 'taken')), new Map())
        .filter(r => r.size > 0);
      const selectedRow = filteredSeats.keySeq().first();
      const selectedSeat = filteredSeats.get(selectedRow.toString()).keySeq().first();
      seatToggle(selectedRow, selectedSeat);
    }
    seatToggle(row, seat);
  }

  renderSeat(row, seat) {
    const { selectedSeats } = this.props;

    const isSelected = selectedSeats.getIn([row.toString(), seat.toString()]);

    return (
      <Seat number={seat} onChange={() => this.toggleSeat(row, seat, !!isSelected)} selected={!!isSelected} taken={isSelected === 'taken'} />
    );
  }

  renderRow(idx) {
    const { cinema } = this.props;

    return (
      <div style={style.row}>
        <div style={style.rowNumberBefore}>{String.fromCharCode(97 + idx).toUpperCase()}</div>
        <div style={style.seatWrapper}>
          {Range(0, cinema.get('seatsPerRow')).map(s => this.renderSeat(idx, s + 1))}
        </div>
        <div style={style.rowNumberAfter}>{String.fromCharCode(97 + idx).toUpperCase()}</div>
      </div>
    );
  }

  render() {
    const { cinema } = this.props;

    if (!cinema) return null;

    return (
      <PinchView bmaxScale={4} containerRatio={((400 / 600) * 100)}>
        <div>
          {Range(0, cinema.get('rows')).map(r => this.renderRow(r))}
        </div>
      </PinchView>
    );
  }
}

const style = {
  row: {
    clear: 'both',
    width: '100%',
    pointerEvents: 'none',
  },
  rowNumberBefore: {
    pointerEvents: 'none',
    float: 'left',
    fontSize: '10px',
    width: '10px',
    marginLeft: '10px'
  },
  rowNumberAfter: {
    pointerEvents: 'none',
    float: 'left',
    fontSize: '10px',
    width: '10px',
    marginLeft: '10px'
  },
  seatWrapper: {
    float: 'left',
    pointerEvents: 'all',
  }
};
