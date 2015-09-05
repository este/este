import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#31AACC',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#73CEE7',
    height: 70,
    paddingTop: 30,
    paddingBottom: 10,
    position: 'relative'
  },
  header: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Lato-Light'
  },
  menuLink: {
    position: 'absolute',
    left: 8,
    top: 25,
    width: 44,
    height: 44,
    padding: 10,
    opacity: 0.9,
    backgroundColor: 'transparent'
  },
  menuIcon: {
    width: 24,
    height: 24,
    backgroundColor: 'transparent'
  }

});
