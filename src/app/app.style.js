import {StyleSheet} from 'react-native';

export const paragraph = {
  color: '#7C7C7C',
  fontSize: 16,
  fontFamily: 'Lato-Regular'
};

export const centered = {
  textAlign: 'center'
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  sceneView: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingTop: 40
  }
});
