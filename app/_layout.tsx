import SplashAnimation from "@/components/splashAnimation";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Animated } from "react-native";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);
  const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);
  
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const scaleValue = new Animated.Value(1);
  const opacityValue = new Animated.Value(1);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 2, // Enlarge
          duration: 1000, // Duration of enlargement
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 0, // Fade out
          duration: 1000, // Duration of fade out
          useNativeDriver: true,
        }),
      ]).start(() => {
        SplashScreen.hideAsync();
        setAppReady(true);
      });
    }
  }, [fontsLoaded, fontError]); 

  if (!appReady || !splashAnimationFinished) {
    return (
      <SplashAnimation
        onAnimationFinish={(isCancelled) => {
          if (!isCancelled) {
            setSplashAnimationFinished(true);
          }
        }}
      />
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
