import {StyleSheet} from 'react-native';

export const paragraph = {
  color: '#7C7C7C',
  fontSize: 16,
  fontFamily: 'Lato-Regular'
};

export const centered = {
  textAlign: 'center'
};

export const container = {
  flex: 1
};

export const containerWithNavbar = {
  ...container,
  marginTop: 64
};

export const paddingBottom = {
  paddingBottom: 64
};

export const centeredView = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
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
