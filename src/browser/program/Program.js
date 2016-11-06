import MovieList from './MovieList';
import React, { PureComponent as Component } from 'react';
import Search from '../components/Search';
import { Title } from '../app/components';

export default class Program extends Component {

  render() {
    return (
      <div>
        <Title message="Program" />
        <Search />
        <MovieList />
      </div>
    );
  }
}
