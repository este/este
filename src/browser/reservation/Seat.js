import React, { PropTypes as RPT, PureComponent as Component } from 'react';

export default class Seat extends Component {

  static propTypes = {
    number: RPT.number.isRequired
  }

  state = {
    picked: false
  }

  togglePicked() {
    this.setState({ picked: !this.state.picked });
  }

  render() {
    const { number, picked } = this.state;
    const styles = style(picked);
    return (
      <div style={styles.seat} onClick={(e) => this.togglePicked(e)}>
        <span style={style.number}>{number}</span>
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
    zIndex: 99999999
  },
  number: {

  }
});
