import React, {useState} from 'react';
import {StyleSheet, Button, View, Modal, TextInput} from 'react-native';

const BootModal = props => {
  const [type, setType] = useState();
  const [size, setSize] = useState();

  const bootTypeInputHandler = enteredText => {
    setType(enteredText);
  };
  const bootSizeInputHandler = enteredSize => {
    setSize(enteredSize);
  };

  return (
    <Modal visible={props.modalVisible} animationType="slide">
      <View style={styles.formStyle}>
        <TextInput
          style={styles.inputStyle}
          placeholder="boot size"
          onChangeText={bootSizeInputHandler}
          value={size}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="boot type"
          onChangeText={bootTypeInputHandler}
          value={type}
        />
      </View>
      <View style={styles.buttonView}>
        <Button
          style={styles.buttonStyle}
          title="Ok"
          onPress={() => props.bootDataHandler(type, size)}
        />
        <Button
          style={styles.buttonStyle}
          title="Cancel"
          onPress={props.cancelBoot()}
        />
        <Button
          style={styles.buttonStyle}
          title="Close Modal"
          onPress={props.closeModal}
        />
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 'auto',
    width: '100%',
  },
  headerStyle: {
    fontSize: 18,
    marginVertical: 12,
    color: '#fff',
  },
  formStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  inputStyle: {
    backgroundColor: '#fdfdfd',
    borderColor: '#666',
    borderWidth: 2,
    width: '30%',
  },
  buttonStyle: {
    backgroundColor: '#fdfdfd',
    borderColor: '#666',
    margin: 32,
    borderWidth: 2,
    width: '100%',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '24%',
  },
  flatliststyle: {
    flexDirection: 'column',
    height: '100%',
  },
  listitemstyle: {
    alignItems: 'center',
    backgroundColor: '#fdfdfd',
    borderColor: '#666',
    borderWidth: 2,
  },
  scrollviewstyle: {
    flexDirection: 'column',
    width: '100%',
    alignSelf: 'center',
  },
});
export default BootModal;
