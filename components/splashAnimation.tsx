import { StyleSheet, View } from 'react-native';
import React from 'react';
import animationData from '../assets/lottie/Animation - 1729496703742.json'; 
import Animated, { ZoomOut } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';


const SplashAnimation = ({
    onAnimationFinish = (isCancelled) => {},
  }: {
    onAnimationFinish?: (isCancelled: boolean) => void;
  }) => {
  return (
    <View style={styles.container}>
        <Animated.View exiting={ZoomOut} style={styles.animationContainer}>
      <LottieView
        source={animationData} 
        autoPlay 
        loop={false}
        onAnimationFinish={onAnimationFinish}
        style={styles.animation} 
      />
      </Animated.View>
    </View>
  );
};

export default SplashAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // change to your desired background color
  },
  animation: {
    width: 200, // adjust size as needed
    height: 200,
  },
  animationContainer: {
    width: 200, // adjust size as needed
    height: 200,
  },
});

