// @flow
import Page from '../components/page';

const About = () => (
  <Page title="About">
    <div>about</div>
  </Page>
);

About.getInitialProps = async () =>
  new Promise(resolve => {
    setTimeout(() => resolve({ mrtka: 123 }), 2000);
  });

export default About;
