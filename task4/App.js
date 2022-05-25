/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Button,
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';

const App = () => {
  const [type, setType] = useState();
  const [size, setSize] = useState();
  const [list, addBoot] = useState([]);
  const [updateId, setUpdateId] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);

  const bootTypeInputHandler = enteredText => {
    setType(enteredText);
  };
  const bootSizeInputHandler = enteredSize => {
    setSize(enteredSize);
  };

  const bootDataHandler = () => {
    if (updateId != -1) {
      list[updateId].type = type;
      list[updateId].size = size;
      addBoot(list);
      setUpdateId(-1);
    } else {
      addBoot(list => [...list, {type: type, size: size}]);
    }
    setModalVisible(false);
    setSize('');
    setType('');
  };

  const updateItem = index => {
    setUpdateId(index);
    setType(list[index].type);
    setSize(list[index].size);
    openModal();
  };

  const cancelBoot = () => {
    setModalVisible(true);
    setSize('');
    setType('');
  };
  const keyHandler = (item, index) => {
    return index.toString();
  };

  const openModal = () => {
    setModalVisible(true);
  };
  function deleteBoot(removeId) {
    addBoot(listOfBoots =>
      listOfBoots.filter((boot, index) => index != removeId),
    );
  }

  const renderBoot = ({item, index}) => {
    return (
      <ScrollView style={styles.scrollviewstyle}>
        <TouchableOpacity
          key={index}
          onPress={() => updateItem(index)}
          onLongPress={() => deleteBoot(index)}>
          <View style={styles.listitemstyle}>
            <Text>
              {item.type}: {item.size}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  };
  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} animationType="slide">
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
          <View style={styles.buttonView}>
            <Button
              style={styles.buttonStyle}
              title="Ok"
              onPress={bootDataHandler}
            />
          </View>
          <View style={styles.buttonView}>
            <Button
              style={styles.buttonStyle}
              title="Cancel"
              onPress={cancelBoot}
            />
          </View>
        </View>
      </Modal>
      <View style={styles.listStyle}>
        <Button
          style={styles.buttonStyle}
          title="Add new Boot"
          onPress={() => openModal()}
        />
        <AddBoot />
        <FlatList
          style={styles.flatliststyle}
          keyExtractor={keyHandler}
          data={list}
          renderItem={renderBoot}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  headerStyle: {
    fontSize: 18,
    marginVertical: 12,
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
    fontSize: 28,
    height: '20%',
  },
  buttonView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatliststyle: {
    flexDirection: 'column',
    padding: 3,
  },
  listStyle: {
    padding: 3,
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

export default App;

const AddBoot = () => {
  return <Text style={styles.headerStyle}>AddBoot</Text>;
};
