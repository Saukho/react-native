import React, {useState, useEffect} from 'react';
import {
  Text,
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
} from 'react-native';
import {addBoot, updateBoot, fetchAllBoots, dropTable} from '../database/db.js';

const AddBoot = props => {
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

  const updateBoot = async (updateId, boot) => {
    try {
      await updateBoot(updateId, boot);
      await getBoots();
    } catch (error) {
      console.log({message: error.message}, 'update boot failed');
    }
  };

  useEffect(() => {
    getBoots();
  }, []);

  return (
    <Modal visible={props.visibility}>
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
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
  buttonstyle: {
    width: '30%',
  },
  listitemstyle: {
    backgroundColor: 'lightgreen',
    width: '90%',
    borderColor: 'red',
    borderWidth: 2,
    margin: 5,
  },
});

export default AddBoot;
