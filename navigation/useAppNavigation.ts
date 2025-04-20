import {useNavigation as useReactNavigation} from '@react-navigation/native';
import {RootStackParamList} from './navigation.types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export function useAppNavigation() {
  return useReactNavigation<NativeStackNavigationProp<RootStackParamList>>();
}
