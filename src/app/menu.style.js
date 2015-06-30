import Dimensions from 'Dimensions';
import {StyleSheet} from 'react-native';

const window = Dimensions.get('window');

export default StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width * 0.7,
    height: window.height,
    backgroundColor: '#2C2C2C',
    padding: 20
  },
  item: {
    marginLeft: 5,
    fontSize: 16,
    padding: 10,
    color: '#FFFFFF',
    marginBottom: 5
  }
});
