// // @flow

// import { ScrollView, Slider, StyleSheet } from 'react-native';

// // TODO: Demonstrate this pattern elsewhere.
// const StyledSlider = (props) => (
//   <Box as={Slider} {...props} />
// );



// import {
//   Box,
//   ToggleBaseline,
//   Text,
// } from '../../common/components';
//
// <Box
//   marginLeft={1}
//   marginRight={1}
//   // borderTopWidth={20}
//   // borderTopColor="danger"
//   // borderRadius={2}
//   // borderWidth={3}
//   // borderColor="warning"
//   style={theme => ({
//     // marginTop: 100,
//     // marginLeft: 1,
//     // borderColor: 'red',
//     // borderWidth: 1,
//     // borderLeftWidth: 3,
//     // borderTopRightRadius: 10,
//     marginTop: theme.typography.rhythm(3),
//   })}
// >
//   <Box
//     backgroundColor="warning"
//     // overflow="hidden"
//     borderRadius={10}
//     padding={0.5}
//   >
//     <Text
//       // style={theme => ({
//       //   lineHeight: theme.typography.lineHeight - 2,
//       // })}
//       // align="left"
//       color="black"
//       bold
//       // borderBottomColor="primary"
//       // borderBottomWidth={20}
//       // size={-1}
//       // color="warning"
//       // marginLeft={1}
//     >wtd</Text>
//   </Box>
//   <Text>fok</Text>
//   <StyledSlider
//     maximumValue={3}
//     height={2}
//   />
//   {/* flexDirection: 'row */}
//   <Box flexDirection="row">
//     <Text backgroundColor="warning">fok</Text>
//   </Box>
//   <ToggleBaseline />
// </Box>

// import React from 'react';
// import { CenteredContainer, Text } from '../app/components';
// import { Platform, StyleSheet } from 'react-native';
//
// const styles = StyleSheet.create({
//   text: {
//     textAlign: 'center',
//   },
// });
//
// const HomePage = () => (
//   <CenteredContainer>
//     <Text style={styles.text}>
//       {Platform.select({
//         android: `
//           Este App
//           Double tap R on your keyboard to reload
//           Shake or press menu button for dev menu
//         `,
//         ios: `
//           Este App
//           Press CMD+R to reload
//           Press CMD+D for debug menu
//         `,
//       })}
//     </Text>
//   </CenteredContainer>
// );
//
// export default HomePage;
