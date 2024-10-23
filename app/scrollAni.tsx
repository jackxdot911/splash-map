import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Dimensions,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { height, width } = Dimensions.get("window");

const scrollAni = () => {
  const scrollY1 = useRef(new Animated.Value(0)).current;
  const scrollY2 = useRef(new Animated.Value(-height * 0.7)).current;

  useEffect(() => {
    // Scroll image 1 (top to bottom)
    Animated.loop(
      Animated.timing(scrollY1, {
        toValue: -height * 0.7, // Scroll height is 70% of the screen height
        duration: 6000, // Duration for scrolling
        useNativeDriver: true,
      })
    ).start()

    // Scroll image 2 (bottom to top)
    Animated.loop(
      Animated.timing(scrollY2, {
        toValue: 0,
        duration: 6000,
        useNativeDriver: true,
      })
    ).start();
  }, [scrollY1, scrollY2]);

  return (
    <View style={styles.container}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        {/* Left Image (scrolls from top to bottom) */}
        <Animated.View style={{ transform: [{ translateY: scrollY1 }] }}>
          <Image
            source={require("../assets/images/scrollimgSingle01.png")}
            style={styles.image}
            resizeMode="cover"
          />
          <Image
            source={require("../assets/images/scrollimgSingle01.png")}
            style={styles.image}
            resizeMode="cover"
          />
        </Animated.View>

        {/* Right Image (scrolls from bottom to top) */}
        <Animated.View style={{ transform: [{ translateY: scrollY2 }] }}>
          <Image
            source={require("../assets/images/scrollimgSingle02.png")}
            style={styles.image}
            resizeMode="cover"
          />
          <Image
            source={require("../assets/images/scrollimgSingle02.png")}
            style={styles.image}
            resizeMode="cover"
          />
        </Animated.View>
        {/* Gradient Blur */}
        <LinearGradient
          colors={["transparent", "rgba(255,255,255,1.0)"]}
          style={styles.gradient}
          pointerEvents="none"
        />
      </View>
      {/* Text and Button Section */}
      <View style={styles.bottomSection}>
        <Text style={styles.loremText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio.
        </Text>
        <Button title="Click Me" onPress={() => alert("Button Pressed")} />
      </View>
    </View>
  );
};

export default scrollAni;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  imageContainer: {
    flexDirection: "row",
    height: "70%",
    width: "100%",
    paddingHorizontal: 4,
  },
  image: {
    width: width / 2 - 12,
    height: height * 0.7,
    margin: 4,
    borderRadius: 10,
    overflow: "hidden",
  },
  gradient: {
    position: "absolute",
    bottom: -10,
    height: 180,
    width: "110%",
  },
  bottomSection: {
    height: "30%", // Remaining 30% for text and button
    padding: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  loremText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
});
