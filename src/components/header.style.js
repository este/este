import {StyleSheet} from 'react-native';

const menuLink = {
  height: 25,
  position: 'absolute',
  left: 15,
  top: 37,
  opacity: 0.9,
  color: '#FFFFFF',
  fontSize: 15
};

export default StyleSheet.create({
  container: {
    height: 74,
    paddingTop: 14,
    backgroundColor: '#31AACC',
    marginTop: -40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Lato-Light'
  },
  menuLink: menuLink,
  menuLinkRight: {
    ...menuLink,
    right: 15,
    left: void 0
  },
  menuIcon: {
    ...menuLink,
    width: 25,
    top: 32
  }

});
