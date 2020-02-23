import React from 'react';
import {NavigationNativeContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Theme, withTheme} from 'react-native-paper';
import CreateAccount from './CreateAccount';
import ForgotPassword from './ForgotPassword';
import PhoneSignIn from './PhoneSignIn';
import SignIn from './SignIn';
import App from './AppIntro'
import AppIntro from './AppIntro';
interface Props {
  theme: Theme;
}


const Stack = createStackNavigator();

function SignedOutStack({theme}: Props) {
  return (
    <NavigationNativeContainer>
      <Stack.Navigator
        screenOptions={{
          headerTransparent:true,
          headerTitle:'',
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: theme.colors.accent,
        }}>
        
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{header: null}}
        />
        <Stack.Screen
          name="CreateAccount"
          options={{title: 'Create Account'}}
          component={CreateAccount}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{title: 'Forgot Password'}}
        />
        <Stack.Screen name="PhoneSignIn" component={PhoneSignIn} />
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
}

export default withTheme(SignedOutStack);
