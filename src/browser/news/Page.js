import React, { PropTypes as RPT, PureComponent as Component } from 'react';

export default class News extends Component {

  static propTypes = {
    toggleMenu: RPT.func.isRequired
  }

  render() {
    return (
      <div style={style}>
        Novinky
      </div>
    );
  }
}

const style = {
};
