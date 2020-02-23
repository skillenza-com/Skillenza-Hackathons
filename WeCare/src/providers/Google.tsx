import auth from '@react-native-firebase/auth';
import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {GoogleSignin, statusCodes} from 'react-native-google-signin';
import {UserContext} from '../App';
import ProviderButton from '../components/ProviderButton';
import {getProviderButtonTitle} from '../util/helpers';

const PROVIDER_ID = 'google.com';

function Google() {
  const [loading, setLoading] = useState(false);
  const user = useContext(UserContext);
  const {isOnlyProvider, title, variant} = getProviderButtonTitle(
    user,
    PROVIDER_ID,
  );

  async function handleGoogle() {
    if (!loading && user) {
      setLoading(true);

      try {
        await GoogleSignin.hasPlayServices();

        if (variant === 'UNLINK') {
          await user.unlink(PROVIDER_ID);
        } else {
          await GoogleSignin.signIn();
          const {accessToken, idToken} = await GoogleSignin.getTokens();
          const credential = auth.GoogleAuthProvider.credential(
            idToken,
            accessToken,
          );

          if (variant === 'LINK') {
            await user.linkWithCredential(credential);
          } else if (variant === 'SIGN_IN') {
            await auth().signInWithCredential(credential);
          }
        }
      } catch (error) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            return Alert.alert('Google Auth Canceled');
          case statusCodes.IN_PROGRESS:
            return Alert.alert('Google Auth Already In Progress');
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            return Alert.alert('Google Auth Requires Play Services');
          default:
            Alert.alert('Google Auth Error', error.message);
        }
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['profile', 'email'],
      // TODO change me
      webClientId:
        '584321849841-e5elbqsqakfkt3v0c74ou142hslot0bt.apps.googleusercontent.com',
    });
  }, []);

  if (isOnlyProvider) {
    return null;
  }

  return (
    <ProviderButton loading={loading} onPress={handleGoogle} type="google">
      {title}
    </ProviderButton>
  );
}

export default Google;
