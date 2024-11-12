import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useEffect } from "react";
import { 
  Button, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View,
  Modal,
  FlatList,
  Image,
  Alert
} from "react-native";
import * as FileSystem from 'expo-file-system';
import { uploadData, remove } from 'aws-amplify/storage';
import * as MediaLibrary from 'expo-media-library';
import { v4 as uuidv4 } from 'uuid';

interface Photo {
  uri: string;
  filename: string;
  uploaded: boolean;
  s3Key?: string;
}

export default function PhotoGallery() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const [camera, setCamera] = useState<CameraView | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadLocalPhotos();
  }, []);

  const loadLocalPhotos = async () => {
    try {
      const photoDir = `${FileSystem.documentDirectory}photos/`;
      const dirInfo = await FileSystem.getInfoAsync(photoDir);
      
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(photoDir);
        return;
      }

      const files = await FileSystem.readDirectoryAsync(photoDir);
      const photoList: Photo[] = files.map(filename => ({
        uri: `${photoDir}${filename}`,
        filename,
        uploaded: false
      }));
      
      setPhotos(photoList);
    } catch (error) {
      Alert.alert('Error', 'Failed to load photos');
    }
  };

  const takePhoto = async () => {
    if (!camera) return;

    try {
      const photo = await camera.takePictureAsync({ base64: true });
      if (!photo?.uri) {
        throw new Error('Failed to capture photo');
      }
      const filename = `photo_${Date.now()}.jpg`;
      const photoDir = `${FileSystem.documentDirectory}photos/`;
      const newUri = `${photoDir}${filename}`;

      await FileSystem.moveAsync({
        from: photo.uri,
        to: newUri
      });

      const newPhoto: Photo = {
        uri: newUri,
        filename,
        uploaded: false
      };

      setPhotos(prevPhotos => [...prevPhotos, newPhoto]);
      Alert.alert('Success', 'Photo captured and saved locally');
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const uploadToS3 = async (photo: Photo) => {
    try {
      // Read the file as base64
      const base64Data = await FileSystem.readAsStringAsync(photo.uri, {
        encoding: FileSystem.EncodingType.Base64
      });

      const s3Key = `photos/${uuidv4()}/${photo.filename}`;
      
      const result = await uploadData({
        key: s3Key,
        data: base64Data,
        options: {
          contentEncoding: 'base64',
          contentType: 'image/jpeg',
          accessLevel: 'guest'
        }
      }).result;

      return { success: true, s3Key };
    } catch (error) {
      console.error('Upload error:', error);
      return { success: false, s3Key: undefined };
    }
  };

  const deleteFromS3 = async (s3Key: string) => {
    try {
      await remove({ key: s3Key });
      return true;
    } catch (error) {
      console.error('Delete error:', error);
      return false;
    }
  };

  const syncPhotos = async () => {
    setUploading(true);
    const unuploadedPhotos = photos.filter(photo => !photo.uploaded);
    
    try {
      for (const photo of unuploadedPhotos) {
        const { success, s3Key } = await uploadToS3(photo);
        if (success && s3Key) {
          setPhotos(prevPhotos =>
            prevPhotos.map(p =>
              p.uri === photo.uri 
                ? { ...p, uploaded: true, s3Key } 
                : p
            )
          );
        }
      }
      Alert.alert('Success', 'All photos have been synced to S3');
    } catch (error) {
      Alert.alert('Error', 'Failed to sync some photos');
    } finally {
      setUploading(false);
      setShowSyncModal(false);
    }
  };

  const handlePhotoDelete = async (photo: Photo) => {
    try {
      // If photo was uploaded to S3, delete it there first
      if (photo.uploaded && photo.s3Key) {
        const deleted = await deleteFromS3(photo.s3Key);
        if (!deleted) {
          Alert.alert('Error', 'Failed to delete photo from S3');
          return;
        }
      }

      // Delete local file
      await FileSystem.deleteAsync(photo.uri);
      
      // Update state
      setPhotos(prevPhotos => prevPhotos.filter(p => p.uri !== photo.uri));
      
      Alert.alert('Success', 'Photo deleted successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete photo');
    }
  };

  const renderSyncModal = () => (
    <Modal
      visible={showSyncModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowSyncModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Unsynced Photos</Text>
          <FlatList
            data={photos.filter(photo => !photo.uploaded)}
            keyExtractor={item => item.uri}
            numColumns={3}
            renderItem={({ item }) => (
              <View style={styles.thumbnailContainer}>
                <Image
                  source={{ uri: item.uri }}
                  style={styles.thumbnailImage}
                />
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => handlePhotoDelete(item)}
                >
                  <Text style={styles.deleteButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.modalButtons}>
            <Button
              title="Sync All"
              onPress={syncPhotos}
              disabled={uploading}
            />
            <Button
              title="Cancel"
              onPress={() => setShowSyncModal(false)}
              color="red"
            />
          </View>
        </View>
      </View>
    </Modal>
  );

  if (!permission || !mediaPermission) {
    return <View />;
  }

  if (!permission.granted || !mediaPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera and access media
        </Text>
        <Button onPress={requestPermission} title="Grant Camera Permission" />
        <Button onPress={requestMediaPermission} title="Grant Media Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing={facing}
        ref={(ref) => setCamera(ref)}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => setFacing(current => (current === "back" ? "front" : "back"))}>
            <Text style={styles.text}>Flip</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.text}>Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => setShowSyncModal(true)}
          >
            <Text style={styles.text}>Sync</Text>
          </TouchableOpacity>
        </View>
      </CameraView>

      {renderSyncModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  thumbnailContainer: {
    position: 'relative',
    margin: 2,
  },
  thumbnailImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});