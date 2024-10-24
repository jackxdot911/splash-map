import SplashAnimation from "@/components/splashAnimation";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { Asset } from 'expo-asset';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);
  const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);
  
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    const loadAssets = async () => {
      const images = [
        require("../assets/images/scrollImg01.png"),
        require("../assets/images/scrollImg02.png"),
        require("../assets/images/scrollimgSingle01.png"),
        require("../assets/images/scrollimgSingle02.png")
      ];
      const cacheImages = images.map(image => Asset.fromModule(image).downloadAsync());
      await Promise.all(cacheImages);
    };

    loadAssets().then(() => {
      if (fontsLoaded || fontError) {
        SplashScreen.hideAsync();
        setAppReady(true);
      }
    });
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
      <Stack.Screen name="index" options={{ headerShown: true }} />
      <Stack.Screen name="map" options={{ headerShown: true }} />
      <Stack.Screen name="scrollAni" options={{ headerShown: false }} />
      <Stack.Screen name="bottomSheet" options={{ headerShown: false }} />
    </Stack>
  );
}
