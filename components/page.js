// @flow
import Baseline from '../components/baseline';
import Box from './box';
import Head from 'next/head';
import Header from './header';
import LoadingBar from '../components/loading-bar';

type PageProps = {|
  children?: any,
  title: string,
|};

// const Container = ({ children }: ContainerProps) => (
//   <Box
//     margin="auto"
//     paddingHorizontal={1}
//     style={theme => ({
//       maxWidth: theme.container.maxWidths.big,
//       minHeight: '100vh', // make footer sticky
//     })}
//   >
//     {children}
//   </Box>
// );

const Container = ({ children }) => (
  <Box
    margin="auto"
    paddingHorizontal={1}
    style={theme => ({
      // margin: 'auto',
      // paddingHorizontal: 1,
      // TODO: Tohle je spatne. browserStyle na anyStyle,
      // a tyhle dve props muzu nastavit jako props, a z theme, tak.
      // respektive, jedna z theme, druha natvrdo, tak.
      browserStyle: {
        // maxWidth: theme.container.maxWidths.big,
        maxWidth: 960,
        minHeight: '100vh', // make footer sticky
      },
    })}
  >
    {children}
  </Box>
);

const Page = ({ children, title }: PageProps) => (
  <Box>
    <Head>
      <title>{title}</title>
    </Head>
    <Baseline>
      <LoadingBar />
      <Container>
        <Header />
        {children}
      </Container>
    </Baseline>
  </Box>
);

export default Page;
