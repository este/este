// // @flow
// import A from './a';
// import Box from './box';
//
// const NavA = ({ children, href, title }) => (
//   <A
//     backgroundColor="primary"
//     bold
//     color="white"
//     href={href}
//     isActive={title === children}
//     paddingHorizontal={0.5}
//     paddingVertical={0.5}
//     prefetch
//   >
//     {children}
//   </A>
// );
//
// type MainNavProps = { title: string };
//
// const MainNav = ({ title }: MainNavProps) => (
//   <Box
//     backgroundColor="primary"
//     flexDirection="row"
//     flexWrap="wrap"
//     marginVertical={0.5}
//     paddingHorizontal={0.5}
//   >
//     <NavA href="/" title={title}>Este</NavA>
//     <NavA href="/fields" title={title}>Fields</NavA>
//   </Box>
// );
//
// export default MainNav;
