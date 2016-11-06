import React, { PropTypes as RPT, PureComponent as Component } from 'react';
import Movie from './Movie';
import { connect } from 'react-redux';
import { fetchMovies } from '../../common/api/actions';

@connect(state => ({
  movies: state.api.getIn(['movies', 'data'])
}), { fetchMovies })
export default class MovieList extends Component {
  static propTypes = {
    fetchMovies: RPT.func.isRequired,
    movies: RPT.object
  }

  componentDidMount() {
    const { fetchMovies } = this.props;
    fetchMovies();
  }

  render() {
    const { movies } = this.props;
    if (!movies) return null;
    return (
      <div>
        {movies.map(m => <Movie key={m.id} {...m} />)}
      </div>
    );
  }
}
