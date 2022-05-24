import * as React from 'react';
import {StyleSheet, Form, Text, TextInput, Button, Alert} from 'react-native';

const App = () => {
  const [text, onChangeText] = React.useState('LeftSide Text');
  const [number, onChangeNumber] = React.useState(null);
  return (
    <Form>
      <Text>Please fill the form below</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
      <Button
        title="Left button"
        onPress={() => Alert.alert('Left button pressed')}
      />
      <Button
        title="Right button"
        onPress={() => Alert.alert('Right button pressed')}
      />
    </Form>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  buttons: {
    width: '100%',
    padding: '22pt',
  },
  input: {
    height: 40,
    margin: 22,
    borderWidth: 1,
    padding: 12,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default App;
