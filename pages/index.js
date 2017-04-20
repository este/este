// @flow
import type { State } from '../types';
import Box from '../components/box';
// import Heading from '../components/heading';
import Page from '../components/page';
import Text from '../components/text';
import ToggleBaseline from '../components/toggle-baseline';
import app from '../lib/app';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { setAppOnline } from '../lib/app/actions';

type IndexProps = {
  appVersion: string,
  online: boolean,
  setAppOnline: typeof setAppOnline,
};

const Index = ({ appVersion, online, setAppOnline }: IndexProps) => (
  <Page title="Home">
    {/* <Heading>Este Next je</Heading> */}
    <Text>normal text</Text>
    <Text size={-1}>small text</Text>
    <Text size={5}>text 5</Text>
    <Text>
      Text is container, except <Text color="primary">inner</Text> Text.
      Just like in React Native.
    </Text>
    <Text color="warning">{online.toString()}</Text>
    <Text>appVersion: {appVersion.toString()}</Text>
    <Box margin={1}>
      <Text>Box</Text>
    </Box>
    <Box flexDirection="row">
      <button onClick={() => setAppOnline(!online)}>toggle</button>
    </Box>
    <ToggleBaseline />
    {/* <List /> */}
    {/* <Box margin={2}>
      <img alt="static asset example" src="/static/50x50.png" />
    </Box> */}
  </Page>
);

export default compose(
  app,
  connect(
    (state: State) => ({
      appVersion: state.app.version,
      online: state.app.online,
    }),
    { setAppOnline }
  )
)(Index);
