// @flow
import Page from '../components/page';
import type { State } from '../types';
import withData from '../lib/with-data';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { setAppOnline } from '../lib/app/actions';

type IndexProps = {
  online: boolean,
  setAppOnline: typeof setAppOnline,
};

const Index = ({ online, setAppOnline }: IndexProps) => (
  <Page title="Home">
    <h1>Este Next</h1>
    <b>{online.toString()}</b>
    <button onClick={() => setAppOnline(!online)}>toggle</button>
    <p>Playground</p>
    <img alt="static asset example" src="/static/50x50.png" />
  </Page>
);

export default compose(
  withData,
  connect(
    (state: State) => ({
      online: state.app.online,
    }),
    { setAppOnline }
  )
)(Index);
