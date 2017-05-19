// @flow
import A from '../components/a';
import Blockquote from '../components/blockquote';
// import Box from '../components/box';
import Button from '../components/button';
import Fieldset from '../components/fieldset';
import Heading from '../components/heading';
import Image from '../components/image';
import Link from '../components/link';
import P from '../components/p';
import Page from '../components/page';
import PostList from '../components/post-list';
import Text from '../components/text';
import ToggleBaseline from '../components/toggle-baseline';
import ToggleDark from '../components/toggle-dark';
import app from '../components/app';

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
  {}
);

const Index = () => (
  <Page title="Este">
    <Heading size={3}>Este</Heading>
    <P>
      Starter kit for universal full–fledged React apps.
    </P>
    <P>
      {/* Styled text link. */}
      <A href="https://github.com/este/este">github.com/este/este</A>
    </P>
    {/* Just link, no styles. */}
    <Link href="https://mises.org/library/anatomy-state">
      <Image
        alt="50x50 placeholder"
        marginBottom={1}
        size={{ height: 50, width: 50 }}
        src="/static/50x50.png"
      />
    </Link>
    <Text>normal text</Text>
    <Text size={-1}>small text</Text>
    <P size={5}>text 5</P>
    <Blockquote
      source="Friedrich Hayek"
      href="https://en.wikipedia.org/wiki/Friedrich_Hayek"
    >
      The curious task of economics is to demonstrate to men how little they
      really know about what they imagine they can design.
    </Blockquote>
    <Fieldset>
      <Button primary onPress={onButtonPress.primary}>Primary</Button>
      <Button success onPress={onButtonPress.success}>Success</Button>
      <Button warning onPress={onButtonPress.warning}>Warning</Button>
      <Button danger onPress={onButtonPress.danger}>Danger</Button>
      <Button primary disabled onPress={() => {}}>Disabled</Button>
      <Button onPress={onButtonPress.text}>Text</Button>
    </Fieldset>
    <Fieldset>
      <ToggleBaseline />
      <ToggleDark />
    </Fieldset>
    <PostList />
  </Page>
);

export default app(Index);
