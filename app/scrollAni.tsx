import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Animated, Dimensions, Button } from 'react-native';

const { height, width } = Dimensions.get('window');

const scrollAni = () => {
  const scrollY1 = useRef(new Animated.Value(-height * 0.7)).current;
  const scrollY2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Scroll image 1 (top to bottom)
    Animated.loop(
      Animated.timing(scrollY1, {
        toValue: 0, // Scroll height is 70% of the screen height
        duration: 6000, // Duration for scrolling
        useNativeDriver: true,
      }),
    ).start();

    // Scroll image 2 (bottom to top)
    Animated.loop(
      Animated.timing(scrollY2, {
        toValue: -height * 0.7, // Scroll in the opposite direction
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
            source={require('../assets/images/scrollImg01.png')}
            style={styles.image}
            resizeMode="cover"
          />
          <Image
            source={require('../assets/images/scrollImg01.png')}
            style={styles.image}
            resizeMode="cover"
          />
        </Animated.View>

        {/* Right Image (scrolls from bottom to top) */}
        <Animated.View style={{ transform: [{ translateY: scrollY2 }] }}>
          <Image
            source={require('../assets/images/scrollImg02.png')}
            style={styles.image}
            resizeMode="cover"
          />
          <Image
            source={require('../assets/images/scrollImg02.png')}
            style={styles.image}
            resizeMode="cover"
          />
        </Animated.View>
      </View>

      {/* Text and Button Section */}
      <View style={styles.bottomSection}>
        <Text style={styles.loremText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
        </Text>
        <Button title="Click Me" onPress={() => alert('Button Pressed')} />
      </View>
    </View>
  );
};

export default scrollAni;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Align the bottom section at the bottom
  },
  imageContainer: {
    flexDirection: 'row',
    height: '70%', // 70% of the screen height for images
    width: '100%', // Full width
  },
  image: {
    width: width / 2, // Each image takes half of the screen width
    height: height * 0.7, // Same height as the container for seamless scrolling
  },
  bottomSection: {
    height: '30%', // Remaining 30% for text and button
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loremText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});
