import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#f6f6f7',
    marginTop: -35,
    paddingTop: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#cdcdcd',
    position: 'relative'
  },
  leftLink: {
    position: 'absolute',
    top: 25,
    left: 25,
    color: '#007aff',
    fontSize: 17
  },
  title: {
    backgroundColor: 'transparent',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
