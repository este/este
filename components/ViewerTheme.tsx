import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { ViewerThemeQuery } from '../generated/ViewerThemeQuery.graphql';
import darkTheme, { name as darkThemeName } from '../themes/dark';
import lightTheme, { Theme } from '../themes/light';

interface ViewerThemeProps {
  children: (theme: Theme) => React.ReactElement<any> | null;
  data: ViewerThemeQuery;
}

const ViewerTheme: React.FunctionComponent<ViewerThemeProps> = ({
  children,
  data: { viewer },
}) => {
  const theme =
    viewer && viewer.themeName === darkThemeName ? darkTheme : lightTheme;
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
