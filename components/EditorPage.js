// @flow
import * as React from 'react';
import type { Web, EditorDispatch, Path } from './Editor';
import Head from 'next/head';
import Box from './Box';
import PageStyle from './PageStyle';
import EditorElement, { getElementKey } from './EditorElement';
import MetaViewport from './MetaViewport';

type EditorPageProps = {|
  web: Web,
  webName: string,
  pageName: string,
  paddingBottomPx: number,
  dispatch: EditorDispatch,
  activePath: Path,
|};

const EditorPage = ({
  web,
  webName,
  pageName,
  paddingBottomPx,
  dispatch,
  activePath,
}: EditorPageProps) => (
  <Box
    minHeight="100vh" // Emulate React Native so flex 1 works as expected.
    paddingBottom={`${paddingBottomPx}px`} // Reserve space for EditorMenu.
  >
    <Head>
      <title>{webName}</title>
      <MetaViewport />
    </Head>
    <PageStyle backgroundColor={web.theme.colors.background} />
    {web.pages[pageName].map((element, i) => (
      <EditorElement
        key={getElementKey(element)}
        element={element}
        theme={web.theme}
        path={[i]}
        dispatch={dispatch}
        activePath={activePath}
      />
    ))}
  </Box>
);

export default EditorPage;
