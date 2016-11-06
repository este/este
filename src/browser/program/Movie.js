import moment from 'moment';
import React, { PropTypes as RPT, PureComponent as Component } from 'react';

export default class Movie extends Component {
  static propTypes = {
    dates: RPT.array,
    id: RPT.number,
    poster: RPT.string,
    localizedName: RPT.string,
    originalName: RPT.string
  }

  static contextTypes = {
    router: RPT.object.isRequired
  }

  state = {
    isExpanded: false
  }

  toggleExpanded() {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  startReservation() {
    const { router } = this.context;
    router.transitionTo('/reservation');
  }

  render() {
    const { dates, poster, localizedName, originalName } = this.props;
    const { isExpanded } = this.state;

    return (
      <div style={style.wrapper}>
        <div style={posterStyle(poster)} />
        <div style={style.right}>
          {localizedName} ({originalName})
          <div onClick={() => this.toggleExpanded()}>{isExpanded ? 'Skrýt data' : 'Zobrazit data'}</div>
        </div>

        {isExpanded &&
          <div style={style.dates}>
            {dates.map(d => <div onClick={() => this.startReservation()} style={style.date}>{moment(d.date).format('hh:mm')}</div>)}
          </div>}
      </div>
    );
  }
}

const posterStyle = (url) => ({
  width: '100px',
  height: '120px',
  background: `url('${url}') no-repeat`,
  backgroundSize: 'cover',
  float: 'left'
});

const style = {
  wrapper: {
    width: '100%',
    height: 'auto',
    minHeight: '130px',
    clear: 'both',
    marginTop: '20px'
  },
  right: {
    float: 'right',
    width: '300px',
  },
  dates: {
    clear: 'both',
    width: '100%',
    height: '30px',
  },
  date: {
    border: '1px solid black',
    padding: '5px',
    width: '70px',
    height: '25px',
    float: 'left',
    marginLeft: '5px'
  }
};
