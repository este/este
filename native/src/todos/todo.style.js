import {StyleSheet} from 'react-native';
import {paragraph} from '../app/app.style';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  input: {
    ...paragraph,
    paddingRight: 20,
    flex: 1
  },
  inputCompleted: {
    color: '#CDCDCD'
  },
  checkbox: {
    width: 30,
    height: 30,
    marginRight: 20,
    marginLeft: 20
  }
});
