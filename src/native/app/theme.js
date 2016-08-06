import theme from '../../common/app/theme';
import { Platform } from 'react-native';

// // TODO: Set fontSize by Math.min(height, width);
// const { height, width } = Dimensions.get('window');

const nativeTheme = {
  ...theme,
  fontSize: Platform.select({
    android: 18,
    ios: 16,
  }),
};

export default nativeTheme;
