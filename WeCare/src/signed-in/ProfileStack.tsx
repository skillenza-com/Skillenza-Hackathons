import {NavigationNativeContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import React from 'react';
import {Theme, withTheme} from 'react-native-paper';
import Profile from './Profile';
import Settings from './Settings';

interface Props {
  theme: Theme;
}

const Stack = createStackNavigator();

function SignedInStack({theme}: Props) {
  return (
    <NavigationNativeContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: theme.colors.accent,
        }}>
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{header: null}}
        />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
}

export default withTheme(SignedInStack);
