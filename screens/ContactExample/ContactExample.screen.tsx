import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  PermissionsAndroid,
  StyleSheet,
  Platform,
  Button,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import Contacts from 'react-native-contacts';
import Text from '../../components/atoms/Text/Text.component';
import {Contact} from 'react-native-contacts/type';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const isAndroid = Platform.OS == 'android';

export default function ContactExample() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactNumber, setNewContactNumber] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    try {
      if (isAndroid) {
        const permission = PERMISSIONS.ANDROID.READ_CONTACTS;
        const writePermission = PERMISSIONS.ANDROID.WRITE_CONTACTS;

        const readStatus = await check(permission);
        const writeStatus = await check(writePermission);

        if (readStatus !== RESULTS.GRANTED) {
          await request(permission);
        }

        if (writeStatus !== RESULTS.GRANTED) {
          await request(writePermission);
        }

        const finalReadStatus = await check(permission);
        if (finalReadStatus === RESULTS.GRANTED) {
          getContacts();
        }
      } else {
        getContacts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getContacts = async () => {
    console.log('Getting contacts');

    Contacts.getAll()
      .then(contacts => {
        console.log(contacts);
        setContacts(contacts);
      })
      .catch(error =>
        console.log('Error loading contacts:', error.message, error),
      );
  };

  const saveContact = () => {
    const newContact = {
      givenName: newContactName,
      familyName: '',
      phoneNumbers: [
        {
          label: 'mobile',
          number: newContactNumber,
        },
      ],
      emailAddresses: [
        {
          label: 'work',
          email: newContactEmail,
        },
      ],
    };

    Contacts.addContact(newContact)
      .then(() => {
        console.log('Contact added');
        getContacts();
        setModalVisible(false);
        setNewContactName('');
        setNewContactNumber('');
        setNewContactEmail('');
      })
      .catch(err => {
        console.error('Error saving contact:', err);
      });
  };

  const deleteContact = (contact: Contact) => {
    Alert.alert(
      'Delete Contact',
      `Are you sure you want to delete ${contact.givenName}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            Contacts.deleteContact(contact)
              .then(() => {
                console.log('Contact deleted');
                getContacts();
              })
              .catch(err => {
                console.error('Error deleting contact:', err);
              });
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Contacts List</Text>

      <Button title="Save New Contact" onPress={() => setModalVisible(true)} />

      <FlatList
        data={contacts}
        keyExtractor={item => item.recordID}
        renderItem={({item}) => (
          <View style={styles.contactItem}>
            <View>
              <Text style={styles.name}>{item.givenName}</Text>
              <Text style={styles.number}>
                {item.phoneNumbers.length > 0
                  ? item.phoneNumbers[0].number
                  : 'No number'}
              </Text>
            </View>
            <Button title="Delete" onPress={() => deleteContact(item)} />
          </View>
        )}
      />

      {/* Modal for creating new contact */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Create New Contact</Text>

            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={newContactName}
              onChangeText={setNewContactName}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={newContactNumber}
              onChangeText={setNewContactNumber}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={newContactEmail}
              onChangeText={setNewContactEmail}
              keyboardType="email-address"
            />

            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Save" onPress={saveContact} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  number: {
    fontSize: 16,
    color: '#007bff',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
  },
});
