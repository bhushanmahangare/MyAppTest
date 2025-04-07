import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';
export default function useInternetInfo() {
  const [state, setState] = useState<NetInfoState>();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setState(state);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return state;
}
