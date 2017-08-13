// @flow
import A from '../components/A';
import Blockquote from '../components/Blockquote';
import Button from '../components/Button';
import Heading from '../components/Heading';
import Image from '../components/Image';
import P from '../components/P';
import Page from '../components/Page';
import Set from '../components/Set';
import Text from '../components/Text';
import ToggleBaseline from '../components/ToggleBaseline';
import ToggleDark from '../components/ToggleDark';
import app from '../components/app';
import sitemap from '../lib/sitemap';
import { defineMessages, FormattedMessage } from 'react-intl';

const onButtonPress = [
  'primary',
  'success',
  'warning',
  'danger',
  'text',
].reduce(
  (buttons, name) => ({
    ...buttons,
    [name]: () => console.log(name), // eslint-disable-line no-console
  }),
  {},
);

export const messages = defineMessages({
  description: {
    defaultMessage: 'Starter kit for universal apps.',
    id: 'app.description',
  },
});

const Index = ({ intl, viewer }) =>
  <Page title={intl.formatMessage(sitemap.index.title)} viewer={viewer}>
    <Heading size={3}>
      {intl.formatMessage(sitemap.index.title)}
    </Heading>
    <P>
      {intl.formatMessage(messages.description)}
    </P>
    <P>
      {/* Styled text link. */}
      <A href="https://github.com/este/este">github.com/este/este</A>
    </P>
    <P>
      <Image
        alt="50x50 placeholder"
        marginBottom={1}
        // For UI images, use size prop to enforce size and vertical rhythm.
        size={{ height: 50, width: 50 }}
        // For responsive content images like photos, use relative % width.
        // width="4%"
        src="/static/50x50.png"
      />
    </P>
    <Text>
      <FormattedMessage defaultMessage="normal text" id="index.normalText" />
    </Text>
    <Text size={-1}>
      <FormattedMessage defaultMessage="small text" id="index.smallText" />
    </Text>
    <P size={5}>
      <FormattedMessage defaultMessage="text 5" id="index.text5" />
    </P>
    <Blockquote
      source="Friedrich Hayek"
      href="https://en.wikipedia.org/wiki/Friedrich_Hayek"
    >
      The curious task of economics is to demonstrate to men how little they
      really know about what they imagine they can design.
    </Blockquote>
    <Set>
      <Button primary onPress={onButtonPress.primary}>
        Primary
      </Button>
      <Button success onPress={onButtonPress.success}>
        Success
      </Button>
      <Button warning onPress={onButtonPress.warning}>
        Warning
      </Button>
      <Button danger onPress={onButtonPress.danger}>
        Danger
      </Button>
      <Button primary disabled onPress={() => {}}>
        Disabled
      </Button>
      <Button onPress={onButtonPress.text}>Text</Button>
    </Set>
    <Set>
      <ToggleBaseline />
      <ToggleDark />
    </Set>
  </Page>;

export default app(Index);
