import React, { Component } from 'react';
import { CenteredContainer, Text } from '../app/components';
import { Platform } from 'react-native';

export default class HomePage extends Component {

  render() {
    return (
      <CenteredContainer>
        <Text style={{ textAlign: 'center' }}>
          {Platform.select({
            android: `
              Este App
              Double tap R on your keyboard to reload
              Shake or press menu button for dev menu
            `,
            ios: `
              Este App
              Press CMD+R to reload
              Press CMD+D for debug menu
            `,
          })}
        </Text>
      </CenteredContainer>
    );
  }

}
