import React, { PureComponent as Component } from 'react';

export default class Seat extends Component {

  state = {
    picked: false
  }

  togglePicked() {
    this.setState({ picked: !this.state.picked });
  }

  render() {
    const { picked } = this.state;

    return (
      <div style={style(picked)} onClick={() => this.togglePicked()} />
    );
  }
}

const style = (picked) => ({
  width: '20px',
  height: '20px',
  marginTop: '5px',
  marginLeft: '5px',
  backgroundColor: 'red',
  backgroundImage: picked ? 'url(/assets/img/face.png)' : '',
  backgroundSize: 'cover',
  float: 'left'
});
