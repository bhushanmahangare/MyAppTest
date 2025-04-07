import Geolocation from 'react-native-geolocation-service';
import {isPermissionGranted, requestLocationPermission} from './permissions';

export async function getCurrentLocation() {
  const status = await requestLocationPermission();

  console.log(getCurrentLocation.name, 'Status', status);

  if (!isPermissionGranted(status)) {
    throw new Error('Permission denied');
  }

  return new Promise((resolve, reject) => {
    console.log(getCurrentLocation.name);

    return Geolocation.getCurrentPosition(
      resolve,
      (error: any) => {
        console.log(getCurrentLocation.name, 'Error Handler');
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 10000,
      },
    );
  });
}
