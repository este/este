// @flow
import * as React from 'react';
import type { Web, Dispatch, Path } from './Editor';
import Head from 'next/head';
import Box from './Box';
import PageStyle from './PageStyle';
import EditorElement from './EditorElement';

type EditorPageProps = {|
  web: Web,
  webName: string,
  pageName: string,
  paddingBottomPx: number,
  dispatch: Dispatch,
  activePath: Path,
|};

const EditorPage = ({
  web,
  webName,
  pageName,
  paddingBottomPx,
  dispatch,
  activePath,
}: EditorPageProps) => {
  const props = {
    minHeight: '100vh', // Emulate React Native so flex 1 works as expected.
    paddingBottom: `${paddingBottomPx}px`, // Reserve space for EditorMenu.
    // // TODO: Handle empty page action.
    // onClick: () => {
    // },
  };

  const children = [
    <Head>
      <title>{webName}</title>
      <meta
        name="viewport"
        // https://bitsofco.de/ios-safari-and-shrink-to-fit
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
    </Head>,
    <PageStyle backgroundColor={web.theme.colors.background} />,
    ...web.pages[pageName].map((element, i) => (
      <EditorElement
        element={element}
        theme={web.theme}
        path={[i]}
        dispatch={dispatch}
        activePath={activePath}
      />
    )),
  ];

  return React.createElement(Box, props, ...children);
};

export default EditorPage;
