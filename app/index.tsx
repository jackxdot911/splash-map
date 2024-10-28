import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { withAuthenticator, Authenticator } from "@aws-amplify/ui-react-native";
import { signOut } from 'aws-amplify/auth';

const Index = () => {
  const handleSignout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };
  return (
    <Authenticator.Provider>
      <Authenticator>
        <View style={styles.container}>
          <Pressable style={styles.button} onPress={() => handleSignout()}>
            <Text style={styles.buttonText}>Sign out</Text>
          </Pressable>
          <TouchableOpacity onPress={() => router.push("/map")}>
            <Text style={styles.text}>Map</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/scrollAni")}>
            <Text style={styles.text}>Scroll-Animation</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/bottomSheet")}>
            <Text style={styles.text}>Bottom sheet</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/auth")}>
            <Text style={styles.text}>Auth</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/_sitemap")}>
            <Text style={styles.text}>Site Map</Text>
          </TouchableOpacity>
        </View>
      </Authenticator>
    </Authenticator.Provider>
  );
};

export default Index;

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 50,
    backgroundColor: "#B00020",
    padding: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
