import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40
  },
  noTodosText: {
    fontFamily: 'Lato-Light',
    fontSize: 20,
    color: '#AAAAAA'
  },
  icon: {
    width: 70,
    height: 70,
    marginBottom: 10
  },
  row: {
    height: 63,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1'
  },
  container: {
    flex: 1
  },
  clearCompleted: {
    color: '#C1C1C1',
    fontFamily: 'Lato-Light',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
    paddingBottom: 15,
    paddingTop: 15
  }
});
