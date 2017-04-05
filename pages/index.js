// @flow
import type { State } from '../types';
import Page from '../components/page';
import app from '../lib/app';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { setAppOnline } from '../lib/actions/app';

import List from '../components/list';
import { createComponent } from 'react-fela';

const title = ({ size }) => ({
  fontSize: `${size}px`,
  color: '#228ae6',
});
const Title = createComponent(title, 'h1');

type IndexProps = {
  online: boolean,
  setAppOnline: typeof setAppOnline,
};

const Index = ({ online, setAppOnline }: IndexProps) => (
  <Page title="Home">
    <Title size={30}>Este Next</Title>
    <b>{online.toString()}</b>
    <button onClick={() => setAppOnline(!online)}>toggle</button>
    <List />
    <p>Playground</p>
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
