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
} from './database/db.js';

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
      console.log(result, 'result');

      setBootList(result);
    } catch (err) {
      console.log(err);
    }
  }

  const saveBoot = async (type, size) => {
    try {
      const result = await addBoot(type, size);
      let json = JSON.stringify(result);
      console.log('results: ', json);
      setBootList(...json);
      // await fetchAllBoots();
    } catch (error) {
      console.log({error: error.message}, 'save boot failed');
    }
  };

  const deleteBoot = removeId => {
    setBootList(bootList =>
      bootList.filter((boot, index) => index != removeId),
    );
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <Text style={styles.itemsStyle}>
          {item.boot_id}
          {item.size}
          {item.type}
        </Text>
      </View>
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
          value={type}
          onChangeText={text => typeHandler(text)}
          placeholder="Boot type...."
        />
        <TextInput
          style={styles.idinput}
          value={size}
          onChangeText={text => sizeHandler(text)}
          placeholder="Boot size"
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button onPress={saveBoot} title="Save" />
        <Button onPress={clearBootData} title="Clear" />
      </View>
      <Text>Boot list</Text>
      <FlatList data={bootList} renderItem={renderItem} />
      <Text>
        List: {bootList.length} => entered {type}:{size}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },

  touchableOpacity: {
    backgroundColor: '#0091EA',
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  touchableOpacityText: {
    color: '#FFFFFF',
    fontSize: 23,
    textAlign: 'center',
    padding: 8,
  },
  idinput: {
    backgroundColor: 'lightblue',
    width: '30%',
    borderColor: 'black',
    borderWidth: 2,
  },
  typeinput: {
    backgroundColor: 'lightblue',
    width: '60%',
    borderColor: 'black',
    borderWidth: 2,
  },
  inputstyle: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textInputStyle: {
    height: 45,
    width: '90%',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#00B8D4',
    borderRadius: 7,
    marginTop: 15,
  },
  buttonsContainer: {
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  itemsStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 14,
    color: '#000',
  },
});
export default App;
