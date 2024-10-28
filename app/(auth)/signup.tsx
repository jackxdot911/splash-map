import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity } from "react-native";
import  Auth  from "@aws-amplify/auth";
import { fetchAuthSession, signInWithRedirect } from "aws-amplify/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSocialSignIn = async () => {
    await signInWithRedirect({
      provider: "Google",
    });
  };

  const handleSignup = async () => {
    try {
      await Auth.signUp({
        username: email,
        password,
      });
      Alert.alert("Success", "Signup successful. Please verify your email.");
      // Optionally navigate to a verification screen
    } catch (error : any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
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
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
});
