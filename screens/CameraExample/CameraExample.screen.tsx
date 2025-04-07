import React, {useEffect, useState, useRef} from 'react';
import {Text, View, Button, Image, StyleSheet} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';

const CameraExample = () => {
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(
    null,
  );
  const device = useCameraDevice('back'); // Set the initial camera device
  const camera = useRef<Camera>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const checkCameraPermission = async () => {
    const status = await Camera.getCameraPermissionStatus();
    console.log('status', status);

    if (status === 'granted') {
      setCameraPermission(true);
    } else if (status === 'not-determined') {
      const permission = await Camera.requestCameraPermission();
      setCameraPermission(permission === 'granted');
    } else {
      setCameraPermission(false);
    }
  };

  useEffect(() => {
    checkCameraPermission();
  }, []);

  if (cameraPermission === null) {
    return <Text>Checking camera permission...</Text>;
  } else if (!cameraPermission) {
    return <Text>Camera permission not granted</Text>;
  }

  if (!device) {
    return <Text>No camera device available</Text>;
  }

  const takePhoto = async () => {
    try {
      if (!camera.current) {
        console.error('Camera reference not available.', camera);
        return;
      }

      const photo = await camera.current.takePhoto();
      console.log(photo);

      if (photo) {
        setCapturedPhoto(`file://${photo.path}`);
        setShowPreview(true);
      } else {
        console.error('Photo captured is undefined or empty.');
      }
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  };

  const confirmPhoto = () => {
    // User confirmed, further actions with the captured photo
    // For example, save the photo to storage, etc.
    console.log('Photo confirmed:', capturedPhoto);
    setShowPreview(false); // Hide the preview after confirmation
  };

  const retakePhoto = () => {
    // User wants to retake the photo
    setCapturedPhoto(null); // Clear the captured photo
    setShowPreview(false); // Hide the preview
  };

  const onCameraReady = (ref: any) => {
    // Camera component is ready, set the camera reference
    camera.current = ref; // Reference to the Camera component (e.g., obtained from ref prop)
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        device={device}
        isActive={true}
        ref={ref => onCameraReady(ref)}
        photo={true}
        video={true}
      />
      {showPreview && capturedPhoto ? (
        <View style={styles.previewContainer}>
          <Image
            source={{uri: capturedPhoto}} // Assuming the photo is a valid URI
            style={styles.imagePreview}
          />
          <View style={styles.buttonContainer}>
            <Button title="Retake" onPress={retakePhoto} />
            <Button title="Confirm" onPress={confirmPhoto} />
          </View>
        </View>
      ) : (
        <View style={styles.buttonRow}>
          <Button title="Take Photo" onPress={takePhoto} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default CameraExample;
