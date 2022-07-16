import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  useColorScheme,
} from 'react-native';

import SQLite from 'react-native-sqlite-storage';

import {getAllUsers, addUser, init} from './database/db';

const App = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    contact: '',
  });
  const {name, contact, email} = user;
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    init();
    getUsers();
  }, [setUsers]);

  async function getUsers() {
    try {
      const result = await getAllUsers(users);
      // console.log('result', result);
      setUsers(result);
      console.log('setUsers', result);
    } catch (err) {
      setError(err);
      console.log('error', err);
    }
  }

  const addUserToList = async () => {
    if ((user.name = '')) {
      setError('Name is required');
      return;
    }
    if ((user.email = '')) {
      setError('Email is required');
      return;
    }
    if ((user.contact = '')) {
      setError('Contact is required');
      return;
    }
    try {
      await addUser(name, email, contact);
      setUsers(name, email, contact);
      console.log('User added successfully');
    } catch (e) {
      setError(`An error occurred while saving the user ${e.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 24}}>Add attedees to list</Text>
      <TextInput
        style={styles.textInput}
        value={name}
        placeholder="Add name"
        onChangeText={value => setUser({...user, name: value})}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Email Address"
        value={email}
        onChangeText={value => setUser({...user, email: value})}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Contact"
        value={contact}
        onChangeText={value => setUser({...user, contact: value})}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={addUserToList}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setUser('')}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <FlatList
          data={users}
          renderItem={item => (
            <View>
              <Text style={styles.buttonText}>{item.item.name}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffc',
    alignItems: 'center',
  },
  textInput: {
    borderColor: 'grey',
    color: 'grey',
    borderWidth: 1,
    width: '80%',
    padding: 10,
    marginTop: 20,
  },
  button: {
    padding: 10,
    backgroundColor: 'orange',
    borderRadius: 5,
    margin: 10,
    marginTop: 30,
    width: 80,
  },
  buttonText: {
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  flatList: {
    textAlign: 'center',
    color: 'grey',
  },
});

export default App;
