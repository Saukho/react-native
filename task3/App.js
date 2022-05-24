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
  Text,
  TextInput,
  Button,
  View,
  FlatList,
} from 'react-native';

const App = () => {
  const [type, setType] = useState();
  const [size, setSize] = useState();
  const [list, addBoot] = useState([]);

  const bootTypeInputHandler = enteredText => {
    setType(enteredText);
  };
  const bootSizeInputHandler = enteredSize => {
    setSize(enteredSize);
  };

  const addBootToList = () => {
    addBoot(list => [...list, {type: type, size: size}]);
  };

  const cancel = () => {
    addBoot((enteredText = ''));
  };

  const renderItem = ({item, index}) => {
    return (
      <Text key={index} style={styles.itemStyle}>
        {index + 1}: {item.type}/{item.size}
      </Text>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerStyle}>
        React Native Input Components handling
      </Text>
      <View style={styles.formStyle}>
        <TextInput
          style={styles.textInput}
          onChangeText={bootTypeInputHandler}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={bootSizeInputHandler}
        />
      </View>
      <View style={styles.formStyle}>
        <Button title="cancel" style={styles.buttonStyle} onPress={cancel} />
        <Button
          title="Add Boot"
          style={styles.buttonStyle}
          onPress={addBootToList}
        />
      </View>
      <View style={styles.row}>
        <Text>
          Boot: {type}/{size}
        </Text>
        <View style={styles.row}>
          <FlatList data={list} renderItem={renderItem} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  itemStyle: {
    backgroundColor: 'lightblue',
    width: '100%',
    borderColor: 'black',
    borderWidth: 2,
    marginTop: 10,
    padding: 4,
    paddingLeft: 15,
  },
  headerStyle: {
    fontSize: 18,
    marginVertical: 12,
  },
  listStyle: {
    width: '80%',
    borderWidth: 2,
  },
  formStyle: {
    width: '100%',
    flexDirection: 'row',
    padding: 4,
    justifyContent: 'space-around',
  },
  textInput: {
    backgroundColor: '#fdfdfd',
    borderColor: '#666',
    borderWidth: 2,
    width: '40%',
  },
  buttonStyle: {
    flexBasis: '70%',
    padding: 3,
  },
  row: {
    flexDirection: 'column',
    padding: 30,
    width: '100%',
  },
});

export default App;
