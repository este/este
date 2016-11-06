import React, { PropTypes as RPT, PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from '../../common/api/actions';
import { Input } from 'rebass';

@connect(null, { fetchMovies })
export default class Search extends Component {

  static propTypes = {
    fetchMovies: RPT.func.isRequired
  }

  findMovie(e) {
    const { fetchMovies } = this.props;
    fetchMovies(e.target.value);
  }

  render() {
    return (
      <Input
        label="Najít film:"
        name="search"
        onInput={(e) => this.findMovie(e)}
        placeholder="Hledat..."
      />
    );
  }
}

