import { markersData } from '@/db/cordinates';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Modal from 'react-native-modal';

type MarkerType = {
  id: number;
  latitude: number;
  longitude: number;
  price: string;
};

const Map = () => {
  const initialRegion = {
    latitude: 13.3392,
    longitude: 74.7400,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };


  // State for selected marker and modal visibility
  const [selectedMarker, setSelectedMarker] = useState<MarkerType | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  // Function to handle marker press
  const handleMarkerPress = (marker: MarkerType) => {
    setSelectedMarker(marker);
    setModalVisible(true);
  };

  // Close modal
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <MapView.Animated
        style={styles.map}
        region={initialRegion}
        mapType="standard"
      >
        {markersData.map((marker) => (
          <Marker.Animated
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            onPress={() => handleMarkerPress(marker)}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>{marker.price}</Text>
            </View>
          </Marker.Animated>
        ))}
      </MapView.Animated>

      {/* Modal that appears at the bottom */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Details</Text>
          {selectedMarker && (
            <>
              <Text style={styles.modalText}>Price: {selectedMarker.price}</Text>
              <Text style={styles.modalText}>Latitude: {selectedMarker.latitude}</Text>
              <Text style={styles.modalText}>Longitude: {selectedMarker.longitude}</Text>
            </>
          )}
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  marker: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  markerText: {
    color: '#333',
    fontWeight: 'bold',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
