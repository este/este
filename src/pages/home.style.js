import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    height: 110,
    backgroundColor: '#31AACC',
    marginTop: -40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Lato-Light'
  }
});
