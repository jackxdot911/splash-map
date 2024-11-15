import { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import {
  fetchAuthSession,
  fetchUserAttributes,
  signIn,
  signOut,
} from "aws-amplify/auth";
import * as Clipboard from "expo-clipboard";

// Define proper types
interface UserAttributes {
  email: string;
  sub: string;
  email_verified: boolean;
  // Add other attributes as needed
}

interface AuthState {
  token: string | null;
  userAttributes: UserAttributes | null;
  isLoading: boolean;
  error: string | null;
}

const NavigationButton = ({ title, route }: { title: string; route: any }) => (
  <TouchableOpacity
    style={styles.navigationButton}
    onPress={() => router.push(route)}
  >
    <Text style={styles.navigationButtonText}>{title}</Text>
  </TouchableOpacity>
);

const copyToClipboard = (text: any) => {
  Clipboard.setStringAsync(text);
  // Optionally show a toast or alert to inform the user
  alert("Copied to clipboard!");
};

const Index = () => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    userAttributes: null,
    isLoading: false,
    error: null,
  });

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const updateCredential =
    (field: keyof typeof credentials) => (text: string) => {
      setCredentials((prev) => ({ ...prev, [field]: text }));
    };

  const fetchUserData = async () => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
      const userAttributes = await fetchUserAttributes();
      const { idToken } = (await fetchAuthSession()).tokens ?? {};

      console.log(idToken);
      console.log(userAttributes);

      setAuthState({
        token: idToken?.toString() ?? null,
        userAttributes: userAttributes as unknown as UserAttributes,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Failed to fetch user data",
      }));
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogin = async () => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      if (!credentials.email || !credentials.password) {
        throw new Error("Email and password are required");
      }

      await signIn({
        username: credentials.email,
        password: credentials.password,
        options: {
          authFlowType: "USER_PASSWORD_AUTH",
        },
      });

      await fetchUserData();
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Login failed. Please check your credentials.",
      }));
      Alert.alert(
        "Login Error",
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  };

  const handleSignout = async () => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));
      await signOut();
      setAuthState({
        token: null,
        userAttributes: null,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Sign out failed",
      }));
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (authState.isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!authState.token) {
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          value={credentials.email}
          onChangeText={updateCredential("email")}
          placeholder="Email"
          placeholderTextColor="#666"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          value={credentials.password}
          onChangeText={updateCredential("password")}
          placeholder="Password"
          placeholderTextColor="#666"
          style={styles.input}
          secureTextEntry
        />
        {authState.error && (
          <Text style={styles.errorText}>{authState.error}</Text>
        )}
        <Pressable style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>
          Welcome, {authState.userAttributes?.email}
        </Text>
        <Text style={{ fontSize: 8 }}>{authState.token}</Text>

        <Pressable onPress={() => copyToClipboard(authState.token)}>
          <Text style={{ margin: 10, color: "#99999" }}>Copy Token</Text>
        </Pressable>
        <Pressable
          onPress={() => copyToClipboard(authState.userAttributes?.email)}
        >
          <Text style={{ margin: 10, color: "#99999" }}>Copy email</Text>
        </Pressable>
        <View style={styles.navigationContainer}>
          <NavigationButton title="Map" route="/map" />
          <NavigationButton title="Scroll Animation" route="/scrollAni" />
          <NavigationButton title="Bottom Sheet" route="/bottomSheet" />
          <NavigationButton title="Auth" route="/auth" />
          <NavigationButton title="Camera Gallery" route="/cameraGallery" />
          <NavigationButton title="Camera" route="/camera" />
          <NavigationButton title="Haptic" route="/haptic" />
          <NavigationButton title="Browser" route="/browser" />
          <NavigationButton title="Web View" route="/webview" />
          <NavigationButton title="Loaction" route="/location" />
          <NavigationButton title="Site Map" route="/_sitemap" />
        </View>

        <Pressable style={styles.signoutButton} onPress={handleSignout}>
          <Text style={styles.buttonText}>Sign out</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  navigationContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  loginButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  signoutButton: {
    backgroundColor: "#B00020",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  navigationButton: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  navigationButtonText: {
    fontSize: 18,
    fontWeight: "500",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  errorText: {
    color: "#B00020",
    marginBottom: 16,
    textAlign: "center",
  },
});

export default Index;
