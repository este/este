import Component from '../components/component.react';
import React from 'react';


export default class TodoPage extends Component {

  render() {

    return (
      <div>
        {this.props.params.id}
      </div>
    );
  }

}
