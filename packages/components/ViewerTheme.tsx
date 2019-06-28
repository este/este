import { ReactElement, FunctionComponent } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { Theme, lightTheme } from '@app/themes/lightTheme';
import { darkTheme } from '@app/themes/darkTheme';
import { ViewerTheme_data } from '@app/relay/generated/ViewerTheme_data.graphql';

interface ViewerThemeWithDataProps {
  data: ViewerTheme_data;
  children: (theme: Theme) => ReactElement<any> | null;
}

const ViewerThemeWithData: FunctionComponent<ViewerThemeWithDataProps> = ({
  children,
  data: { viewer },
}) => {
  // Magic string is good enough for now.
  const theme = viewer && viewer.themeName === 'dark' ? darkTheme : lightTheme;
  return children(theme);
};

export const ViewerTheme = createFragmentContainer(ViewerThemeWithData, {
  data: graphql`
    fragment ViewerTheme_data on Query {
      viewer {
        themeName
      }
    }
  `,
});
