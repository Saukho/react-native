import React, {useState} from 'react';
import {Text, Modal, View, TextInput, Button, StyleSheet} from 'react-native';

const AddBoot = props => {
  const [id, setId] = useState();
  const [type, setType] = useState('');

  const idInputHandler = par => {
    setId(par);
  };
  const typeInputHandler = par => {
    setType(par);
  };
  const clearBootData = () => {
    setId('');
    setType('');
    props.hideInputModal();
  };
  return (
    <Modal visible={props.visibility}>
      <View style={styles.inputstyle}>
        <TextInput
          style={styles.idinput}
          value={id}
          onChangeText={idInputHandler}
          placeholder="Boot id...."
        />
        <TextInput
          style={styles.typeinput}
          value={type}
          onChangeText={typeInputHandler}
          placeholder="Boot type...."
        />
      </View>
      <View style={styles.inputstyle}>
        <View style={styles.buttonstyle}>
          <Button title="Cancel" onPress={clearBootData} />
        </View>
        <View style={styles.buttonstyle}>
          <Button title="CLOSE" onPress={() => props.hideInputModal()} />
        </View>
        <View style={styles.buttonstyle}>
          <Button title="OK" onPress={() => props.bootDataHandler(id, type)} />
        </View>
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
    width: '20%',
    borderColor: 'black',
    borderWidth: 2,
  },
  typeinput: {
    backgroundColor: 'lightblue',
    width: '70%',
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
