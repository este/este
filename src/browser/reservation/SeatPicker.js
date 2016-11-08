import React, { PropTypes as RPT, PureComponent as Component } from 'react';
import Seat from './Seat';
import { connect } from 'react-redux';
import { fetchCinema } from '../../common/api/actions';
import { PinchView } from '../lib/react-pinch-zoom-pan';
import { Range } from 'immutable';

@connect(state => ({
  cinema: state.api.getIn(['cinema', 'data'])
}), { fetchCinema })
export default class SeatPicker extends Component {

  static propTypes = {
    cinema: RPT.object,
    fetchCinema: RPT.func.isRequired
  }

  componentDidMount() {
    const { fetchCinema } = this.props;
    fetchCinema(0, 0, 0);
  }

  renderRow(idx) {
    const { cinema } = this.props;

    return (
      <div style={style.row}>
        <div style={style.rowNumberBefore}>{String.fromCharCode(97 + idx)}</div>
        <div style={style.seatWrapper}>
          {Range(0, cinema.get('seatsPerRow')).map(s => <Seat number={s + 1} />)}
        </div>
        <div style={style.rowNumberAfter}>{String.fromCharCode(97 + idx)}</div>
      </div>
    );
  }

  render() {
    const { cinema } = this.props;

    if (!cinema) return null;

    return (
      <PinchView debug bmaxScale={4} containerRatio={((400 / 600) * 100)}>
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
