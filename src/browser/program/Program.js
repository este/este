import React, { PureComponent as Component } from 'react';
import Search from '../components/Search';
import { Title } from '../app/components';

export default class Program extends Component {
  static propTypes = {

  }

  render() {
    return (
      <div>
        <Title message="Program" />
        <p>program</p>
        <Search />
      </div>
    );
  }
}
