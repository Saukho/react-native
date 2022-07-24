import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
  Button,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  init,
  addBoot,
  updateBoot,
  deleteBoot,
  fetchAllBoots,
  dropTable,
} from './database/db.js';
import styles from './styles';

init()
  .then(() => {
    console.log('Database creation succeeded!');
  })
  .catch(err => {
    console.log('Database IS NOT initialized! ' + err);
  });

const App = () => {
  const [size, setSize] = useState('');
  const [type, setType] = useState('');
  const [bootList, setBootList] = useState([]);

  const clearBootData = () => {
    setSize('');
    setType('');
  };

  const sizeHandler = size => {
    setSize(size);
  };
  const typeHandler = type => {
    setType(type);
  };

  async function getBoots() {
    try {
      const result = await fetchAllBoots();
      setBootList(result);
    } catch (err) {
      console.log(err);
    }
  }

  async function saveBoot() {
    try {
      const result = await addBoot(type, size);
      setBootList(result);
      await getBoots();
      clearBootData();
    } catch (error) {
      console.log({error: error.message}, 'save boot failed');
    }
  }

  const removeBoot = async (removeId, boot) => {
    try {
      await deleteBoot(removeId, boot);
      await getBoots();
    } catch (err) {
      console.log({error: err.message}, 'remove boot failed');
    }
  };

  const listViewItemSeparator = () => {
    return (
      <View
        style={{
          display: 'flex',
          height: 1,
          backgroundColor: '#666',
        }}
      />
    );
  };

  useEffect(() => {
    getBoots();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputstyle}>
        <TextInput
          style={styles.typeinput}
          onChangeText={text => typeHandler(text)}
          value={type}
          placeholder="Boot type...."
        />
        <TextInput
          style={styles.idinput}
          onChangeText={text => sizeHandler(text)}
          value={size}
          placeholder="Boot size"
        />
      </View>
      <View>
        <Text style={{textAlign: 'center'}}>
          {type}:{size}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.touchableOpacity} onPress={saveBoot}>
          <Text style={styles.touchableOpacityText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={clearBootData}
          style={styles.touchableOpacity}>
          <Text style={styles.touchableOpacityText}>Clear</Text>
        </TouchableOpacity>
      </View>
      <Text style={{padding: 30, textAlign: 'center'}}>Boot list:</Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 30,
          color: '#000',
        }}>
        <Text>Id:</Text>
        <Text>Type:</Text>
        <Text>size:</Text>
      </View>
      <FlatList
        data={bootList}
        ItemSeparatorComponent={listViewItemSeparator}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            key={item.id}
            onLongPress={() => removeBoot(item.id)}>
            <View style={styles.buttonsContainer}>
              <Text>{item.id}</Text>
              <Text>{item.type}</Text>
              <Text>{item.size}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default App;
