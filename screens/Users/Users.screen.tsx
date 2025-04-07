import React, {useState} from 'react';
import {
  Alert,
  Button,
  FlatList,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Flexbox from '../../components/atoms/FlexBox/Flexbox.component';
import usersJSON from '../../data/users.json';
import {styles} from './User.styles';
import {IUser, IUserCardProps} from './User.types';

function UserCard(props: IUserCardProps) {
  const {user, onDelete, onEdit} = props;
  return (
    <View style={styles.card}>
      <Image source={{uri: user.avatar}} style={styles.avatar} />
      <Flexbox style={styles.info} flexDirection="column" gap={4}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.phone}>{user.phone}</Text>
      </Flexbox>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit}>
          <Icon name="edit" size={24} color="dodgerblue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Icon name="trash" size={24} color="tomato" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function UsersScreen() {
  const [users, setUsers] = useState(usersJSON);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);

  const handleDelete = (user: IUser) => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete ${user.name}?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setUsers(users.filter(_user => _user.id !== user.id)),
        },
      ],
    );
  };

  const handleEditIconClick = (user: IUser) => {
    setEditingUser(user);
    setModalVisible(true);
  };

  const handleSaveEditClick = () => {
    if (editingUser) {
      setUsers(
        users.map(user => (user.id === editingUser.id ? editingUser : user)),
      );
    }
    setModalVisible(false);
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <UserCard
            onDelete={() => handleDelete(item)}
            onEdit={() => handleEditIconClick(item)}
            user={item}
          />
        )}
      />

      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Flexbox marginVertical={16}>
              <Text style={styles.modalTitle}>Edit User</Text>
            </Flexbox>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={editingUser?.name}
              onChangeText={text =>
                setEditingUser(prev => (prev ? {...prev, name: text} : prev))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={editingUser?.email}
              onChangeText={text =>
                setEditingUser(prev => (prev ? {...prev, email: text} : prev))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={editingUser?.phone}
              onChangeText={text =>
                setEditingUser(prev => (prev ? {...prev, phone: text} : prev))
              }
            />
            <Flexbox style={styles.modalActions}>
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                color="gray"
              />
              <Button
                title="Save"
                onPress={handleSaveEditClick}
                color="dodgerblue"
              />
            </Flexbox>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default UsersScreen;
