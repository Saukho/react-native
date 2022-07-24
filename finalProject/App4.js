import {StatusBar} from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  SafeAreaView,
} from 'react-native';
import {Data} from './data';
import {init, getAllUsers, addUser, deleteUser, dropTable} from './database/db';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import styles from './styles';

const RenderRight = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 1],
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
        width: '100%',
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
    outputRange: [0.0, 1],
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
        width: 100,
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
    <GestureHandlerRootView>
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
            <Text style={{fontSize: 12}}>{item.contact}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 5,
            }}>
            <Text>{item.Message}</Text>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const LikeDisplayer = () => {
  return (
    <View style={[styles.likeDisplayer]}>
      <Text>Dislike</Text>
    </View>
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
  const [displayerVisible, setDisplayerVisible] = useState(null);
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
    const temp = users.filter(item => item.id !== id);
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

  const likeItem = id => {
    setDisplayerVisible(false);

    const currentItem = users.find(item => item.id == id);
    const updatedItem = {
      ...currentItem,
    };

    const temp = users.map(item =>
      item.id == currentItem.id ? updatedItem : item,
    );

    setUser(temp);

    setTimeout(() => {
      setDisplayerVisible(false);
    }, 400);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      {displayerVisible ? <LikeDisplayer /> : null}
      <FlatList
        style={{flex: 1}}
        contentContainerStyle={{flex: 1}}
        data={users}
        ListEmptyComponent={() => (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>NO ITEMS TO DISPLAY</Text>
          </View>
        )}
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
