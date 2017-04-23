// @flow
import Page from '../components/page';
import Text from '../components/text';
import app from '../lib/app';

const About = () => (
  <Page title="About">
    <Text>about</Text>
  </Page>
);

// About.getInitialProps = async () =>
//   new Promise(resolve => {
//     setTimeout(() => resolve({ foo: 123 }), 750);
//   });

export default app(About);
