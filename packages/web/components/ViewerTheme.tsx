import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import lightTheme, { Theme } from '@app/themes/lightTheme';
import darkTheme from '@app/themes/darkTheme';
import { ViewerThemeQuery } from '../generated/ViewerThemeQuery.graphql';

interface ViewerThemeProps {
  data: ViewerThemeQuery;
  children: (theme: Theme) => React.ReactElement<any> | null;
}

const ViewerTheme: React.FunctionComponent<ViewerThemeProps> = ({
  children,
  data: { viewer },
}) => {
  // Magic string is good enough for now.
  const theme = viewer && viewer.themeName === 'dark' ? darkTheme : lightTheme;
  return children(theme);
};

export default createFragmentContainer(
  ViewerTheme,
  graphql`
    fragment ViewerThemeQuery on Query {
      viewer {
        themeName
      }
    }
  `,
);
