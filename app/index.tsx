import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import awsconfig from './aws-exports'; 
import React, { useEffect, useState } from 'react';
import { router } from "expo-router";
import AuthScreen from "./authScreen";
import { Amplify } from 'aws-amplify';
import Auth from '@aws-amplify/auth';

Amplify.configure(awsconfig);

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Initialize to false
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const checkAuthStatus = async () => {
      setLoading(true); // Start loading
      try {
        console.log("Checking authentication status...");
        await Auth.currentAuthenticatedUser();
        console.log("User is authenticated");
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Authentication error:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // End loading
      }
    };
    checkAuthStatus();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Loading indicator
  }

  return isAuthenticated ? (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/map')}>
        <Text style={styles.text}>Map</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/scrollAni')}>
        <Text style={styles.text}>Scroll-Animation</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/bottomSheet')}>
        <Text style={styles.text}>Bottom sheet</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/auth')}>
        <Text style={styles.text}>Auth</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/_sitemap')}>
        <Text style={styles.text}>Site Map</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <AuthScreen setAuth={setIsAuthenticated} />
  );
};

export default Index;

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
