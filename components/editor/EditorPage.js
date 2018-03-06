// @flow
import * as React from 'react';
import type { Web, Path } from './Editor';
import Head from 'next/head';
import Box from '../Box';
import PageBackgroundColor from '../PageBackgroundColor';
import EditorElement, { getElementKey } from './EditorElement';
import MetaViewport from '../MetaViewport';

type EditorPageProps = {|
  web: Web,
  webName: string,
  pageName: string,
  paddingBottomPx: number,
  activePath: Path,
|};

class EditorPage extends React.PureComponent<EditorPageProps> {
  render() {
    const { web, webName, pageName, paddingBottomPx, activePath } = this.props;
    return (
      <Box
        minHeight="100vh" // Emulate React Native so flex 1 works as expected.
        paddingBottom={`${paddingBottomPx}px`} // Reserve space for EditorMenu.
      >
        <Head>
          <title>{webName}</title>
          <MetaViewport />
        </Head>
        <PageBackgroundColor color={web.theme.colors.background} />
        {web.pages[pageName].elements.map((element, i) => (
          <EditorElement
            key={getElementKey(element)}
            element={element}
            theme={web.theme}
            path={[i]}
            parents={[]}
            activePath={activePath}
          />
        ))}
      </Box>
    );
  }
}

export default EditorPage;
