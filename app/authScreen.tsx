import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar, NavigationState, SceneRendererProps } from 'react-native-tab-view';
import Auth from '@aws-amplify/auth';

interface AuthScreenProps {
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Route {
  key: string;
  title: string;
}

type State = NavigationState<Route>;

const SignupRoute: React.FC<AuthScreenProps> = ({ setAuth }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignUp = async () => {
    try {
      await Auth.signUp({ username, password });
      alert('Sign up successful! Please log in.');
      setAuth(false); // Switch to login tab
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Username" onChangeText={setUsername} value={username} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const LoginRoute: React.FC<AuthScreenProps> = ({ setAuth }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignIn = async () => {
    try {
      await Auth.signIn({username, password});
      setAuth(true); // Mark user as authenticated
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Username" onChangeText={setUsername} value={username} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} />
      <Button title="Log In" onPress={handleSignIn} />
    </View>
  );
};

const AuthScreen: React.FC<AuthScreenProps> = ({ setAuth }) => {
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState<Route[]>([
    { key: 'login', title: 'Login' },
    { key: 'signup', title: 'Signup' },
  ]);

  const renderScene = SceneMap({
    login: () => <LoginRoute setAuth={setAuth} />,
    signup: () => <SignupRoute setAuth={setAuth} />,
  });

  return (
    <TabView
      navigationState={{ index, routes } as State}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: 100 }}
      renderTabBar={(props: SceneRendererProps & { navigationState: State }) => (
        <TabBar {...props} indicatorStyle={{ backgroundColor: 'blue' }} style={{ backgroundColor: 'white' }} />
      )}
    />
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingHorizontal: 8 },
});
