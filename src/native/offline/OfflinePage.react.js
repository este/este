import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import { CenteredContainer, Text } from '../app/components';
import { connect } from 'react-redux';

class OfflinePage extends Component {

  static propTypes = {
    online: PropTypes.bool.isRequired,
  };

  render() {
    const { online } = this.props;

    return (
      <CenteredContainer>
        <Text>state.app.online: {online.toString()}</Text>
      </CenteredContainer>
    );
  }

}

export default connect(state => ({
  online: state.app.online,
}))(OfflinePage);
