import Component from '../components/component.react';
import React from 'react-native';
import TodoHeader from '../todos/todoheader.react';
import {
  Text,
  View
} from 'react-native';

import style from './todos.style';

class About extends Component {

  render() {
    const {navigation} = this.props;
    return (
      <View style={style.container}>
        <TodoHeader
          navigation={navigation}
        />
        <Text>Wat</Text>
      </View>
    );
  }

}

About.propTypes = {
  navigation: React.PropTypes.object.isRequired
};

export default About;
