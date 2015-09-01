import {StyleSheet} from 'react-native';

const menuLink = {
  height: 25,
  position: 'absolute',
  left: 15,
  top: 34,
  opacity: 0.9
};

export default StyleSheet.create({
  container: {
    backgroundColor: '#31AACC',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#73CEE7',
    height: 60,
    position: 'relative'
  },
  header: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Lato-Light'
  },
  menuLink: {
    ...menuLink,
    fontSize: 15,
    color: '#FFFFFF'
  },
  menuIcon: {
    ...menuLink,
    width: 25,
    top: 29
  }

});
