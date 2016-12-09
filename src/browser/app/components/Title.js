/* @flow */
import Helmet from 'react-helmet';
import React from 'react';
import { FormattedMessage } from 'react-intl';

type TitleProps = {|
  message: string | Object,
  values?: Object,
|};

const Title = ({ message, values }: TitleProps) => (
  typeof message === 'string' ?
    <Helmet title={message} />
  :
    <FormattedMessage {...message} values={values}>
      {message => <Helmet title={message} /> }
    </FormattedMessage>
);

export default Title;
