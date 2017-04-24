// @flow
import A from '../components/a';
import Blockquote from '../components/blockquote';
import Heading from '../components/heading';
import Image from '../components/image';
import Link from '../components/link';
import P from '../components/p';
import Page from '../components/page';
import Text from '../components/text';
// import ToggleBaseline from '../components/toggle-baseline';
import app from '../lib/app';

const Index = () => (
  <Page title="Este">
    <Heading size={3}>Este</Heading>
    <P>
      Starter kit for universal full–fledged React apps.
    </P>
    <P>
      <A href="https://github.com/este/este">github.com/este/este</A>
    </P>
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
    <Text size={5} marginBottom={1}>text 5</Text>
    <Blockquote
      href="https://en.wikipedia.org/wiki/Milton_Friedman"
      source="Milton Friedman"
    >
      Most economic fallacies derive from the tendency to assume that there is
      a fixed pie, that one party can gain only at the expense of another.
    </Blockquote>
    {/* <ToggleBaseline /> */}
    {/* <List /> */}
  </Page>
);

export default app(Index);
