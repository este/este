import React, { PropTypes as RPT, PureComponent as Component } from 'react';
import Search from '../components/Search';
import { Title } from '../app/components';
import { connect } from 'react-redux';
import { fetchMovies } from '../../common/api/actions';

@connect(state => ({
  movies: state.api.getIn(['movies', 'data'])
}), { fetchMovies })
export default class Program extends Component {
  static propTypes = {
    fetchMovies: RPT.func.isRequired,
    movies: RPT.object
  }

  componentDidMount() {
    const { fetchMovies } = this.props;
    fetchMovies();
  }

  renderMovie(movie) {
    return <p key={movie.id}>{movie.localizedName}</p>;
  }

  render() {
    const { movies } = this.props;
    if (!movies) return null;
    return (
      <div>
        <Title message="Program" />
        {movies.map(m => this.renderMovie(m))}
        <Search />
      </div>
    );
  }
}
