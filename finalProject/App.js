import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Stylesheet,
  FlatList,
  TextInput,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Item from './components/Item';
import styles from './styles';

import {init, getAllUsers, addUser, deleteUser, dropTable} from './database/db';

const App = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    contact: '',
  });
  const {name, contact, email} = user;
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

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
      getUsers();
      console.log('User added successfully');
    } catch (e) {
      setError(`An error occurred while saving the user ${e.message}`);
    }
  };

  const deleteItem = id => {
    const temp = user.filter(item => item.id !== id);
    setUser(temp);
  };

  const deleteUserById = async () => {
    try {
      await deleteUser(user);
    } catch (e) {
      console.log('Users not deleted successfully', e.message);
    }
  };

  const dropTables = async () => {
    try {
      await dropTable();
    } catch (e) {
      console.log('Users not deleted successfully', e.message);
    }
  };

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#f0f7f4' : '#edf2fb';
    const color = item.id === selectedId ? 'black' : 'white';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 24}}>Add attedees to list</Text>
      <View style={styles.inputContainer}>
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
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={addUserToList}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={dropTable}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.flatList}>
        <FlatList
          data={users}
          renderItem={renderItem}
          deleteItem={deleteItem}
        />
      </View>
    </View>
  );
};

export default App;
