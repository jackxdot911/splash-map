import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import  Auth  from '@aws-amplify/auth';
import {
    fetchAuthSession,
    signInWithRedirect
  } from 'aws-amplify/auth';
  
  

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSocialSignIn = async () => {
    await signInWithRedirect({
      provider: 'Google'
    });
  }

  const handleLogin = async () => {
    try {
      await Auth.signIn({username : email, password});
      Alert.alert('Success', 'Logged in successfully');
      // Navigate to the main app screen
    } catch (error:any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleSocialSignIn}>
        <Text>Google Login</Text>
      </TouchableOpacity>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
});
