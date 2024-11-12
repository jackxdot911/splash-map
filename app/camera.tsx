import React, { useState } from 'react';
import { uploadData } from 'aws-amplify/storage';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Camera = () => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [camera, setCamera] = useState<CameraView | null>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const takePicture = async () => {
    if (!camera) return;
    
    try {
      const photo : any = await camera.takePictureAsync({
        quality: 0.5,
        base64: true,
      });

      // Create a unique filename using timestamp
      const filename = `photo-${Date.now()}.jpg`;

      // Convert base64 to blob
      const response = await fetch(photo.uri);
      const blob = await response.blob();

      // Upload to S3
      try {
        const result = await uploadData({
          key: `photos/${filename}`,
          data: blob,
          options: {
            contentType: 'image/jpeg',
            accessLevel: 'guest'
          }
        }).result;
        
        console.log('Successfully uploaded file:', result);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={ref => setCamera(ref)}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Photo</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Camera;