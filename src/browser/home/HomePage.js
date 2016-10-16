/* @flow */
import React, { PropTypes as RPT, PureComponent as Component } from 'react';
import {
  PageHeader,
  Title,
  View,
} from '../app/components';
import { connect } from 'react-redux';

@connect(state => ({
  device: state.device.get('device'),
}))
export default class HomePage extends Component {
  static propTypes = {
    device: RPT.func.isRequired,
  }

  render() {
    const { device } = this.props;

    return (
      <View>
        <Title message="Cinema" />
        <PageHeader
          description={`Zařízení ${device}`}
          heading="Kinečko"
        />
      </View>
    );
  }
}
