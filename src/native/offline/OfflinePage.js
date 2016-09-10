/* @flow */
import React from 'react';
import { CenteredContainer, Text } from '../app/components';
import { connect } from 'react-redux';

const OfflinePage = ({ online }) => (
  <CenteredContainer>
    <Text>state.app.online: {online.toString()}</Text>
  </CenteredContainer>
);

OfflinePage.propTypes = {
  online: React.PropTypes.bool.isRequired,
};

export default connect(state => ({
  online: state.app.online,
}))(OfflinePage);
