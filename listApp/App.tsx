import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar, TextInput, Button, FlatList} from 'react-native';
import {
  init,
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from './database/db';

const App = () => {
  const [student, setStudent] = useState('');
  const [students, setStudents] = useState([]);

  const createTables = () => {
    init();
  };

  const addStudent = () => {
    if (!student) {
      alert('Enter student');
      return false;
    }

    addStudent(students);
  };

  const getStudents = () => {
    getAllStudents();
  };

  const renderStudent = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 12,
          paddingHorizontal: 10,
          borderBottomWidth: 1,
          borderColor: '#ddd',
        }}>
        <Text style={{marginRight: 9}}>{item.id}</Text>
        <Text>{item.name}</Text>
      </View>
    );
  };

  useEffect(() => {
    createTables();
    getStudents();
  }, []);

  return (
    <View>
      <StatusBar backgroundColor="#222" />

      <TextInput
        placeholder="Enter student"
        value={student}
        onChangeText={setStudent}
        style={{marginHorizontal: 8}}
      />

      <Button title="Submit" onPress={addStudent} />

      <FlatList
        data={students}
        renderItem={renderStudent}
        key={cat => cat.id}
      />
    </View>
  );
};

export default App;
