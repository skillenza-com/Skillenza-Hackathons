import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Theme, withTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  theme: Theme;
  type: string;
  active: boolean;
  style?: ViewStyle;
}

const providerMap: {[key: string]: string} = {
  password: 'email-lock',
  facebook: 'facebook',
  google: 'google',
  phone: 'phone',
};

function Provider({theme, type, active, style}: Props) {
  const icon = providerMap[type];

  if (!icon) {
    return null;
  }

  return (
    <View style={[style, styles[active ? 'active' : 'inactive']]}>
      <Icon
        name={icon}
        size={24}
        color={active ? theme.colors.primary : '#000'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inactive: {
    opacity: 0.3,
  },
  active: {
    opacity: 1,
  },
});

export default withTheme(Provider);
