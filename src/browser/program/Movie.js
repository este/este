import React, { PropTypes as RPT, PureComponent as Component } from 'react';

export default class Movie extends Component {
  static propTypes = {
    id: RPT.number,
    poster: RPT.string,
    localizedName: RPT.string,
    originalName: RPT.string
  }

  state = {
    isExpanded: false
  }

  toggleExpanded() {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  render() {
    const { id, poster, localizedName, originalName } = this.props;
    const { isExpanded } = this.state;

    return (
      <div key={id} onClick={() => this.toggleExpanded()}>
        <div style={posterStyle(poster)} />
        {localizedName} ({originalName})
        {isExpanded &&
          <div>
          Časy, atd...
          </div>}
      </div>
    );
  }
}

const posterStyle = (url) => ({
  width: '100px',
  height: '120px',
  background: `url('${url}') no-repeat`,
  backgroundSize: 'cover'
});
