import React from 'react';
import {FlatList, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {screens} from '../App';
import {useNavigation} from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <FlatList
        data={screens}
        keyExtractor={item => item.title} // Unique key for each item
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => {
                navigation.navigate(item.title);
              }}>
              <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingTop: 12, // Add some top padding for the status bar
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  itemText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
});
