/* @flow */
import React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Text, Link, style } from './components';

const messages = defineMessages({
  madeByHtml: {
    defaultMessage: 'Made with love by',
    id: 'footer.madeByHtml',
  },
});

const Style = style(theme => ({
  alignItems: 'center',
  borderTop: `solid 1px ${theme.border.color}`,
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: theme.sizes.big,
  paddingBottom: theme.sizes.big,
  paddingTop: theme.sizes.big,
}));

const Footer = () => (
  <Style>
    <Text size="small">
      <FormattedMessage {...messages.madeByHtml} />
    </Text>
    {'\u00a0'}
    <Link to="/"><Text size="small">steida</Text></Link>
    {/* <Link size="small" to="https://twitter.com/steida"> */}
    {/* <Link to="https://twitter.com/steida" text={{ size: 'small' }}>
      steida
    </Link> */}
  </Style>
);


// const Footer = () => (
//   <Style>
//     <Text size="small">
//       <FormattedMessage {...messages.madeByHtml} />
//     </Text>
//     {'\u00a0'}
//     {/* <Link size="small" to="https://twitter.com/steida"> */}
//     {/* <Link to="https://twitter.com/steida" text={{ size: 'small' }}>
//       steida
//     </Link> */}
//   </Style>
// );

export default Footer;
