import {StyleSheet} from 'react-native';

const menuLink = {
  height: 25,
  position: 'absolute',
  left: 15,
  top: 34,
  opacity: 0.9,
  fontSize: 15
};

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    paddingTop: 14,
    backgroundColor: '#31AACC',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#73CEE7'
  },
  containerHidden: {
    top: -64
  },
  header: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Lato-Light'
  },
  menuLink: {
    ...menuLink,
    color: '#FFFFFF'
  },
  menuLinkRight: {
    ...menuLink,
    right: 15,
    left: void 0,
    color: '#FFFFFF'
  },
  menuIcon: {
    ...menuLink,
    width: 25,
    top: 29
  }

});
