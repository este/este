// @flow
import type { Intl } from '../../../common/types';
import Helmet from 'react-helmet';
import React from 'react';
import { injectIntl } from 'react-intl';

type TitleProps = {|
  intl: Intl,
  message: string | Object,
  values?: Object,
|};

const Title = ({ intl, message, values }: TitleProps) => (
  typeof message === 'string' ?
    <Helmet title={message} />
  :
    <Helmet title={intl.formatMessage(message, values)} />
);

export default injectIntl(Title);
