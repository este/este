import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { Theme, lightTheme } from '@app/themes/lightTheme';
import { darkTheme } from '@app/themes/darkTheme';
import { ViewerThemeQuery } from '@app/relay/generated/ViewerThemeQuery.graphql';

interface ViewerThemeWithDataProps {
  data: ViewerThemeQuery;
  children: (theme: Theme) => React.ReactElement<any> | null;
}

const ViewerThemeWithData: React.FunctionComponent<
  ViewerThemeWithDataProps
> = ({ children, data: { viewer } }) => {
  // Magic string is good enough for now.
  const theme = viewer && viewer.themeName === 'dark' ? darkTheme : lightTheme;
  return children(theme);
};

export const ViewerTheme = createFragmentContainer(
  ViewerThemeWithData,
  graphql`
    fragment ViewerThemeQuery on Query {
      viewer {
        themeName
      }
    }
  `,
);
