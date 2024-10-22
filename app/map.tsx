import "react-native-gesture-handler";
import { markersData } from "@/db/cordinates";
import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Modal from "react-native-modal";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";

type MarkerType = {
  id: number;
  latitude: number;
  longitude: number;
  price: string;
};

const SCREEN_HEIGHT = Dimensions.get("window").height;

const Map = () => {
  const initialRegion = {
    latitude: 13.3392,
    longitude: 74.74,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [selectedMarker, setSelectedMarker] = useState<MarkerType | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentHeight, setCurrentHeight] = useState(SCREEN_HEIGHT * 0.3); // Track height state
  const modalHeight = useRef(new Animated.Value(SCREEN_HEIGHT * 0.3)).current;

  const minHeight = SCREEN_HEIGHT * 0.3;
  const maxHeight = SCREEN_HEIGHT * 0.9;
  const dragY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const listenerId = modalHeight.addListener(({ value }) => {
      setCurrentHeight(value);
    });

    return () => {
      modalHeight.removeListener(listenerId);
    };
  }, [modalHeight]);

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: dragY } }],
    { useNativeDriver: false }
  );

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      if (event.nativeEvent.translationY < -50) {
        // If dragged up significantly, expand the modal
        Animated.spring(modalHeight, {
          toValue: maxHeight,
          useNativeDriver: false,
        }).start();
      } else if (event.nativeEvent.translationY > 50) {
        // If dragged down, minimize the modal
        Animated.spring(modalHeight, {
          toValue: minHeight,
          useNativeDriver: false,
        }).start();
      }
    }
  };

  const handleMarkerPress = (marker: MarkerType) => {
    setSelectedMarker(marker);
    setModalVisible(true);

    // Reset modal height when a new marker is pressed
    Animated.timing(modalHeight, {
      toValue: minHeight,
      duration: 300, // Adjust the duration as needed
      useNativeDriver: false,
    }).start();
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentHeight(SCREEN_HEIGHT * 0.3)
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView.Animated
          style={styles.map}
          region={initialRegion}
          mapType="standard"
        >
          {markersData.map((marker) => (
            <Marker.Animated
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              onPress={() => handleMarkerPress(marker)}
            >
              <View style={styles.marker}>
                <Text style={styles.markerText}>{marker.price}</Text>
              </View>
            </Marker.Animated>
          ))}
        </MapView.Animated>

        <Modal
          isVisible={isModalVisible}
          onBackdropPress={closeModal}
          style={styles.modal}
        >
          <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}
          >
            <Animated.View
              style={[styles.modalContent, { height: modalHeight }]}
            >
              <View style={styles.dragHandleContainer}>
                <View style={styles.dragHandle} />
              </View>

              <Text style={styles.modalTitle}>Details</Text>
              {selectedMarker && (
                <>
                  <Text style={styles.modalText}>
                    Price: {selectedMarker.price}
                  </Text>
                  <Text style={styles.modalText}>
                    Latitude: {selectedMarker.latitude}
                  </Text>
                  <Text style={styles.modalText}>
                    Longitude: {selectedMarker.longitude}
                  </Text>
                </>
              )}

              <Text>currentHeight : {currentHeight}</Text>
              <Text>SCREEN_HEIGHT : {SCREEN_HEIGHT * 0.8}</Text>


              {currentHeight >= SCREEN_HEIGHT * 0.8 && (
                <View style={styles.extraContent}>
                  <Text>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Praesentium quasi repellat sapiente hic quaerat doloribus
                    minima adipisci facilis deserunt ex fugiat iure ducimus ut
                    tempora, et id ab est exercitationem.r
                  </Text>
                  <TouchableOpacity style={styles.extraButton}>
                    <Text>Button 1</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.extraButton}>
                    <Text>Button 2</Text>
                  </TouchableOpacity>
                </View>
              )}

              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </Animated.View>
          </PanGestureHandler>
        </Modal>
      </View>
    </GestureHandlerRootView>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  marker: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  markerText: {
    color: "#333",
    fontWeight: "bold",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  dragHandleContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginBottom: 10,
  },
  dragHandle: {
    width: 60,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 3,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  extraContent: {
    marginTop: 20,
  },
  extraButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  closeButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
