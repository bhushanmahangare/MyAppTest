import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import { Alert, Button, FlatList, Text, TextInput, View, StyleSheet, TouchableOpacity, } from 'react-native';
const STORAGE_KEY = 'userDataList';

type UserData = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

const initialForm = {name: '', email: '', phone: ''};

const AsyncStorageExample = () => {
  const [form, setForm] = useState(initialForm);
  const [dataList, setDataList] = useState<UserData[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        console.log('Stored data: ', stored);
        if (stored) setDataList(JSON.parse(stored));
      } catch (err) {
        console.log('Error: ', err);
      }
    })();
  }, []);

  const saveDataList = async (list: UserData[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (err) {
      console.log('Error: ', err);
    }
  };

  const onChange = (key: keyof typeof form, value: string) => {
    setForm({...form, [key]: value});
  };

  const onAdd = async () => {
    if (!form.name || !form.email || !form.phone) return;
    const newItem: UserData = {
      id: Date.now().toString(),
      ...form,
    };
    const updatedList = [newItem, ...dataList];
    console.log('updatedList: ', updatedList);

    setDataList(updatedList);
    await saveDataList(updatedList);
    setForm(initialForm);
  };

  const onDelete = (id: string) => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this entry?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updatedList = dataList.filter(item => item.id !== id);
            console.log('updatedList: ', updatedList);
            setDataList(updatedList);
            await saveDataList(updatedList);
          },
        },
      ],
      {cancelable: true},
    );
  };

  const renderItem = ({item}: {item: UserData}) => (
    <View style={styles.item}>
      <View style={{flex: 1}}>
        <Text>Name: {item.name}</Text>
        <Text>Email: {item.email}</Text>
        <Text>Phone: {item.phone}</Text>
      </View>
      <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteBtn}>
        <Text style={{color: 'white'}}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{padding: 12, flex: 1}}>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={form.name}
        onChangeText={val => onChange('name', val)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={form.email}
        onChangeText={val => onChange('email', val)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your phone"
        value={form.phone}
        onChangeText={val => onChange('phone', val)}
        keyboardType="phone-pad"
      />
      <Button title="Add" onPress={onAdd} />
      <Text style={{marginVertical: 12, fontWeight: 'bold'}}>Entries:</Text>
      <FlatList
        data={dataList}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No entries yet.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#eee',
    padding: 12,
    marginTop: 8,
    borderRadius: 6,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    padding: 12,
    marginVertical: 4,
    borderRadius: 6,
    elevation: 1,
  },
  deleteBtn: {
    backgroundColor: '#d32f2f',
    padding: 8,
    borderRadius: 4,
    marginLeft: 12,
  },
});

export default AsyncStorageExample;
