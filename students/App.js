/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import SQLite from 'react-native-sqlite-storage';

SQLite.openDatabase({name: 'my.db', location: 'Shared'}, console.log('databaseconn'), console.log('database connection failed'));

const App = () => {
  const [students, setStudents] = useState([]);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [studentUpdate, setStudentUpdate] = useState();
  const [studentUpdateIndex, setStudentUpdateIndex] = useState();

  useEffect(() =>
    db.executeSql(
      'CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, phone VARCHAR(255) NOT NULL);',
    ),
  );

  const updateStudent = () => {
    console.log('====================================');
    console.log('updateStudent');
    console.log('====================================');
  };
  const deleteStudent = () => {
    console.log('deleteStudent');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Collect partisipants students</Text>
      <ScrollView style={styles.flexRow}>
        <View>
          <TouchableOpacity
            onLongPress={() => deleteStudent()}
            onPress={() => updateStudent()}>
            <Text>TOUCH</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  flexRow: {
    flexDirection: 'row',
  },
  input: {
    borderColor: '#4630eb',
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 16,
    padding: 8,
  },
});

export default App;
