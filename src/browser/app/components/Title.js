/* @flow */
import Helmet from 'react-helmet';
import React from 'react';

const Title = ({ message }: any) =>
  <Helmet title={message} />;

Title.propTypes = {
  message: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.string,
  ]).isRequired,
  values: React.PropTypes.object,
};

export default Title;
