// @flow
import type { State } from '../types';
import List from '../components/list';
import Page from '../components/page';
import Text from '../components/text';
import app from '../lib/app';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { setAppOnline } from '../lib/actions/app';

type IndexProps = {
  online: boolean,
  setAppOnline: typeof setAppOnline,
};

const Index = ({ online, setAppOnline }: IndexProps) => (
  <Page title="Home">
    <h1>Este Next je</h1>
    <Text>{online.toString()}</Text>
    <button onClick={() => setAppOnline(!online)}>toggle</button>
    <List />
    <Text>Playground</Text>
    <img alt="static asset example" src="/static/50x50.png" />
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
