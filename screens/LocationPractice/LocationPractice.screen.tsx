import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Flexbox from '../../components/atoms/FlexBox/Flexbox.component';
import Text from '../../components/atoms/Text/Text.component';

import {getCurrentLocation} from '../../lib/location';

function LocationPractice() {
  const [position, setPosition] = useState<any>({});
  const [permissionDenied, setPermissionDenied] = useState<boolean>(false);

  const lat = position?.coords?.latitude;
  const long = position?.coords?.longitude;

  const handleButtonClick = async () => {
    setPermissionDenied(false);

    try {
      const position = await getCurrentLocation();
      console.log(position);
      setPosition(position);
    } catch (error: any) {
      console.log(error.message);
      setPermissionDenied(true);
    }
  };

  return (
    <Flexbox style={styles.container}>
      <Flexbox style={styles.header}>
        <Text fontSize={24} fontWeight="bold" color="#2C3E50">
          📍 Location Access
        </Text>
      </Flexbox>

      <Flexbox style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleButtonClick} style={styles.button}>
          <Text fontSize={18} color="white">
            Get Current Location
          </Text>
        </TouchableOpacity>
      </Flexbox>

      {permissionDenied && (
        <Flexbox justifyContent="center" alignItems="center">
          <Text fontSize={16} color="red">
            ❌ Location Permission Denied
          </Text>
        </Flexbox>
      )}

      {lat && long && (
        <View style={styles.locationBox}>
          <Flexbox style={styles.locationRow}>
            <Text fontSize={16} fontWeight="bold">
              📍 Latitude:
            </Text>
            <Text fontSize={16}>{lat}</Text>
          </Flexbox>
          <Flexbox style={styles.locationRow}>
            <Text fontSize={16} fontWeight="bold">
              📍 Longitude:
            </Text>
            <Text fontSize={16}>{long}</Text>
          </Flexbox>
        </View>
      )}
    </Flexbox>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ECF0F1',
    justifyContent: 'center',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#3498DB',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    shadowColor: '#2980B9',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationBox: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    alignSelf: 'center',
    width: '80%',
    shadowColor: '#2C3E50',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
});

export default LocationPractice;
