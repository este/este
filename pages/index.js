// @flow
import Page from '../components/page';
import withData from '../lib/with-data';

const Index = () => (
  <Page title="Home">
    <h1>Este Next</h1>
    <p>Playground</p>
    <img alt="static asset example" src="/static/50x50.png" />
  </Page>
);

// TODO: Connect example.
export default withData(Index);
