import {DefaultTheme} from 'react-native-paper';

export default {
  ...DefaultTheme,
  dark: true,
  roundness: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: '#009688',
    accent: '#fff',
    background: '#fff',
  },
};
