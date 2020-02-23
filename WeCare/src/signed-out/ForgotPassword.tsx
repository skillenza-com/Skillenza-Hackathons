import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Alert, StyleSheet, View} from 'react-native';
import {Button, Paragraph, TextInput} from 'react-native-paper';

function ForgotPassword() {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (error) {
      Alert.alert('Forgot Password - Error', error);
    }
  }, [error]);

  async function attemptReset() {
    if (!email) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      await auth().sendPasswordResetEmail(email);
    } catch (e) {
      switch (e.code) {
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/user-disabled':
          setError('This account has been disabled.');
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError('No user found or wrong password.');
          break;
        default:
          console.error(e);
          break;
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Paragraph>
        Enter your email address below to send a password reset email:
      </Paragraph>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Email Address"
        onChangeText={setEmail}
        theme={inputTheme}
      />
      <Button
        loading={loading}
        onPress={() => (loading ? null : attemptReset())}>
        {loading ? 'Sending Password Reset' : 'Send Password Reset'}
      </Button>
    </View>
  );
}

const inputTheme = {
  colors: {
    background: '#fff',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    marginVertical: 10,
  },
});

export default ForgotPassword;
