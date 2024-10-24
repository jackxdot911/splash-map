import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const Auth: React.FC = () => {
  const [loginStatus, setLoginStatus] = useState<string>('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '676617224815-vbb0alrocnihe6n1tn4rje3isalpa4b9.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      setLoginStatus('Hello World, login successful!'); // Update login status
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === statusCodes.SIGN_IN_CANCELLED) {
          console.log('User cancelled the login flow');
        } else if (error.message === statusCodes.IN_PROGRESS) {
          console.log('Signing in');
        } else if (error.message === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          console.log('Play services not available');
        } else {
          console.log('Some other error happened');
          console.log('Error message:', error.message);
        }
      } else {
        console.log('Unexpected error:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App</Text>
      <GoogleSigninButton
        style={styles.signInButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
      {loginStatus ? <Text style={styles.successMessage}>{loginStatus}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  signInButton: {
    width: 192,
    height: 48,
    marginTop: 30,
  },
  successMessage: {
    marginTop: 20,
    fontSize: 18,
    color: 'green',
  },
});

export default Auth;
