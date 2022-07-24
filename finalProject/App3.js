import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import styles from './styles.js';
import {init, getAllUsers, addUser, deleteUser, dropTable} from './database/db';
const {width, height} = Dimensions.get('screen');

const RenderRight = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [-50, 0.5],
    outputRange: [1, 0.1],
  });

  const Style = {
    transform: [
      {
        scale,
      },
    ],
  };

  return (
    <View
      style={{
        width: 80,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Animated.Text style={[Style, {color: '#fff', fontWeight: '600'}]}>
        Delete
      </Animated.Text>
    </View>
  );
};

const RenderLeft = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [0.5, 50],
    outputRange: [0.1, 1],
  });

  const Style = {
    transform: [
      {
        scale,
      },
    ],
  };

  return (
    <View
      style={{
        width: 80,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Animated.Text style={[Style, {color: '#fff', fontWeight: '600'}]}>
        Like
      </Animated.Text>
    </View>
  );
};

const RenderItem = ({item, index, deleteItem, likeItem}) => {
  return (
    <Swipeable
      useNativeAnimations
      overshootLeft={false}
      onSwipeableLeftOpen={() => likeItem(item.id)}
      renderLeftActions={RenderLeft}
      overshootRight={false}
      onSwipeableRightOpen={() => deleteItem(item.id)}
      renderRightActions={RenderRight}>
      <View style={styles.item}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '20%',
          }}>
          <Text style={{fontWeight: '600'}}>{item.name}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 5,
          }}>
          <Text style={{fontWeight: '600'}}>{item.contact}</Text>
        </View>
      </View>
    </Swipeable>
  );
};

export default function App() {
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
    try {
      if ((user.name = '')) {
        setError('Name is required');
      } else if ((user.email = '')) {
        setError('Email is required');
      } else if ((user.contact = '')) {
        setError('Contact is required');
      } else {
        await addUser(name, email, contact);
        getUsers();
      }
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

  const [displayerVisible, setDisplayerVisible] = useState(false);

  const likeItem = id => {
    setDisplayerVisible(true);

    const currentItem = user.find(item => item.id == id);
    const updatedItem = {
      ...currentItem,
    };

    const temp = user.map(item =>
      item.id == currentItem.id ? updatedItem : item,
    );

    setUser(temp);

    setTimeout(() => {
      setDisplayerVisible(false);
    }, 400);
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
      <SafeAreaView />
      <FlatList
        style={styles.flatList}
        data={users}
        renderItem={({item, index}) => (
          <RenderItem
            item={item}
            index={index}
            deleteItem={deleteItem}
            likeItem={likeItem}
          />
        )}
      />
    </View>
  );
}
