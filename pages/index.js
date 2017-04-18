// @flow
import type { State } from '../types';
import Heading from '../components/heading';
import app from '../lib/app';
import { Page, Text, Box } from '../components';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { setAppOnline } from '../lib/app/actions';

type IndexProps = {
  online: boolean,
  setAppOnline: typeof setAppOnline,
};

const Index = ({ online, setAppOnline }: IndexProps) => (
  <Page title="Home">
    <Heading>Este Next je</Heading>
    <Text>juchu</Text>
    <Text>
      Text is container, except <Text color="primary">inner</Text> Text.
      Just like in React Native.
    </Text>
    <Text color="warning">{online.toString()}</Text>
    <button onClick={() => setAppOnline(!online)}>toggle</button>
    {/* <List /> */}
    <Box margin={2}>
      <img alt="static asset example" src="/static/50x50.png" />
    </Box>
  </Page>
);

export default compose(
  app,
  connect(
    (state: State) => ({
      online: state.app.online,
    }),
    { setAppOnline }
  )
)(Index);
