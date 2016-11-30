/* @flow */
import Helmet from 'react-helmet';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const Title = ({ message, values }: any) => {
  if (typeof message === 'string') {
    return (
      <Helmet title={message} />
    );
  }
  return (
    <FormattedMessage {...message} values={values}>
      {message => <Helmet title={message} /> }
    </FormattedMessage>
  );
};

Title.propTypes = {
  message: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.string,
  ]).isRequired,
  values: React.PropTypes.object,
};

export default Title;
