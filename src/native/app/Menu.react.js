import Component from '../components/Component.react';
import MenuStyle from './Menu.style';
import React, {PropTypes, ScrollView, View, Text} from 'react-native';

export default class Menu extends Component {

  static propTypes = {
    msg: PropTypes.object.isRequired,
    onRouteChange: PropTypes.func.isRequired
  }

  render() {
    const {msg: {app: {links}}, onRouteChange} = this.props;
    const pages = ['home', 'todos'];

    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={MenuStyle.menu}
        style={MenuStyle.container}
      >
        <View>
          {pages.map(page =>
            <Text
              key={page}
              onPress={() => onRouteChange(page)}
              style={MenuStyle.item}
            >{links[page]}</Text>
          )}
        </View>
        {/* TODO: Switch language here. */}
      </ScrollView>
    );
  }

}
