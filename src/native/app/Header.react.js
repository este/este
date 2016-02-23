import Component from 'react-pure-render/component';
import React from 'react-native';

const {
  Image, PropTypes, StyleSheet, Text, TouchableOpacity, View
} = React;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#31AACC',
    borderBottomColor: '#73CEE7',
    borderBottomWidth: 2,
    height: 70,
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 30,
    position: 'relative'
  },
  header: {
    color: '#fff',
    fontSize: 20
  },
  menuIcon: {
    backgroundColor: 'transparent',
    height: 24,
    width: 24
  },
  menuLink: {
    backgroundColor: 'transparent',
    height: 44,
    left: 8,
    opacity: 0.9,
    padding: 10,
    position: 'absolute',
    top: 25,
    width: 44
  }
});

export default class Header extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    toggleSideMenu: PropTypes.func.isRequired
  };

  render() {
    const { title, toggleSideMenu } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={.8}
          onPress={toggleSideMenu}
          style={styles.menuLink}
        >
          <Image
            source={require('./img/MenuIcon.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <Text style={styles.header}>{title}</Text>
      </View>
    );
  }

}
