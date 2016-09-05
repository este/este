/* @flow */
import Gravatar from 'react-gravatar';
import React from 'react';
import SignOut from '../auth/SignOut';
import linksMessages from '../../common/app/linksMessages';
import { Block, Image, Link, Space, Text, Title, View } from '../app/components';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

const Navbar = () => (
  <Block>
    <Link index to="/me">
      <FormattedMessage {...linksMessages.me} />
    </Link>
    <Space x={2} />
    <Link to="/me/profile">
      <FormattedMessage {...linksMessages.profile} />
    </Link>
    <Space x={2} />
    <Link to="/me/settings">
      <FormattedMessage {...linksMessages.settings} />
    </Link>
  </Block>
);

const MePage = ({ children, viewer }) => {
  const { displayName, email, photoURL } = viewer;

  return (
    <View>
      <Title message={linksMessages.me} />
      <Navbar />
      {children ||
        <View>
          <Text>{displayName}</Text>
          <Block>
            {photoURL ?
              <Image role="presentation" src={photoURL} />
            :
              <Gravatar
                default="retro"
                email={email}
                https
                rating="x"
                size={100}
              />
            }
          </Block>
          <SignOut />
        </View>
      }
    </View>
  );
};

MePage.propTypes = {
  children: React.PropTypes.object,
  viewer: React.PropTypes.object.isRequired,
};

export default connect(state => ({
  viewer: state.users.viewer,
}))(MePage);
