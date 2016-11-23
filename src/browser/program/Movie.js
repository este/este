import moment from 'moment';
import React, { PropTypes as RPT, PureComponent as Component } from 'react';
import { ButtonOutline } from 'rebass';
import { Link } from 'react-router';

export default class Movie extends Component {
  static propTypes = {
    dates: RPT.array,
    description: RPT.string,
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
    const { dates, description, poster, originalName } = this.props;
    const { isExpanded } = this.state;

    return (
      <div style={style.wrapper}>
        <div style={posterStyle(poster)} />
        <div style={style.right}>
          <div>{originalName}</div>
          <div style={style.description}>{description}</div>
          <div style={style.dataToggle} onClick={() => this.toggleExpanded()}>{isExpanded ? 'Skrýt data' : 'Zobrazit data'}</div>
        </div>

        {isExpanded &&
          <div style={style.dates}>
            {dates.map(d => <ButtonOutline><Link to="/reservation">{moment(d.date).format('hh:mm')}</Link></ButtonOutline>)}
          </div>}
      </div>
    );
  }
}

const posterStyle = (url) => ({
  width: '20%',
  height: '100px',
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
    width: '75%',
    paddingLeft: '10px'
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
    marginLeft: '5px',
    cursor: 'pointer'
  },
  dataToggle: {
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  description: {
    fontSize: '12px'
  }
};
