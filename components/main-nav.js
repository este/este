// @flow
import A from './a';
import Box from './box';
import sitemap from '../lib/sitemap';
import { FormattedMessage } from 'react-intl';

const NavA = ({ href, ...props }) =>
  <A
    backgroundColor="primary"
    bold
    color="white"
    href={href}
    paddingHorizontal={0.5}
    paddingVertical={0.5}
    prefetch
    {...props}
  />;

type MainNavProps = { title: string };

const MainNav = ({ title }: MainNavProps) =>
  <Box
    backgroundColor="primary"
    flexDirection="row"
    flexWrap="wrap"
    marginVertical={0.5}
    paddingHorizontal={0.5}
  >
    {Object.keys(sitemap).map(pageName => {
      const page = sitemap[pageName];
      // TODO: Solve via reverse routing or wait for Next.js withRouter HOC.
      const isActive = page.title.defaultMessage === title;
      return (
        <NavA href={page.path} isActive={isActive} key={pageName}>
          <FormattedMessage {...page.title} />
        </NavA>
      );
    })}
  </Box>;

export default MainNav;
