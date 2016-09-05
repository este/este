/* @flow */
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { PageHeader, Pre, Title, View } from '../app/components';
import { connect } from 'react-redux';

const OfflinePage = ({ online }) => (
  <View>
    <Title message={linksMessages.offline} />
    <PageHeader heading="Offline" />
    <Pre>
      state.app.online: {online.toString()}
    </Pre>
  </View>
);

OfflinePage.propTypes = {
  online: React.PropTypes.bool.isRequired,
};

export default connect(state => ({
  online: state.app.online,
}))(OfflinePage);
