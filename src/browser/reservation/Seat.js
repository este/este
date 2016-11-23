import React, { PropTypes as RPT, PureComponent as Component } from 'react';

export default class Seat extends Component {

  static propTypes = {
    onChange: RPT.func.isRequired,
    number: RPT.number.isRequired,
    selected: RPT.bool,
    taken: RPT.bool
  }

  render() {
    const { number, selected, onChange, taken } = this.props;
    const styles = style(selected);
    const seatStyle = taken ? { ...styles.seat, ...styles.taken } : styles.seat;
    return (
      <div style={seatStyle} onClick={onChange}>
        <span style={styles.number}>{number}</span>
      </div>
    );
  }
}

const style = (picked) => ({
  seat: {
    width: '10px',
    height: '10px',
    marginTop: '3px',
    marginLeft: '3px',
    backgroundColor: 'red',
    backgroundImage: picked ? 'url(/assets/img/face.png)' : '',
    backgroundSize: 'cover',
    float: 'left',
    zIndex: 99999999,
    fontSize: '6px',
    cursor: 'pointer'
  },
  number: {
    cursor: 'pointer'
  },
  taken: {
    backgroundColor: 'grey',
  }
});
