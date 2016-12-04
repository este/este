/* @flow */
import type { Exact } from '../../../common/types';
import Helmet from 'react-helmet';
import React from 'react';
import { FormattedMessage } from 'react-intl';

type Props = {
  message: string | Object,
  values?: Object,
};

const Title = ({ message, values }: Exact<Props>) => (
  typeof message === 'string' ?
    <Helmet title={message} />
  :
    <FormattedMessage {...message} values={values}>
      {message => <Helmet title={message} /> }
    </FormattedMessage>
);

export default Title;
