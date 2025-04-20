import React from 'react';
import {Text, View} from 'react-native';
import {useAppNavigation} from '../navigation/useAppNavigation';
import {ScreenNames} from '../navigation/navigation.config';

export default function MiscScreen() {
  const navigation = useAppNavigation();
  return (
    <View>
      <Text
        style={{
          fontSize: 40,
        }}>
        Misc Screen
      </Text>

      <Text
        style={{
          fontSize: 40,
        }}
        onPress={() => {
          navigation.navigate(ScreenNames.HOME_TABS);
        }}>
        Click to go to home
      </Text>
    </View>
  );
}
