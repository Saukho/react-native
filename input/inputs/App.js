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
  const [boot, setBoot] = useState();
  const [bootSize, setBootSize] = useState();

  const [list, addBoot] = useState([]);
  const bootInputHandler = enteredText => {
    setBoot(enteredText);
  };
  const bootSizeInputHandler = enteredSize => {
    setBootSize(enteredSize);
  };

  const addBootToList = () => {
    addBoot(list => [...list, boot + '/' + bootSize]);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerStyle}>
        React Native Input Components handling
      </Text>
      <View style={styles.formStyle}>
        <TextInput style={styles.textInput} onChangeText={bootInputHandler} />
        <TextInput
          style={styles.textInput}
          onChangeText={bootSizeInputHandler}
        />
        <Button
          title="Add Boot"
          style={styles.buttonStyle}
          onPress={addBootToList}
        />
      </View>
      <View style={styles.row}>
        {/* <Text>Boot:{boot}</Text>
        <Text>Size:{bootSize}</Text>*/}
        <FlatList
          data={list}
          renderItem={item => (
            <Text key={item.index}>
              {item.index + 1}: {item.item}
            </Text>
          )}
        />
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
  headerStyle: {
    fontSize: 18,
    marginVertical: 12,
  },
  formStyle: {
    width: '100%',
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-around',
  },
  textInput: {
    backgroundColor: '#fdfdfd',
    borderColor: '#666',
    borderWidth: 2,
    width: '30%',
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
