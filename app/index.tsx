import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";

const Index = () => {
  return (
    <View style={styles.constainer}>
      <TouchableOpacity onPress={()=>router.push('/map')}>
        <Text style={styles.text}>Map</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>router.push('/scrollAni')}>
        <Text style={styles.text}>Scroll-Animation</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>router.push('/bottomSheet')}>
        <Text style={styles.text}>Bottom sheet</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>router.push('/_sitemap')}>
        <Text style={styles.text}>Site Map</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight : 'bold',
  },
  constainer : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  }
});
