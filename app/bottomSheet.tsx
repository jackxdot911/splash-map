import React, { useState, useRef } from "react";
import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";
import {
  Button,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

const App = () => {
  const sheetRef = useRef<BottomSheetMethods>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [sheetHeight, setSheetHeight] = useState("30%");

  //#yellow
  const toggleSheet = () => {
    if (isExpanded) {
      setSheetHeight("30%");
    } else {
      setSheetHeight("80%");
      sheetRef.current?.open();
    }
    setIsExpanded(!isExpanded);
  };
  //#

  const closeModel = () => {
    sheetRef.current?.close();
  };

  return (
    <View style={styles.container}>
      <Button title="Open Sheet" onPress={toggleSheet} />
      <BottomSheet
        ref={sheetRef}
        style={styles.bottomSheet}
        animationType="spring"
        height={sheetHeight}
      >
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleSheet} style={styles.button}>
            {isExpanded ? (
              <Entypo name="arrow-with-circle-down" size={42} color="black" />
            ) : (
              <Entypo name="arrow-with-circle-up" size={42} color="black" />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={closeModel} style={styles.closeButton}>
            <Entypo name="cross" size={40} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sheetContent}>
          {isExpanded
            ? "The smart 😎, tiny 📦, and flexible 🎗 bottom sheet your app craves 🚀\nHere are more features:"
            : "The smart 😎, tiny 📦, and flexible 🎗 bottom sheet your app craves 🚀"}
        </Text>
        {isExpanded && (
          <>
            <View style={styles.extraContent}>
              <Button
                title="Action 1"
                onPress={() => {
                  /* Do something */
                }}
              />
              <Button
                title="Action 2"
                onPress={() => {
                  /* Do something */
                }}
              />
              <Image
                source={{ uri: "https://via.placeholder.com/100" }}
                style={styles.image}
              />
            </View>
          </>
        )}
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  bottomSheet: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 10,
    elevation: 5,
  },
  sheetContent: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
  extraContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  button: {
    alignItems: 'center',
    flex: 1, // Takes available space, centering the button
    alignSelf: 'center', // Center the button itself
  },
  closeButton: {
    alignItems: 'center',
    padding: 10,
  }
});

export default App;
