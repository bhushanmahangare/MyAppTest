import {Platform} from 'react-native';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';

export const requestLocationPermission = async () => {
  const permission = Platform.select({
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, // or PERMISSIONS.IOS.LOCATION_ALWAYS
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, // or PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION
  });

  if (!permission) {
    return;
  }

  return request(permission);
};

export const isPermissionGranted = (status?: string) =>
  status == RESULTS.GRANTED;
export const isPermissionDenied = (status?: string) => status == RESULTS.DENIED;
